import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css'; // <-- Importación de Bootstrap
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'; 
import { CartProvider } from './context/CartProvider.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. AUTHPROVIDER: NECESARIO PARA LA AUTENTICACIÓN */}
    <AuthProvider>
      {/* 2. CARTPROVIDER: NECESARIO PARA EL CARRITO, DEBE ESTAR DENTRO DE AUTHPROVIDER */}
=======
import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx'; 
import { CartProvider } from './context/CartProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* PRIMERO AUTHPROVIDER */}
    <AuthProvider>
      {/* LUEGO CARTPROVIDER (que usa el AuthProvider) */}
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)