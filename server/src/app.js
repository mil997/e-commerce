// app.js - CONFIGURACIÓN FINAL
import express from 'express'
import morgan from "morgan";
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Importar rutas
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import contactRoutes from './routes/contact.routes.js';
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// RUTAS CORREGIDAS
app.use("/api/auth", authRoutes);      
app.use("/api/products", productRoutes); 
app.use("/api/cart", cartRoutes);       
app.use("/api", contactRoutes);          
app.use("/api/payment", paymentRoutes);  
export default app;


app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  console.log('📧 Mensaje de contacto recibido:', {
    name, email, phone, subject, message
  });

  // Validaciones básicas
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: 'Todos los campos obligatorios deben ser completados'
    });
  }

  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'El formato del email no es válido'
    });
  }

  // Simular envío exitoso
  res.status(200).json({
    success: true,
    message: 'Mensaje enviado correctamente. Te contactaremos pronto.'
  });
});