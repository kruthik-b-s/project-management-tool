const urlParams = new URLSearchParams(window.location.search);
const empId = urlParams.get('id');

const projectsDiv = document.querySelector('.employee-projects');

function populateFormData(jsonData) {
  const employeeId = document.querySelector('#inputId');
  employeeId.value = jsonData.employee_id;

  const employeeName = document.querySelector('#inputName');
  employeeName.value = jsonData.employee_name;

  const email = document.querySelector('#inputEmail');
  email.value = jsonData.email;

  const department = document.querySelector('#inputDepartment');
  department.value = jsonData.department;

  const phoneNumber = document.querySelector('#inputPhone');
  phoneNumber.value = jsonData.phone_number;

  const employeeRole = document.querySelector('#inputRole');
  employeeRole.value = jsonData.Role.role_name;
}

function populateProjectsDiv(jsonData) {
  const projects = jsonData.projects;

  for (const project of projects) {
    const card = document.createElement('div');
    card.className = 'card w-100 mb-3';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = project.project_name;

    const button = document.createElement('a');
    button.className = 'btn btn-primary';
    button.textContent = 'Remove employee from project';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(button);
    card.appendChild(cardBody);
    projectsDiv.appendChild(card);
  }
}

await fetch(`/api/employee/${empId}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    populateFormData(data);
    populateProjectsDiv(data);
  })
  .catch((error) => {
    console.log(error);
  });

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
