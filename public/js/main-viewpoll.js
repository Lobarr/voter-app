$(()=>{
  const poll = new Promise((resolve, reject) => {
    $.ajax({
      url: `/api/${document.getElementById('poll-id').innerHTML}`,
      success: (poll)=>{
        resolve(poll)
      },
      error: (err) => {
        alertify.error('Error getting data')
        reject(err)
      }, 
      cache: false
    })
  })
  poll.then(poll => {
    let options = []
    let options_values = []
    for(let opt in poll.poll.options){
      options.push(opt)
      options_values.push(poll.poll.options[opt])
    }  
    new Chart(document.getElementById("doughnut-chart"), {
      type: 'doughnut',
      data: {
        labels: options,
        datasets: [
          {
            label: "Population (millions)",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
            data: options_values
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: `Results of ${poll.poll.title.toUpperCase()}`
        }
      }
    });
  })  
}) 