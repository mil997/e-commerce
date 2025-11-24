// importo el modelo de usuario de mongoose
import User from '../models/user.model.js';
// importo bcrypt
import bcrypt from 'bcryptjs';
// importa la función auxiliar para generar un (jwt)
import { createAccessToken } from '../libs/jwt.js';

// registro de usuario

// función de controlador para el registro de nuevos usuarios (ruta POST /register)
export const register = async (req, res) => {
    // recibo los datos necesarios del (req.body)
    const { username, email, password } = req.body;
    try {
        // cifro la contraseña utilizando bcrypt. El '10' es el factor de complejidad (salt rounds)
        const passwordHash = await bcrypt.hash(password, 10);

        // creo un nuevo usuario con los datos recibidos y la contraseña cifrada.
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
        // responde con el id, nombre de usuario y email del usuario registrado, no necesito la contraseña.
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
    // recibo los datos necesarios del (req.body)
    const { email, password } = req.body;
    try {
        // busca un usuario en la base de datos por el email
        const userfound = await User.findOne({ email });
        // si no se encuentra el usuario, devuelve un error 400 (Solicitud Incorrecta)
        if (!userfound) return res.status(400).json({ message: "usuario no encontrado" });

        // compara la contraseña con la contraseña cifrada que se guardo en la base de datos
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
    // busca el usuario en la base de datos usando el id que da el 'req.user' por el middleware 'authRequired'
    const userfound = await User.findById(req.user.id);
    // si no encuentra el usuario (a pesar de tener un token valido), devuelve 400.
    if (!userfound) return res.status(400).json({ message: "usuario no encontrado" });

    // devuelve la información del perfil del usuario
    return res.json({
        id: userfound._id,
        username: userfound.username,
        email: userfound.email,
    });
};

// cierre de sesión

// función de controlador para cerrar la sesión (ruta post /logout)
export const logout = (req, res) => {
    // borra la cookie del token queda (vacia) y elimina la fecha de expiracion
    res.cookie('token', "", { expires: new Date(0) });
    // responde con un estado 200 (OK), indicando que la operación se completo con éxito.
    return res.sendStatus(200);
};

// actualizar usuario

// función de controlador para modificar la información del usuario autenticado (ruta PUT)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // tomo el ID desde la URL
        const { username, email, password, role } = req.body;
        const updatedData = { username, email, role };
        // si viene password nueva, la hasheo
        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }
        const user = await User.findByIdAndUpdate(id, updatedData, { new: true }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "usuario no encontrado" });
        }
        res.json({
            message: "usuario actualizado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "error al actualizar usuario",
            error: error.message
        });
    }
};

// eliminar usuario

// función de controlador para eliminar la cuenta del usuario autenticado (ruta DELETE)
// eliminar usuario (solo admin)

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // esto evita que un admin se borre a sí mismo
        if (id === req.user.id) {
            return res.status(400).json({ message: "No puedes eliminar tu propia cuenta" });
        }
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "usuario no encontrado" });
        }
        res.json({ message: "usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({
            message: "error al eliminar usuario",
            error: error.message,
        });
    }
};