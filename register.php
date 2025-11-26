<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - VuelaVzla</title>
    <link rel="stylesheet" href="assets/auth.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-form-container">
            <a href="index.php" class="logo">Vuela<b>Vzla</b></a>

            <form id="register-form">
                <h2>Crear una Cuenta</h2>
                <p id="auth-msg" class="error-msg"></p>
                <label for="register-user">Nombre de usuario</label>
                <input type="text" id="register-user" required>

                <label for="register-pass">Contraseña</label>
                <input type="password" id="register-pass" required>

                <button type="submit">Registrarse</button>

                <p class="switch-form-link">¿Ya tienes cuenta? <a href="login.php">Inicia sesión aquí</a></p>
            </form>
        </div>
    </div>

    <script src="assets/auth.js"></script>
</body>
</html>

