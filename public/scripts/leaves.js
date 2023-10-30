const updateStatus =(id,decision)=>{
    const commentBox = document.querySelector(`#comm-${id}`)
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

}