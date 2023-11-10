document.title = 'Project Management Tool | Apply leave';

console.log('hii');

const leaveType = document.querySelector('#leaveType');
console.log(leaveType.value)

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

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()