// define y exporta una función middleware llamada 'isAdmin' para verificar si el usuario es un administrador.
export const isAdmin = (req, res, next) => {
    // comprueba si el rol del usuario (obtenido típicamente de la solicitud 'req.user' después de la autenticación) mo es "admin".
    if (req.user.role !== "admin") {
// si el usuario no es admin, envía una respuesta con el código de estado 403 (prohibido) y también envía un objeto json con un mensaje que indica que el acceso fue rechazado.
        return res.status(403).json({ message: "acceso rechazado: no eres administrador" });
    }
    // si el usuario es admin, llama a 'next()' para pasar el control a la siguiente función middleware o al controlador de ruta, permitiendo el acceso.
    next();
};