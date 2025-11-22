import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// Importa el proveedor
import { AuthProvider } from './context/AuthProvider.jsx'; 
import { CartProvider } from './context/CartProvider.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 1. AUTHPROVIDER: NECESARIO PARA LA AUTENTICACIÓN */}
    <AuthProvider>
      {/* LUEGO CARTPROVIDER (que usa el AuthProvider) */}
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);