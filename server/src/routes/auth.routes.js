import { Router } from "express";
import { login, register, logout, profile, updateUser, deleteUser } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.Schema.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// esto es el registro y login

router.post("/register", validateSchema(registerSchema), register); // es para que el usuario se registre en la pagina 
router.post("/login", validateSchema(loginSchema), login);   // es para que el usuario se logee en la pagina

// esto es el perfil y logout

router.get("/profile", authRequired, profile);   // crea un perfil para el usuario
router.post("/logout", logout);             // es para que el usuario se deslogee de la pagina

// esto es editar y eliminar usuarios

router.put("/user/:id", authRequired, isAdmin, updateUser);   // es para editar el usuario que se autentico
router.delete("/user/:id", authRequired, isAdmin, deleteUser); // solo un admin puede eliminar usuarios
export default router;