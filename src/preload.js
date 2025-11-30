const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getDbPath: () => ipcRenderer.invoke('get-db-path'),
  fetchExamMeta: () => ipcRenderer.invoke('fetch-exam-meta')
});
