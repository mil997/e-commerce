import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartProvider'; 

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  const shortDescription = product.description 
    ? product.description.substring(0, 100) + (product.description.length > 100 ? '...' : '')
    : 'Sin descripción.';

  const handleAddToCart = () => {
    addToCart(product._id, 1); 
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-link">
        <h3>{product.name}</h3>
      </Link>
      <p>Precio: ${product.price.toFixed(2)}</p>
      <p>{shortDescription}</p>
      <p>Stock: {product.stock}</p>
      <div className="card-actions">
        <button onClick={handleAddToCart} disabled={product.stock === 0} className="add-to-cart-btn">
          {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
        </button>
        <Link to={`/products/${product._id}`} className="view-details-btn">
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;