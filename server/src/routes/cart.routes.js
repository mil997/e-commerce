import { Router } from "express"; //importo el enrutador de express para hacer peticiones
import { authRequired } from "../middlewares/validateToken.js"; // importo el auth para validar si esta autorizado o no
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", authRequired, getCart);
router.post("/add", authRequired, addToCart);
router.delete("/remove/:productId", authRequired, removeFromCart);
router.delete("/clear", authRequired, clearCart);

export default router;