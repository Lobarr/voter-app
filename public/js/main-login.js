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
          if(data.location){
            window.location = data.redirect
          }else if(data.error){
            alertify.error(data.error);
          }
        }
    })
  })    
});