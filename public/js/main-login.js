// $(()=>{
//   $('form').submit(function(event) {
//     event.preventDefault();
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     $.ajax({
//         url: "/login",
//         method: "POST",
//         data: {
//           username: username,
//           password: password      
//         },
//         dataType: "json",
//         success: (data) => {
//           console.log(data);
//           if(data.redirect){
//             window.location = data.redirect
//           }else if(data.error){
//             alertify.error(data.error);
//           }
//         },
//         error: (err) => {
//           console.log("Error occured on from submit");
//         }
//     })
//   })    
// });