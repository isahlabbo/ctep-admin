const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const Database = require('better-sqlite3');

function getDbPath(filename = 'exam.sqlite') {
  const dbFile = process.env.EXAM_FILENAME || filename;
  return isDev
    ? path.join(__dirname, '..', 'assets', dbFile)
    : path.join(process.resourcesPath, 'assets', dbFile);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC to return DB path
ipcMain.handle('get-db-path', async (event) => getDbPath());

// IPC to fetch first exam row
ipcMain.handle('fetch-exam-meta', async (event) => {
  const db = new Database(getDbPath(), { readonly: true });
  try {
    return db.prepare('SELECT * FROM exams LIMIT 1').get() || null;
  } finally {
    db.close();
  }
});
