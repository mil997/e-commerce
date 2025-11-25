import { Router } from "express"; //importo el enrutador de express para hacer peticiones
import { authRequired } from "../middlewares/validateToken.js"; // importo el auth para validar si esta autorizado o no
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", authRequired, getCart); // hace una peticion de tipo GET para obtener el carrito si esta autorizado
router.post("/add", authRequired, addToCart); // hace una peticion de tipo POST para agregar al carrito si esta autorizado
router.delete("/remove/:productId", authRequired, removeFromCart); // hace una peticion de tipo DELETE para eliminar algo del carrito si esta autorizado
router.delete("/clear", authRequired, clearCart); // hace una peticion de tipo DELETE para vaciar el carrito si esta autorizado

export default router;