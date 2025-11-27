// assets/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const msgElement = document.getElementById('auth-msg');

    // --- INICIALIZACIÓN DE LA BASE DE DATOS DE USUARIOS (SIMULADA) ---
    const initializeUsers = () => {
        // Comprueba si la lista de usuarios ya existe en localStorage
        if (!localStorage.getItem('app_users')) {
            // Si no existe, la crea con los usuarios por defecto
            const defaultUsers = {
                "administrador": "12345", // Usuario administrador
                "empleado1": "pass123",
                "supervisor_a": "super_pass",
                "j.perez": "vzla2025",
                "ana.gomez": "ag_2024",
                "iverson" : "123456"
            };
            // Guarda la lista inicial en localStorage
            localStorage.setItem('app_users', JSON.stringify(defaultUsers));
        }
    };

    // Llama a la función de inicialización al cargar la página
    initializeUsers();


    // --- Lógica de Inicio de Sesión ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('login-user').value;
            const pass = document.getElementById('login-pass').value;
            msgElement.textContent = ''; // Limpiar mensaje

            // Obtiene los usuarios desde localStorage
            const authorizedUsers = JSON.parse(localStorage.getItem('app_users'));

            // Validar si el usuario existe y la contraseña coincide
            if (authorizedUsers[user] && authorizedUsers[user] === pass) {
                // Éxito: Guardar usuario actual en sessionStorage
                sessionStorage.setItem('currentUser', user);

                // Diferenciar entre admin y empleado
                if (user === 'administrador') {
                    sessionStorage.setItem('userRole', 'admin');
                } else {
                    sessionStorage.setItem('userRole', 'employee');
                }

                window.location.href = 'index.php'; // Redirigir a la página principal
            } else {
                // Error
                msgElement.textContent = 'Credenciales de empleado incorrectas.';
            }
        });
    }
});
