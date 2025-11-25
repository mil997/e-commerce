import { Router } from "express"; // importo el enrutador de express para hacer peticiones
import { authRequired } from "../middlewares/validateToken.js"; // importo el auth para validar usuario
import { createOrder, captureOrder, cancelOrder } from "../controllers/payment.controller.js";

const router = Router();

router.post("/create-order", authRequired, createOrder); // hace una peticion de tipo POST para iniciar la orden de pago
router.get("/capture-order", captureOrder); // hace una peticion de tipo GET para capturar el pago exitoso (success)
router.get("/cancel-order", cancelOrder); // hace una peticion de tipo GET para manejar la cancelación del pago

export default router;