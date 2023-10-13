const url =
  'https://gist.githubusercontent.com/kruthik-b-s/d593f40f0aa75a26717d751d57295cbe/raw/bea37100ac266a09b0db4cfda15ddb03579272a1/dummy-leave-requests.json';

const card = document.querySelector('.leave-requests');

function createLeaveCards(jsonData) {
  for (const leave of jsonData) {
    const cardDiv = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardTitle = document.createElement('h5');
    const cardText = document.createElement('p');
    const approveButton = document.createElement('a');
    const rejectButton = document.createElement('a');

    cardDiv.className = 'card w-75 mb-3';
    cardDiv.id = 'leave-card';

    cardBody.className = 'card-body';

    cardTitle.className = 'card-title';
    cardTitle.textContent = `EmployeeId: ${leave.employee_id}`;

    cardText.className = 'card-text';
    cardText.textContent = leave.reason;

    approveButton.href = '#';
    approveButton.className = 'btn btn-primary';
    approveButton.textContent = 'Approve';
    rejectButton.href = '#';
    rejectButton.className = 'btn btn-primary';
    rejectButton.textContent = 'Reject';

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(approveButton);
    cardBody.appendChild(rejectButton);
    cardDiv.appendChild(cardBody);

    card.appendChild(cardDiv);
  }
}

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createLeaveCards(data);
  })
  .catch((err) => {
    console.log(err);
  });
