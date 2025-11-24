import { z } from "zod";

export const contactSchema = z.object({
    name: z.string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser un texto"
    })
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
    .max(50, { message: "El nombre no puede exceder los 50 caracteres" })
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { 
        message: "El nombre solo puede contener letras y espacios" 
    }),

    email: z.string({
        required_error: "El email es requerido"
    })
    .email({ message: "El formato del email no es válido" })
    .max(100, { message: "El email no puede exceder los 100 caracteres" }),

    phone: z.string()
    .optional()
    .refine(phone => !phone || /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/.test(phone), {
        message: "El formato del teléfono no es válido"
    }),

    subject: z.string({
        required_error: "El asunto es requerido"
    })
    .min(1, { message: "Debes seleccionar un asunto" }),

    message: z.string({
        required_error: "El mensaje es requerido"
    })
    .min(10, { message: "El mensaje debe tener al menos 10 caracteres" })
    .max(1000, { message: "El mensaje no puede exceder los 1000 caracteres" })
    .trim()
});