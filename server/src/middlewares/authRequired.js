export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    
    if (!token) {
        return res.status(401).json({ message: "no hay token, autorización rechazada" });
    }

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({ message: "token inválido" });

        // Asegúrate de que el token incluya toda la información necesaria
        req.user = {
            id: user.id,
            username: user.username,  // Añade esto
            email: user.email,        // Añade esto  
            role: user.role
        };
        
        next();
    });
};