// // script.js (client-side JavaScript)
// document.getElementById('loginForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Get username and password from the form
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     // Send a POST request to the server to authenticate the user
//     fetch('/userlogin', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             username: username,
//             password: password,
//         }),
//     })
//     .then(response => response.json())
//     .then(data => {
//         // Store the token in localStorage
//         localStorage.setItem('token', data.token);

//         // Redirect to the contact page
//         window.location.href = '/contact';
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });

