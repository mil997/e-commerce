import { Router } from "express";
import { submitContact, getContacts, deleteContact } from "../controllers/contact.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { contactSchema } from "../schemas/contact.schema.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post("/contact", validateSchema(contactSchema), submitContact);

router.get("/contacts", authRequired, isAdmin, getContacts);

router.delete("/contact/:id", authRequired, isAdmin, deleteContact);

export default router;