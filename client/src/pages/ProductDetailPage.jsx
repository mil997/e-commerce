import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import '../styles/ProductDetail.css';

const API_URL = 'http://localhost:3000/api';

function ProductDetailPage() {
    const { id } = useParams();
    const { isAuthenticated } = useAuth();
    const { handleIncreaseQuantity } = useCart();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function loadProduct() {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Error al cargar producto:", err);
                setError("No se pudo cargar la información del producto.");
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);

    const handleAddToCartClick = () => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para añadir productos al carrito.");
            return;
        }
        handleIncreaseQuantity(product._id, quantity);
        alert(`¡${quantity}x ${product.name} añadido al carrito!`);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= product.stock) {
            setQuantity(value);
        } else if (value > product.stock) {
            setQuantity(product.stock);
            alert(`Stock máximo disponible: ${product.stock}`);
        }
    };

    if (loading) {
        return (
            <div className="product-detail-container">
                <div className="text-center mt-5">
                    <h2>Cargando producto...</h2>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="product-detail-container">
                <div className="error-message text-center">
                    <h2>{error || "Producto no encontrado."}</h2>
                    <Link to="/" className="btn btn-primary mt-3">
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-page">
            <div className="container mt-5">
                {/* Breadcrumb */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/products">Productos</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            {product.name}
                        </li>
                    </ol>
                </nav>

                <div className="product-detail-card shadow-sm">
                    <div className="row g-4">
                        {/* Columna Imagen */}
                        <div className="col-md-6">
                            <div className="product-image-container">
                                <img 
                                    src={product.image || '/images/placeholder.jpg'} 
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>
                        </div>
                        
                        {/* Columna Información */}
                        <div className="col-md-6">
                            <div className="product-info">
                                <h1 className="product-title">{product.name}</h1>
                                
                                <div className="price-section mb-3">
                                    <span className="product-price">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="original-price ms-2">${product.originalPrice}</span>
                                    )}
                                </div>
                                
                                <p className="product-description lead">
                                    {product.description}
                                </p>
                                
                                <div className="stock-info mb-4">
                                    <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                        {product.stock > 0 ? `✓ En Stock (${product.stock})` : '✗ Agotado'}
                                    </span>
                                </div>

                                {/* Selector de Cantidad */}
                                <div className="quantity-selector mb-4">
                                    <label htmlFor="quantity" className="form-label fw-bold">
                                        Cantidad:
                                    </label>
                                    <div className="d-flex align-items-center">
                                        <input
                                            type="number"
                                            id="quantity"
                                            min="1"
                                            max={product.stock}
                                            value={quantity}
                                            onChange={handleQuantityChange}
                                            className="quantity-input"
                                            disabled={product.stock === 0}
                                        />
                                        <span className="stock-max ms-2 text-muted">
                                            Máx: {product.stock}
                                        </span>
                                    </div>
                                </div>

                                {/* Botones de Acción */}
                                <div className="action-buttons">
                                    <button
                                        className="btn btn-primary btn-lg me-3"
                                        onClick={handleAddToCartClick}
                                        disabled={product.stock === 0}
                                    >
                                         Añadir al Carrito
                                    </button>
                                    
                                    <Link to="/" className="btn btn-outline-secondary">
                                        ← Seguir Comprando
                                    </Link>
                                </div>

                                {/* Información Adicional */}
                                <div className="product-meta mt-4">
                                    <p className="text-muted small">
                                        <strong>ID:</strong> {product._id}
                                    </p>
                                    {product.category && (
                                        <p className="text-muted small">
                                            <strong>Categoría:</strong> {product.category}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de Productos Relacionados (opcional) */}
                <div className="related-products mt-5">
                    <h3 className="text-center mb-4">Productos Relacionados</h3>
                    <div className="text-center">
                        <p className="text-muted">
                            Próximamente: productos similares que podrían interesarte
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;