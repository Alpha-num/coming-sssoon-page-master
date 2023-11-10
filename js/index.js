let emailForm = document.querySelector('#emailForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    let email = document.querySelector('#email').value;
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
                email.value = '';
                // Handle the response data
                console.log(data);
                document.querySelector('.alert').style.display = 'block';
                setTimeout(()=>{
                    document.querySelector('.alert').style.display = 'none';
                }, 5000)
            })
            .catch(error => {
                let msg = document.querySelector('.alert');
                msg.style.display = 'block';
                msg.className = 'alert alert-danger';
                msg.innerHTML = 'Oops!: Email already submitted or an error occurred';
                // Handle errors
                console.error('Fetch error:', error);
                if(error.response){
                    console.error('Status:', error.response.status);
                    console.error('Response Text:', error.response.statusText);
                }
            });


})