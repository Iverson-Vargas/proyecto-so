<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso de Personal - VuelaVzla</title>
    <link rel="stylesheet" href="assets/auth.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-form-container">
            <a href="#" class="logo">Vuela<b>Vzla</b></a>
            
            <form id="login-form">
                <h2>Control de Vuelos</h2>
                <p id="auth-msg" class="error-msg"></p>
                <label for="login-user">Usuario de Empleado</label>
                <input type="text" id="login-user" required>
                
                <label for="login-pass">Contraseña</label>
                <input type="password" id="login-pass" required>
                
                <button type="submit">Acceder</button>
                
                <p class="switch-form-link" style="font-size: 0.8rem; color: #666;">Acceso solo para personal autorizado.</p>
            </form>
        </div>
    </div>

    <script src="assets/auth.js"></script>
</body>
</html>
