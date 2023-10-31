
function optionSelected(){
const leaveType = document.querySelector('#leave_type').value

if (leaveType == "Casual") {
    console.log(leaveType)

}

else if (leaveType == "Sick") {
    console.log(leaveType)

}
else if (leaveType == "Floater") {
    console.log(leaveType)

}


// fetch("/api/leaves/getleaveType",options)
// .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.log(error);
    
//   });

}

