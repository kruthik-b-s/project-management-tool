document.title = 'Project Management Tool | Project details';

const addNoteButton = document.querySelector('#add-note');
const textArea = document.querySelector('textarea');

addNoteButton.addEventListener('click', () => {
  textArea.disabled = false;
});

const projectEmployeesButton = document.querySelector('#project-employees');
const projectIdSpan = document.querySelector('#project-id');
const projectId = projectIdSpan.textContent;
projectIdSpan.textContent = '';

projectEmployeesButton.addEventListener('click', () => {
  window.location.href = `/api/employee/employeesOnProject/${projectId}?page=1&perPage=8`;
});
