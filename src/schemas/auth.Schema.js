import Joi from 'joi';

// esquema para registro
export const registerSchema = Joi.object({  // basicamente le digo que datos espero desde el front
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "El nombre de usuario es obligatorio",
    "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "el correo electrónico no es válido",
    "any.required": "el correo electrónico es obligatorio",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "la contraseña debe tener al menos 6 caracteres",
    "any.required": "la contraseña es obligatoria",
  }),
});

// esquema para login
export const loginSchema = Joi.object({  // basicamente le digo que datos espero desde el front
  email: Joi.string().email().required().messages({
    "string.email": "el correo electrónico no es válido",
    "any.required": "el correo electrónico es obligatorio",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "la contraseña debe tener al menos 6 caracteres",
    "any.required": "la contraseña es obligatoria",
  }),
});