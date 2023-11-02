const rejectDisable = (id) => {
  const rejectBtn = document.querySelector(`#reject-${id}`);
  const commentBox = document.querySelector(`#comm-${id}`);
  if (commentBox.value.trim('').length !== 0) {
    rejectBtn.disabled = false;
  } else {
    rejectBtn.disabled = true;
  }
};

// Select all <div> elements with querySelectorAll
const dateElements = document.querySelectorAll('.dateElement');

// Define a function to convert ISO dates to local format
function convertISOToLocal(isoDate) {
  const date = new Date(isoDate);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    // timeZoneName: 'short',
  };
  return date.toLocaleString(undefined, options);
}

// Loop through the selected <div> elements
dateElements.forEach((dateElement) => {
  // Extract the ISO date from the innerText
  let isoDate = dateElement.innerText;
 if(isoDate.includes('from_date:')){
  isoDate.replace('from_date:', '')
  let localDate = convertISOToLocal(isoDate);
  dateElement.innerText = "From_date: "+ localDate;
 }else if(isoDate.includes('till_date:')){
  isoDate.replace('till_date:', '');
    let localDate = convertISOToLocal(isoDate);
    dateElement.innerText = "Till_date: " + localDate;
 }
  // console.log('---->>', isoDate);

});

window.onload = () => {
  const toggle = document.querySelector('#toggle');
  if (window.location.pathname === '/api/leaves/viewAllLeaves') {
    toggle.pathname = '/api/leaves/nonPendingLeaves';
    toggle.innerText = 'Non Pending Leaves';
  } else {
    toggle.pathname = '/api/leaves/viewAllLeaves';
    toggle.innerText = 'Pending Leaves';
  }
};

const updateStatus = (id, decision) => {
  const acceptBtn = document.querySelector(`#accept-${id}`);
  const rejectBtn = document.querySelector(`#reject-${id}`);
  const statusText = document.querySelector(`#status-${id}`);
  const commentBox = document.querySelector(`#comm-${id}`);

  acceptBtn.disabled = true;
  rejectBtn.disabled = true;
  statusText.textContent = `Status:${decision}`;
  console.log(decision);

  if (decision == 'approve' && commentBox.value.trim('').length == 0) {
    commentBox.value = 'approved';
  }

  const data = {
    id: id,
    status: decision,
    comments: commentBox.value,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  // console.log(data)

  fetch('/api/leaves/statusUpdate', options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  location.reload();
};
