// importa el modelo de usuario de la base de datos (generalmente Mongoose).
import User from '../models/user.model.js';
// importa la librería para el cifrado y comparación de contraseñas.
import bcrypt from 'bcryptjs';
// importa la función auxiliar para generar un JSON Web Token (JWT).
import { createAccessToken } from '../libs/jwt.js';


// registro de usuario


// función de controlador para el registro de nuevos usuarios (ruta POST /register).
export const register = async (req, res) => {
    // desestructura los datos necesarios del cuerpo de la solicitud (req.body).
    const { username, email, password } = req.body;
    try {
        // cifra la contraseña utilizando bcrypt. El '10' es el factor de complejidad (salt rounds).
        const passwordHash = await bcrypt.hash(password, 10);

        // crea una nueva instancia del modelo User con los datos recibidos y la contraseña cifrada.
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        // guarda el nuevo usuario en la base de datos
        const userSaved = await newUser.save();
        // crea un token de acceso jwt, incluyendo el id y el rol del usuario guardado
        const token = await createAccessToken({ id: userSaved._id, role: userSaved.role });

        // establece el token jwt como una cookie en el navegador del cliente
        res.cookie('token', token);
        // responde con el id, nombre de usuario y email del usuario registrado (sin la contraseña)
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });
    } catch (error) {
        // maneja los errores (ej. email duplicado) y responde con un estado 500 (Error interno del servidor)
        res.status(500).json({ message: error.message });
    }
};



// inicio de sesión


// función de controlador para el inicio de sesión de usuarios existentes (ruta post /login)
export const login = async (req, res) => {
    // desestructura el email y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;
    try {
        // busca un usuario en la base de datos por el email proporcionado
        const userfound = await User.findOne({ email });
        // si no se encuentra el usuario, devuelve un error 400 (Solicitud Incorrecta)
        if (!userfound) return res.status(400).json({ message: "usuario no encontrado" });

        // compara la contraseña proporcionada con la contraseña cifrada almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, userfound.password);
        // si las contraseñas no coinciden, devuelve un error 400
        if (!isMatch) return res.status(400).json({ message: "contraseña incorrecta" });

        // si la autenticación es exitosa, crea un nuevo token de acceso
        const token = await createAccessToken({ id: userfound._id, role: userfound.role });

        // establece el token jwt como una cookie
        res.cookie('token', token);
        // responde con los datos del usuario logueado
        res.json({
            id: userfound._id,
            username: userfound.username,
            email: userfound.email,
        });
    } catch (error) {
        // maneja cualquier otro error y responde con un estado 500
        res.status(500).json({ message: error.message });
    }
};



// perfil de usuario

// función de controlador para obtener los datos del perfil del usuario autenticado (ruta get /profile)
export const profile = async (req, res) => {
    // busca el usuario en la base de datos usando el id adjunto a 'req.user' por el middleware 'authRequired'
    const userfound = await User.findById(req.user.id);
    // si por alguna razón el usuario no se encuentra (a pesar de tener un token válido), devuelve 400.
    if (!userfound) return res.status(400).json({ message: "usuario no encontrado" });

    // devuelve la información del perfil del usuario
    return res.json({
        id: userfound._id,
        username: userfound.username,
        email: userfound.email,
    });
};



// para el cierre de sesión


// función de controlador para cerrar la sesión (ruta post /logout)
export const logout = (req, res) => {
    // borra la cookie del token estableciéndola como vacía y con una fecha de expiración en el pasado (epoch 0)
    res.cookie('token', "", { expires: new Date(0) });
    // responde con un estado 200 (OK), indicando que la operación se completo con éxito.
    return res.sendStatus(200);
};



// actualizar usuario


// función de controlador para modificar la información del usuario autenticado (ruta put /update)
export const updateUser = async (req, res) => {
    try {
        // desestructura los posibles campos a actualizar
        const { username, email, password } = req.body;

        // inicializa un objeto con los datos a actualizar (username y email)
        const updatedData = { username, email };
        // si se proporciona una nueva contraseña, la cifra antes de agregarla a los datos de actualización
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        // busca y actualiza el usuario en la base de datos usando el ID de 'req.user'
        // { new: true } asegura que 'user' contenga el documento actualizado y no el antiguo
        const user = await User.findByIdAndUpdate(req.user.id, updatedData, { new: true });
        // si el usuario no se encuentra (404 Not Found)
        if (!user) return res.status(404).json({ message: "usuario no encontrado" });

        // responde con un mensaje de éxito y los datos del usuario actualizado
        res.json({ message: "usuario actualizado correctamente", user });
    } catch (error) {
        // manejo de errores de actualización.
        res.status(500).json({ message: "error al actualizar usuario", error: error.message });
    }
};



// eliminar usuario


// función de controlador para eliminar la cuenta del usuario autenticado (ruta DELETE /delete)
export const deleteUser = async (req, res) => {
    try {
        // busca y elimina el usuario en la base de datos por el ID de 'req.user'
        const user = await User.findByIdAndDelete(req.user.id);
        // si no se encuentra el usuario, devuelve 404.
        if (!user) return res.status(404).json({ message: "usuario no encontrado" });

        // borra la cookie del token para cerrar la sesión inmediatamente
        res.clearCookie("token");
        // responde con un mensaje de éxito
        res.json({ message: "usuario eliminado correctamente" });
    } catch (error) {
        // manejo de errores de eliminación
        res.status(500).json({ message: "error al eliminar usuario", error: error.message });
    }
};