window.addEventListener('DOMContentLoaded', async () => {
  const dbPath = await window.electronAPI.getDbPath();
  document.getElementById('dbPath').innerText = dbPath;

  const exam = await window.electronAPI.fetchExamMeta();
  document.getElementById('examInfo').innerText = exam
    ? `First exam: ${exam.title}`
    : 'No exams found';
});
