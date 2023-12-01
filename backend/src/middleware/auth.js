// Importamos el módulo jwt para manejar los JSON Web Tokens.
const jwt = require('jsonwebtoken')

// Middleware para autenticar y verificar el token enviado en las cabeceras de la solicitud.
const auth = (req, res, next) =>{
    try {
        // Obtenemos el token de la cabecera "Authorization".
        const token = req.header("Authorization")
        // Si no hay token, devolvemos un error de autenticación inválida.
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        // Imprimimos el secreto del token para depuración (esto no debería estar en producción).
        const tokenSecret = process.env.TOKEN_SECRET;
        console.log('Token Secret:', tokenSecret);

        // Verificamos el token usando el secreto almacenado en las variables de entorno.
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
            // Si hay un error en la verificación, como un token expirado o inválido, manejamos el error.
            if(err) {
                console.error('JWT Verification Error:', err);
                return res.status(400).json({msg: "Authorization not valid."})
            }
            // Si el token es válido, agregamos el payload del token al objeto request para uso posterior.
            req.user = user;
            // Pasamos el control al siguiente middleware o controlador.
            next()
        })
    } catch (err) {
        // Manejamos cualquier otro error que no esté relacionado con la verificación del token.
        return res.status(500).json({msg: err.message})
    }
}

// Exportamos la función de middleware para su uso en otros archivos del proyecto.
module.exports = auth
