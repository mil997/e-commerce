// defino y exporto una función middleware llamada 'isAdmin' para verificar si el usuario es un administrador.
export const isAdmin = (req, res, next) => {
    // comprueba si el rol del usuario (obtenido típicamente de la solicitud 'req.user' después de la autenticación) no es "admin".
    if (req.user.role !== "admin") {
// si el usuario no es admin, envía una respuesta status 403 (prohibido) y también envía un objeto json con un mensaje (acceso rechazado)
        return res.status(403).json({ message: "acceso rechazado: no eres administrador" });
    }
    // si es admin, llama a next() para pasar el control a la siguiente función middleware o al controlador de ruta, permitiendo el acceso.
    next();
};