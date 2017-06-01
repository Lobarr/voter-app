$(()=>{  
  $('form').submit(function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    $.ajax({
        url: "/login",
        method: "POST",
        data: {
          username: username,
          password: password      
        },
        dataType: "json",
        success: (data) => {
          console.log(data);          
        },
        error: (err) => {
          console.log("Error occured on from submit");
          console.log(err);
        }
    })
  })    
});