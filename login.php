<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - VuelaVzla</title>
    <link rel="stylesheet" href="assets/auth.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-form-container">
            <a href="index.php" class="logo">Vuela<b>Vzla</b></a>
            
            <form id="login-form">
                <h2>Iniciar Sesión</h2>
                <p id="auth-msg" class="error-msg"></p>
                <label for="login-user">Nombre de usuario</label>
                <input type="text" id="login-user" required>
                
                <label for="login-pass">Contraseña</label>
                <input type="password" id="login-pass" required>
                
                <button type="submit">Entrar</button>
                
                <p class="switch-form-link">¿No tienes cuenta? <a href="register.php">Regístrate aquí</a></p>
            </form>
        </div>
    </div>

    <script src="assets/auth.js"></script>
</body>
</html>

