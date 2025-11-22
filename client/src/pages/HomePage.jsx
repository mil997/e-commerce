<<<<<<< HEAD
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function HomePage() {
  return (
    <Container className="my-5">
      {/* Jumbotron/Banner de Bienvenida */}
      <div className="p-5 mb-4 bg-light rounded-3 text-center shadow-sm">
        <h1 className="display-4">👋 ¡Bienvenido a CODIGO NEGRO!</h1>
        <p className="lead">
          Tu destino online para los mejores productos. Descubre nuestra colección completa o mira nuestras ofertas destacadas.
        </p>
        <hr className="my-4" />
        <p>
          Encuentra exactamente lo que estás buscando.
        </p>
        <Button 
          as={Link} 
          to="/catalogue" 
          variant="primary" 
          size="lg"
        >
          Explorar Catálogo Completo 🚀
        </Button>
      </div>

      {/* Aquí podrías añadir un carrusel o productos destacados */}
      <h2 className="text-center mt-5 mb-4">✨ Ofertas Destacadas del Mes</h2>
      {/* ... (Aquí irían los componentes de productos destacados si los tuvieras) ... */}

    </Container>
  );
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import '../styles/HomePage.css'; //falta crearste archivo 

const API_URL = 'http://localhost:3000/api'; 

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //uso de estas funciones mientras de prueba
  //falta CURRUSEL CON PRODUCTOS DE TEMPORADA
  //falta VISTA DE PRODUCTOS MAS VENDIDOS/DESTACADOS

  // Dentro del useEffect debe de estar todo el código para cargar los productos
  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get(`${API_URL}/products`); 
        const data = response.data;
        // Comprobamos el array
        let productArray = [];
        if (Array.isArray(data)) {
            // Caso 1: El backend devuelve directamente el array
            productArray = data;
        } else if (data && Array.isArray(data.products)) {
            // Caso 2: El backend envuelve el array
            productArray = data.products;
        } else {
            // Caso 3: No es un array (error del backend, o base de datos vacía)
            console.warn("La API no devolvio un array. Datos recibidos:", data);
        }

        setProducts(productArray);
        setLoading(false);

      } catch (err) {
        // Muestra el error de conexión si el backend está apagado o falla
        console.error("Error al cargar productos:", err);
        setError("Error al obtener los datos de productos. Por favor, intenta más tarde.");
        setLoading(false);
      }
    }
    loadProducts();
    
  }, []); // El array vacio asegura que se ejecuta solo una vez al inicio
  
  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2 style={{ color: 'red', textAlign: 'center' }}>{error}</h2>;
  }
  
  // Si no hay productos después de cargar (base de datos vacía)
  if (products.length === 0) {
      return <h2 style={{ textAlign: 'center' }}>No hay productos disponibles en la tienda.</h2>;
  }

  return (
    <div className="home-page">
      <h1>🛍️ Catálogo de Productos</h1>
      
      <div className="product-grid"> 
        {products.map(product => (
        
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description.substring(0, 70)}...</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            
            <div className="card-actions">
              <a 
                href={`/products/${product._id}`} 
                className="view-details-btn"
              >
                Ver Detalles
              </a>
              <button 
                className="add-to-cart-btn"

                disabled={product.stock === 0}
              >
                Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
}

export default HomePage;