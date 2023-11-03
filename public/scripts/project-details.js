document.title = 'Project Management Tool | Project details';

const addNoteButton = document.querySelector('#add-note');
const textArea = document.querySelector('textarea');

addNoteButton.addEventListener('click', () => {
  textArea.disabled = false;
});
