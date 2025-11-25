export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        console.error("Error de validación:", error);
        
        if (error.errors) {
            return res.status(400).json({
                message: "Error de validación en los datos del formulario",
                errors: error.errors.map(err => ({
                    campo: err.path.join('.'),
                    mensaje: err.message
                }))
            });
        } else {
            return res.status(400).json({
                message: "Error de validación",
                error: error.message
            });
        }
    }
};