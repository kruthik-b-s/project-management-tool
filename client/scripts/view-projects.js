const url =
  'https://gist.githubusercontent.com/kruthik-b-s/b556fd324875bd875f3ecc8ee9719d4d/raw/8fc0ac65f58420e6a6623bbb8d1fdb81f48338ec/dummy-projects.json';

const ongoingTable = document.querySelector('#ongoing-table tbody');
const compltedTable = document.querySelector('#completed-table tbody');

function populateOngoingTable(jsonData) {
  for (const project of jsonData) {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const clientCell = document.createElement('td');
    const startCell = document.createElement('td');
    const endCell = document.createElement('td');
    const otherDetailsCell = document.createElement('td');
    const otherDetailsAnchor = document.createElement('a');

    otherDetailsAnchor.href = '#';
    otherDetailsAnchor.textContent = 'click here';
    idCell.textContent = project.id;
    nameCell.textContent = project.project_name;
    clientCell.textContent = project.client;
    startCell.textContent = project.start_date;
    endCell.textContent = project.end_date;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(clientCell);
    row.appendChild(startCell);
    row.appendChild(endCell);
    otherDetailsCell.appendChild(otherDetailsAnchor);
    row.appendChild(otherDetailsCell);

    ongoingTable.appendChild(row);
  }
}

function populateCompletedTable(jsonData) {
  console.log(jsonData);
  // code to populate when getting the data of completed projects
  for (const project of jsonData) {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    const nameCell = document.createElement('td');
    const clientCell = document.createElement('td');
    const startCell = document.createElement('td');
    const endCell = document.createElement('td');
    const otherDetailsCell = document.createElement('td');
    const otherDetailsAnchor = document.createElement('a');

    otherDetailsAnchor.href = '#';
    otherDetailsAnchor.textContent = 'click here';
    idCell.textContent = project.id;
    nameCell.textContent = project.project_name;
    clientCell.textContent = project.client;
    startCell.textContent = project.start_date;
    endCell.textContent = project.end_date;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(clientCell);
    row.appendChild(startCell);
    row.appendChild(endCell);
    otherDetailsCell.appendChild(otherDetailsAnchor);
    row.appendChild(otherDetailsCell);

    compltedTable.appendChild(row);
  }
}

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    populateOngoingTable(data);
    populateCompletedTable(data);

    new DataTable('#ongoing-table', {
      dom: 'rtip',
      info: false,
      ordering: false,
    });

    new DataTable('#completed-table', {
      dom: 'rtip',
      info: false,
      ordering: false,
    });
  })
  .catch((err) => {
    console.log(err);
  });
