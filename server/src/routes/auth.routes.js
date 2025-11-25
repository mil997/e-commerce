import { Router } from "express"; // importo el enrutador de express para hacer peticiones
import { login, register, logout, profile, updateUser, deleteUser } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js"; // importo la autorizacion para que valide
import { validateSchema } from "../middlewares/validator.middleware.js"; // importo el schema de joi así valida
import { registerSchema, loginSchema } from "../schemas/auth.Schema.js"; // importo el schema de joi así valida
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// esto es el registro y login

router.post("/register", validateSchema(registerSchema), register); // ejecuta el schema de joi y si pasa lo registra
router.post("/login", validateSchema(loginSchema), login);   // ejecuta el schema de joi y si pasa lo deja logearse

// esto es el perfil y logout

router.get("/profile", authRequired, profile);   // va al pefil de user, siempre que este validado
router.post("/logout", logout);             // es para que el usuario se deslogee de la pagina

// esto es editar y eliminar usuarios

router.put("/user/:id", authRequired, isAdmin, updateUser);   // es para editar el usuario que se autentico
router.delete("/user/:id", authRequired, isAdmin, deleteUser); // solo un admin puede eliminar usuarios
export default router;