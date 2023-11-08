document.title = 'Project Management Tool | Apply leave';

console.log('hii');

const leaveType = document.querySelector('#leaveType');

// Get the <select> element by its ID
var selectElement = document.getElementById('leaveType');

// Loop through the <option> elements
for (var i = 0; i < selectElement.options.length; i++) {
  var option = selectElement.options[i];

  // Check if the inner text of the option contains "0" as a standalone value
  if (/\b0\b/.test(option.textContent)) {
    // Return the ID of the option
    var optionId = option.value;
    console.log(
      "Found an option with '0' as a standalone value in its inner text. Option ID: " +
        optionId,
    );

    option.disabled = true;
  }
}

leaveType.addEventListener('change', () => {
  {
    let leaveTypeValue = leaveType.value;
    if (leaveTypeValue == 'casual_leaves') {
      console.log(leaveTypeValue);
    } else if (leaveTypeValue == 'sick_leaves') {
      console.log(leaveTypeValue);
    } else if (leaveTypeValue == 'floater_leaves') {
      console.log(leaveTypeValue);
    } else {
      console.log('Other Case: Unpaid', leaveTypeValue);
    }
  }
});
