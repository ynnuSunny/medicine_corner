document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Dummy authentication logic, replace with actual authentication code
    if (username === 'admin' && password === 'password') {
      // Set user as logged in (dummy implementation)
      sessionStorage.setItem('loggedIn', 'true');
      alert('Login successful');
      window.location.href = 'index.html'; // Redirect to main page after login
    } else {
      alert('Invalid username or password');
    }
  });
  