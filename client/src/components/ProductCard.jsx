import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img 
        src={product.image || '/images/placeholder.jpg'} 
        className="product-image"
        alt={product.name}
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.description}
        </p>
        <p className="product-price">
          ${product.price}
        </p>
        <Link 
          to={`/products/${product._id}`} 
          className="product-detail-btn"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;