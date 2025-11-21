// importa la librería 'jsonwebtoken' para verificar y trabajar con json web token (jwt).
import jwt from 'jsonwebtoken'
// importa la clave secreta utilizada para firmar y verificar el token.
import { TOKEN_SECRET } from '../config.js';

// define y exporta una función middleware llamada 'authRequired' para verificar la autenticación del usuario.
export const authRequired = (req, res, next) => {
    // intenta extraer el token de las cookies de la solicitud (req.cookies).
    const { token } = req.cookies;
    
    // comprueba si el token existe en las cookies.
    if (!token) {
        // si no hay token, devuelve una respuesta con estado 401 (no autorizado) y un mensaje de error.
        return res.status(401).json({ message: "no hay token, autorización rechazada" });
    }

    // verifica la validez del token:
    // 1. pasa el token extraído.
    // 2. pasa la clave secreta para descifrarlo.
    // 3. pasa una función de callback para manejar el resultado de la verificación.
    jwt.verify(token, TOKEN_SECRET, (error, user) => {
// si ocurre un error durante la verificación (ej: token expirado, firma incorrecta),  devuelve una respuesta con estado 403 (Prohibido) y un mensaje de token inválido.
        if (error) return res.status(403).json({ message: "token inválido" });

        // si la verificación llega a ser exitosa, los datos decodificados del token (el 'payload', aquí llamado 'user')
// se adjuntan al objeto de solicitud (req). Esto hace que la información del usuario este disponible para las siguientes funciones (middlewares o controladores de ruta).
        req.user = {
            id: user.id,
            // aca se guarda el rol: Se extrae y se guarda el rol del usuario para usarlo en middlewares posteriores (como 'isAdmin').
            role: user.role
        };
        
        // llama a 'next()' para pasar el control a la siguiente función, para permitir  el acceso pq el usuario ha sido autenticado.
        next();
    });
};