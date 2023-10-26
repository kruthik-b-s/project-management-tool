const inputName = document.querySelector('#inputName');
inputName.disabled = true;

const inputDepartment = document.querySelector('#inputDepartment');
inputDepartment.disabled = true;

const phoneNumber = document.querySelector('#inputPhone');
phoneNumber.disabled = true;

const inputRole = document.querySelector('#inputRole');
inputRole.disabled = true;

const inputReporting = document.querySelector('#inputReporting');
inputReporting.disabled = true;

const editButton = document.querySelector('#edit-button');
editButton.addEventListener('click', () => {
  inputName.disabled = false;
  inputDepartment.disabled = false;
  phoneNumber.disabled = false;
  inputRole.disabled = false;
  inputReporting.disabled = false;
});
