const rejectDisable = (id)=>{
  const rejectBtn = document.querySelector(`#reject-${id}`)
  const commentBox = document.querySelector(`#comm-${id}`)
  if(commentBox.value.trim('').length !== 0){
    rejectBtn.disabled = false
  }else{
    rejectBtn.disabled = true
  }
}


const updateStatus =(id,decision)=>{
    const acceptBtn = document.querySelector(`#accept-${id}`)
    const rejectBtn = document.querySelector(`#reject-${id}`)
    const statusText = document.querySelector(`#status-${id}`)
    const commentBox = document.querySelector(`#comm-${id}`)
  
    acceptBtn.disabled = true
    rejectBtn.disabled = true
    statusText.textContent = `Status:${decision}`
    
    const data = {
        id : id,
        status:decision,
        comments: commentBox.value
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    // console.log(data)

    fetch("/api/leaves/statusUpdate",options)
    .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
        
      });
    
      location.reload();
}