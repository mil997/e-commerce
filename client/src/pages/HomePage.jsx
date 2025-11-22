<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';
=======
<<<<<<< HEAD
=======
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
>>>>>>> d072c96e9424f77456a7fad24c55a8f7dd9ff67b
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
>>>>>>> yoquienmas
import '../styles/HomePage.css';

const API_URL = 'http://localhost:3000/api';

<<<<<<< HEAD
=======
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

>>>>>>> yoquienmas
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
<<<<<<< HEAD
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2 style={{ color: 'red', textAlign: 'center' }}>{error}</h2>;
=======
    return <h2 className="text-center mt-5">Cargando productos...</h2>;
  }

  if (error) {
    return <h2 className="text-center mt-5 text-danger">{error}</h2>;
>>>>>>> yoquienmas
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
<<<<<<< HEAD
  );
=======
<<<<<<< HEAD
  );
=======
    );
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
>>>>>>> d072c96e9424f77456a7fad24c55a8f7dd9ff67b
>>>>>>> yoquienmas
}

export default HomePage;