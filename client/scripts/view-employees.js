// const url =
//   'https://gist.githubusercontent.com/kruthik-b-s/9787e341fe6e72c8e73d1b1e738b2c32/raw/d1f3d61b3e4c3342c3cb9f3b5e391889b0c95c77/dummy-data.json';

const url = '/api/auth/getAllEmployees';

const tableBody = document.querySelector('table tbody');

function populateTable(jsonData) {
  for (const employee of jsonData) {
    const row = document.createElement('tr');
    const idCell = document.createElement('th');
    const nameCell = document.createElement('td');
    const nameAnchor = document.createElement('a');
    nameAnchor.href = `http://localhost:3000/api/employee/${employee.employee_id}`;
    const departmentCell = document.createElement('td');
    const performanceCell = document.createElement('td');
    const performanceAnchor = document.createElement('a');
    performanceAnchor.href = `http://localhost:3000/api/employee/performance/${employee.employee_id}`;

    idCell.textContent = employee.employee_id;
    // nameCell.textContent = employee.name;
    nameAnchor.textContent = employee.employee_name;
    departmentCell.textContent = employee.department;
    // performanceCell.textContent = employee.performance;
    performanceAnchor.textContent = employee.performance;

    row.appendChild(idCell);
    nameCell.appendChild(nameAnchor);
    row.appendChild(nameCell);
    row.appendChild(departmentCell);
    performanceCell.appendChild(performanceAnchor);
    row.appendChild(performanceCell);

    tableBody.appendChild(row);
  }
}

fetch(url, { method: 'GET' })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    populateTable(data);
    new DataTable('#paged-table', {
      dom: 'rtip',
      info: false,
      ordering: false,
    });
  })
  .catch((err) => {
    console.log(err);
  });
