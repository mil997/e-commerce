// defino y exporto una función superior llamada 'validateSchema'.
// esta función toma un objeto de esquema de validación de JOI y devuelve un middleware de Express.
export const validateSchema = (schema) => (req, res, next) => {
  // valida el cuerpo de la solicitud (req.body) contra el esquema proporcionado.
  // la opción '{ abortEarly: false }' asegura que recopile todos los errores de validación, no solo el primero.
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    // si hay un error, envia una respuesta con el código de estado 400 (solicitud incorrecta).
    return res.status(400).json({
      // intenta extraer el mensaje del primer error en la lista 'error.details'.
      // si no hay detalles disponibles (por las dudas), usa el mensaje generico "datos invalidos".
      message: error.details?.[0]?.message || "datos inválidos",
    });
  }

// si la validación es exitosa (no hay errores), llama a 'next()' para pasar el control al siguiente middleware o al controlador de ruta principal.
  next();
};