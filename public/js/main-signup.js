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
        dataType: "json",
        success: (data) => {
          if(data.message){
            alertify.error(data.message); 
            document.getElementById('username').value = '';
            document.getElementById('pass').value = '';
            document.getElementById('conf-pass').value = '';
            document.getElementById('username').focus()
          }else{
            alertify.success('User Registered'); 
            setTimeout(()=>{
              window.location.href = '/login';
            }, 500)   
          }
        }
    })    
    } else {
      alertify.error('Passwords must match');
      document.getElementById('pass').value = '';
      document.getElementById('conf-pass').value = '';
    } 
  })
});