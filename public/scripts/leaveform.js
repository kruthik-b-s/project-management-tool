document.title = 'Project Management Tool | Apply leave';
console.log("hii");


const leaveType = document.querySelector('#leaveType')
leaveType.addEventListener('change',()=>{
  { 
    let leaveTypeValue = leaveType.value
    if (leaveTypeValue  == 'Casual') {
      console.log(leaveTypeValue) ;
    } else if (leaveTypeValue  == 'Sick') {
      console.log(leaveTypeValue );
    } else if (leaveTypeValue  == 'Floater') {
      console.log(leaveTypeValue );
    }
    else{
      console.log(leaveTypeValue);
    }
  }
  
} )
