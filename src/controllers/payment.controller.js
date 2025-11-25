// Controladores simulados para la pasarela de pago

export const createOrder = async (req, res) => {
    try {
        // aca va la lógica real con Stripe/MercadoPago
        // Ejemplo: const session = await stripe.checkout.sessions.create(...)
        
        // Retornamos un mock (simulación) para que el frontend funcione
        console.log("Creando orden de pago para el usuario:", req.user.id);
        
        res.status(200).json({
            message: "Sesión de pago creada exitosamente",
            orderId: "ord_mock_12345",
            url: "http://localhost:3000/api/payment/capture-order" // URL simulada para redirección automática
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const captureOrder = (req, res) => {
    // aca llega la notificación de que el pago fue exitoso
    console.log("Pago capturado exitosamente");
    
    // podes redirigir al frontend a una página de "Gracias por tu compra"
    // res.redirect("http://localhost:5173/success"); 
    res.send("Pago realizado con éxito (Simulación)");
};

export const cancelOrder = (req, res) => {
    // aca llega si el usuario cancela en la pasarela
    console.log("Pago cancelado por el usuario");
    
    // podes redirigir al frontend a una página de error o al carrito
    // res.redirect("http://localhost:5173/cart");
    res.send("Pago cancelado (Simulación)");
};