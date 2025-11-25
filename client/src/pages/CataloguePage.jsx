import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import '../styles/CataloguePage.css';

const API_URL = 'http://localhost:3000/api';

function ProductCard({ product }) {
  const { isAuthenticated } = useAuth();
  const { handleIncreaseQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const handleAddToCartClick = () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para añadir productos al carrito.");
      return;
    }
    handleIncreaseQuantity(product._id, quantity);
    alert(`¡${quantity}x ${product.name} añadido al carrito!`);
  };
  return (
    <div className="card h-100 shadow-sm product-card">
      <img 
        src={product.image || '/images/placeholder.jpg'} 
        className="card-img-top"
        alt={product.name}
        style={{ height: '250px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text flex-grow-1 text-muted">
          {product.description}
        </p>
        <div className="mt-auto">
          <p className="card-text fw-bold text-primary fs-5 mb-2">
            ${product.price}
          </p>
          <p className={`small mb-3 ${product.stock === 0 ? 'text-danger' : 'text-success'}`}>
            {product.stock === 0 ? 'Sin Stock' : `Stock: ${product.stock}`}
          </p>

          {/* Selector de cantidad - solo muestra si hay stock */}
          {product.stock > 0 && (
            <div className="quantity-selector mb-3">
              <label htmlFor={`quantity-${product._id}`} className="form-label small fw-bold">
                Cantidad:
              </label>
              <input
                type="number"
                id={`quantity-${product._id}`}
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="form-control form-control-sm"
                style={{ width: '80px' }}
              />
            </div>
          )}

          <div className="d-grid gap-2">
            <Link 
              to={`/products/${product._id}`} 
              className="btn btn-outline-secondary"
            >
              Ver Detalles
            </Link>

            {/* Botón Añadir al Carrito */}
            <button
              className="btn btn-primary"
              onClick={handleAddToCartClick}
              disabled={product.stock === 0}
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function CataloguePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

useEffect(() => {
    // Sincronizar searchTerm con URL
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({});
    }
  }, [searchTerm, setSearchParams]);


   useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get(`${API_URL}/products`); 
        let productArray = [];
        if (Array.isArray(response.data)) {
          productArray = response.data;
        } else if (response.data && Array.isArray(response.data.products)) {
          productArray = response.data.products;
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

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const lowerCaseSearch = searchTerm.toLowerCase();

    return products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearch) ||
      (product.description && product.description.toLowerCase().includes(lowerCaseSearch))
    );
  }, [products, searchTerm]);

  if (loading) {
    return <h2 className="text-center mt-5"> Cargando Catálogo...</h2>;
  }
    if (error) {
    return <h2 className="text-center mt-5 text-danger">{error}</h2>;
  }

  if (products.length === 0) {
    return <h2 className="text-center mt-5 text-secondary">No hay productos disponibles en la tienda.</h2>;
  }
  return (
    <div className="catalogue-page">
      <div className="container mt-5" style={{ paddingTop: '50px' }}>

        <h1 className="text-center mb-4"> Catálogo Completo </h1>

        {/* Barra de búsqueda */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="button">
                 Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Mensaje de resultados de búsqueda */}
        {filteredProducts.length === 0 && searchTerm && (
          <div className="alert alert-info text-center">
            No se encontraron productos para "<strong>{searchTerm}</strong>".
          </div>
        )}

        {/* Contador de productos */}
        <div className="row mb-3">
          <div className="col">
            <p className="text-muted">
              Mostrando <strong>{filteredProducts.length}</strong> de <strong>{products.length}</strong> productos
              {searchTerm && <span> para "<strong>{searchTerm}</strong>"</span>}
            </p>
          </div>
        </div>

        {/* Grid de productos */}
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product._id} className="col-lg-4 col-md-6 mb-4">
              <ProductCard product={product} /> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CataloguePage;