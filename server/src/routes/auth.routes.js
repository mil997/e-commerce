import { Router } from "express";
import { 
  register, 
  login, 
  logout, 
  verifyToken 
} from "../controllers/auth.controller.js"; // Asegúrate de que la ruta sea correcta
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", authRequired, verifyToken);

export default router;