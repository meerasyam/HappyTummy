document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const goToSignup = document.getElementById('go-to-signup');
    const goToLogin = document.getElementById('go-to-login');
    const authImagePanel = document.querySelector('.auth-image-panel');

    // Icon highlight on focus
    const inputs = document.querySelectorAll('.input-field');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focus-active');
        });
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focus-active');
        });
    });

    // Toggle logic
    goToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        if (authImagePanel) authImagePanel.style.display = 'none';
    });

    goToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        if (window.innerWidth > 800) {
            if (authImagePanel) authImagePanel.style.display = 'flex';
        }
    });
});
