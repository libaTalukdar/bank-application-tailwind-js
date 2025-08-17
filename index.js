 const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let valid = true;

      if (emailInput.value.trim() === '') {
        emailError.classList.remove('hidden');
        valid = false;
      } else {
        emailError.classList.add('hidden');
      }

      if (passwordInput.value.trim() === '') {
        passwordError.classList.remove('hidden');
        valid = false;
      } else {
        passwordError.classList.add('hidden');
      }

      if (valid) {
        // alert('Login successful!');
        window.location.href = 'dashboard.html';
        // You can redirect or handle login logic here
      }
    });