$(()=>{
  $('form').submit(function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const _passconf = document.getElementById('_password').value;

    if(password === _passconf){
      $.ajax({
        url: "/signup",
        method: "POST",
        data: {
          name: name,
          username: username,
          password: password      
        },
        dataType: "json",
        success: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
    })    
    } else {
      alertify.error('Passwords must match');
      document.getElementById('pass').value = '';
      document.getElementById('conf-pass').value = '';
    } 
  })
});