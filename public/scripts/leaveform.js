document.title = 'Project Management Tool | Apply leave';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function optionSelected() {
  const leaveType = document.querySelector('#leave_type').value;

  if (leaveType == 'Casual') {
    console.log(leaveType);
  } else if (leaveType == 'Sick') {
    console.log(leaveType);
  } else if (leaveType == 'Floater') {
    console.log(leaveType);
  }
}
