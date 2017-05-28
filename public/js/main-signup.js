$(()=>{
  $('form').submit(function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('pass').value;
    const _passconf = document.getElementById('conf-pass').value;

    if(password === _passconf){
      $.ajax({
        url: "/signup",
        method: "POST",
        data: {
          name: name,
          username: username,
          password: password      
        },
        dataType: "json"
    })
    alertify.success('User Registered'); 
    setTimeout(()=>{
      window.location.href = '/login';
    }, 500)   
    } else {
      alertify.error('Passwords must match');
    } 
  })
});