// src/routes/product.routes.js - CORREGIDO
import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);                     
router.get("/:id", getProduct);                  
router.post("/", authRequired, createProduct);   
router.put("/:id", authRequired, updateProduct); 
router.delete("/:id", authRequired, deleteProduct); 

export default router;