// assets/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const msgElement = document.getElementById('auth-msg');

    // --- Lógica de Inicio de Sesión ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('login-user').value;
            const pass = document.getElementById('login-pass').value;
            msgElement.textContent = ''; // Limpiar mensaje

            if (localStorage.getItem(user) && localStorage.getItem(user) === pass) {
                // Éxito: Guardar en sessionStorage y redirigir
                sessionStorage.setItem('currentUser', user);
                window.location.href = 'index.php'; // Redirigir a la página principal
            } else {
                // Error
                msgElement.textContent = 'Usuario o contraseña incorrectos.';
            }
        });
    }

    // --- Lógica de Registro ---
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('register-user').value;
            const pass = document.getElementById('register-pass').value;
            msgElement.textContent = ''; // Limpiar mensaje

            if (!user || !pass) {
                msgElement.textContent = 'Por favor, completa todos los campos.';
                return;
            }

            if (localStorage.getItem(user)) {
                msgElement.textContent = 'El nombre de usuario ya existe.';
            } else {
                localStorage.setItem(user, pass);
                alert('¡Registro exitoso! Serás redirigido para iniciar sesión.');
                window.location.href = 'login.php'; // Redirigir a la página de login
            }
        });
    }
});

