import express from 'express'
import morgan from "morgan";
import 'dotenv/config';
import cors from 'cors';
import cartRoutes from "./routes/cart.routes.js";
import cookieParser from 'cookie-parser'; // para que express lea las cookies
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from './routes/contact.routes.js';

const app = express();

app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// rutas

app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api', contactRoutes);


export default app;