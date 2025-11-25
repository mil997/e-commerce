import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth.jsx'; // Asegúrate que tenga .jsx
import { CartContext } from './CartContext.jsx'; // <-- Nueva importación

const API_URL = 'http://localhost:3000/api'; 
// export const CartContext = createContext(); // <-- ELIMINADO
axios.defaults.withCredentials = true;

  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  
export const CartProvider = ({ children }) => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const [cart, setCart] = useState({ items: [], total: 0 });
    const [isLoading, setIsLoading] = useState(true);

    // FUNCIÓN ELIMINADA: calculateLocalTotal ya no es necesaria.
    
    // 1. Cargar el carrito cuando el usuario se autentica
    useEffect(() => {
        async function loadCart() {
            if (authLoading) return;

            if (isAuthenticated) {
                try {
                    const res = await axios.get(`${API_URL}/cart`);
                    setCart(res.data);
                } catch (error) {
                    console.error("Error al cargar el carrito:", error);
                    setCart({ items: [], total: 0 });
                }
            } else {
                setCart({ items: [], total: 0 });
            }
            setIsLoading(false);
        }
        loadCart();
    }, [isAuthenticated, authLoading]);

    // 2. Agregar al carrito
    const handleIncreaseQuantity = async (productId, quantity = 1) => {
        if (!isAuthenticated) return alert("Debes iniciar sesión para añadir productos.");
        
        try {
            const res = await axios.post(`${API_URL}/cart/add`, { productId, quantity });
            console.log("Carrito después de añadir:", res.data);
            setCart(res.data); 
        } catch (error) {
            console.error("Error al añadir producto:", error);
        }
    };
    
    // 3. Eliminar ítem completo
    const handleRemoveItem = async (productId) => {
        if (!isAuthenticated) return;
        
        try {
            const res = await axios.delete(`${API_URL}/cart/remove/${productId}`);
            console.log("Carrito después de eliminar:", res.data);
            setCart(res.data); 
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            alert("Error: " + (error.response?.data?.message || "No se pudo eliminar el producto"));
        }
    };
    
    // 4. Vaciar carrito
    const handleClearCart = async () => {
        if (!isAuthenticated) return;
        
        try {
            await axios.delete(`${API_URL}/cart/clear`); 
            setCart({ items: [], total: 0 });
        } catch (error) {
            console.error("Error al vaciar carrito:", error);
        }
    };


    const contextValue = {
        cart,
        isLoading,
        isAuthenticated,
        handleIncreaseQuantity,
        handleRemoveItem,
        handleClearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};