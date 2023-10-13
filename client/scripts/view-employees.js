const url =
  'https://gist.githubusercontent.com/kruthik-b-s/9787e341fe6e72c8e73d1b1e738b2c32/raw/d1f3d61b3e4c3342c3cb9f3b5e391889b0c95c77/dummy-data.json';

const tableBody = document.querySelector('table tbody');

function populateTable(jsonData) {
  for (const employee of jsonData) {
    const row = document.createElement('tr');
    const idCell = document.createElement('th');
    const nameCell = document.createElement('td');
    const designationCell = document.createElement('td');
    const performanceCell = document.createElement('td');

    idCell.textContent = employee.id;
    nameCell.textContent = employee.name;
    designationCell.textContent = employee.designation;
    performanceCell.textContent = employee.performance;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(designationCell);
    row.appendChild(performanceCell);

    tableBody.appendChild(row);
  }
}

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
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
