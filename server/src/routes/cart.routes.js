import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { addToCart, getCart, removeFromCart, clearCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", authRequired, getCart);
router.post("/add", authRequired, addToCart);
router.delete("/remove/:productId", authRequired, removeFromCart);
router.delete("/clear", authRequired, clearCart);

export default router;