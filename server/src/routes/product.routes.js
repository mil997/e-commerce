import { Router } from "express"; //importo el enrutador de express para hacer peticiones
import { authRequired } from "../middlewares/validateToken.js"; // importo el auth para validar si esta autorizado o no
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, } from "../controllers/product.controller.js";

const router = Router();

// rutas CRUD de productos
router.get("/products", getProducts); // hace una peticion de tipo GET a products para obtener todos los productos
router.get("/products/:id", getProduct); // hace una peticion de tipo GET a product para obtener un producto por ID
router.post("/products", authRequired, createProduct); // hace una peticion de tipo POST para crear un producto siempre y cuando este autorizado
router.put("/products/:id", authRequired, updateProduct); // hace una peticion de tipo PUT para actualizar un producto siempre y cuando este autorizado
router.delete("/products/:id", authRequired, deleteProduct); // hace una peticion de tipo DELETE para borrar un producto siempre y cuando este autorizado

export default router;