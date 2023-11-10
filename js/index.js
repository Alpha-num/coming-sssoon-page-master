let email = document.querySelector('#email').value;
let emailForm = document.querySelector('#emailForm').addEventListener('submit', (e)=>{
    e.preventDefault();
        fetch('./server/server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Handle the response data
                console.log(data);
            })
            .catch(error => {
                // Handle errors
                console.error('Fetch error:', error);
                if(error.response){
                    console.error('Status:', error.response.status);
                    console.error('Response Text:', error.response.statusText);
                }
            });


})