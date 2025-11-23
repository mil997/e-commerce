import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const API_URL = 'http://localhost:3000/api';

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={product.image || '/images/placeholder.jpg'} 
        className="card-img-top"
        alt={product.name}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text flex-grow-1">
          {product.description}
        </p>
        <p className="card-text fw-bold text-primary fs-5">
          ${product.price}
        </p>
        <Link 

            as={Link} 
            to={`/products/${product._id}`} 
            variant="outline-secondary"
        >
            Ver Detalles
        </Link>
      </div>
    </div>
  );
}

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get(`${API_URL}/products`); 
        const data = response.data;
        let productArray = [];
        if (Array.isArray(data)) {
           productArray = data;
        } else if (data && Array.isArray(data.products)) {
          productArray = data.products;
        } else {
          console.warn("La API no devolvio un array. Datos recibidos:", data);
        }

        setProducts(productArray);
        setLoading(false);

      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Error al obtener los datos de productos. Por favor, intenta más tarde.");
        setLoading(false);
      }
    }
    loadProducts();
    }, []);

  if (loading) {
    return <h2 className="text-center mt-5">Cargando productos...</h2>;
  }

  if (error) {
    return <h2 className="text-center mt-5 text-danger">{error}</h2>;
  }

  return (
    <div className="home-page" style={{ paddingTop: '0' }}>
      {/* Carrusel que ocupa toda la pantalla */}
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000" style={{ marginTop: '0' }}>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img 
              className="d-block w-100" 
              src="/images/img4.png" 
              alt="First slide"
              style={{ 
                height: '100vh', 
                objectFit: 'cover',
                width: '100%'
              }}
            />
          </div>
          <div className="carousel-item">
            <img 
              className="d-block w-100" 
              src="/images/img5.png" 
              alt="Second slide"
              style={{ 
                height: '100vh', 
                objectFit: 'cover',
                width: '100%'
              }}
            />
          </div>
          <div className="carousel-item">
            <img 
              className="d-block w-100" 
              src="/images/img3.png" 
              alt="Third slide"
              style={{ 
                height: '100vh', 
                objectFit: 'cover',
                width: '100%'
              }}
            />
          </div>
          <div className="carousel-item">
            <img 
              className="d-block w-100" 
              src="/images/img1.png" 
              alt="Fourth slide"
              style={{ 
                height: '100vh', 
                objectFit: 'cover',
                width: '100%'
              }}
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Contenido de productos */}
      <div className="container mt-5" style={{ paddingTop: '50px' }}>
        <h1 className="text-center mb-4">Productos Destacados</h1>
        {products.length === 0 ? (
          <h2 style={{ textAlign: 'center' }}>No hay productos disponibles en la tienda.</h2>
        ) : (
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-lg-4 col-md-6 mb-4">
                <ProductCard product={product} /> 
              </div>
            ))}
          </div>
          )}
      </div>
    </div>
     );
}
export default HomePage;