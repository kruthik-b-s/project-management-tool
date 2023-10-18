const url =
  'https://gist.githubusercontent.com/kruthik-b-s/b556fd324875bd875f3ecc8ee9719d4d/raw/94cb91b16e8ddf00e1cede0613728ad8d9aaf787/dummy-projects.json';

const table = document.querySelector('#projects tbody');

function populateTable(jsonData) {
  for (const project of jsonData) {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const clientCell = document.createElement('td');
    const startCell = document.createElement('td');
    const endCell = document.createElement('td');
    const statusCell = document.createElement('td');
    const otherDetailsCell = document.createElement('td');
    const otherDetailsAnchor = document.createElement('a');

    otherDetailsAnchor.href = '#';
    otherDetailsAnchor.textContent = 'click here';
    idCell.textContent = project.id;
    nameCell.textContent = project.project_name;
    clientCell.textContent = project.client;
    startCell.textContent = project.start_date;
    endCell.textContent = project.end_date;
    statusCell.textContent = project.status;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(clientCell);
    row.appendChild(startCell);
    row.appendChild(endCell);
    row.appendChild(statusCell);
    otherDetailsCell.appendChild(otherDetailsAnchor);
    row.appendChild(otherDetailsCell);

    table.appendChild(row);
  }
}

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    populateTable(data);

    new DataTable('#projects', {
      dom: 'rtip',
      info: false,
      ordering: false,
    });
  })
  .catch((err) => {
    console.log(err);
  });
