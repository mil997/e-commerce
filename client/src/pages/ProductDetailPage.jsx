import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
import axios from 'axios';
// Importaciones de Bootstrap
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap'; 
import { useCart } from '../context/useCart.jsx';
import { useAuth } from '../context/useAuth.jsx';
=======
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartProvider';
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665

const API_URL = 'http://localhost:3000/api'; 

function ProductDetailPage() {
<<<<<<< HEAD
    const { id } = useParams(); // Obtiene el ID del producto de la URL
    const { isAuthenticated } = useAuth();
    const { handleIncreaseQuantity } = useCart();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // Estado para la cantidad a añadir

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
    }, [id]); // Dependencia en 'id' para recargar si cambia

    // Manejador para el botón "Añadir al Carrito"
    const handleAddToCartClick = () => {
        if (!isAuthenticated) {
            alert("Debes iniciar sesión para añadir productos al carrito.");
            return;
        }
        handleIncreaseQuantity(product._id, quantity);
        alert(`¡${quantity}x ${product.name} añadido al carrito!`);
    };

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    if (error || !product) {
        return (
            <Container className="mt-5">
                <Alert variant="danger" className="text-center">{error || "Producto no encontrado."}</Alert>
            </Container>
        );
    }
    
    // Función simple para manejar el cambio de cantidad
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value > 0 && value <= product.stock) {
            setQuantity(value);
        } else if (value > product.stock) {
            setQuantity(product.stock);
            alert(`Stock máximo disponible: ${product.stock}`);
        }
    };


    return (
        <Container className="my-5">
            <Row className="g-5">
                
                {/* Columna Izquierda: Imagen (Placeholder) */}
                <Col md={6}>
                    <div 
                        style={{ 
                            backgroundColor: '#f8f9fa', 
                            height: '400px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            borderRadius: '8px'
                        }}
                    >
                        {/* Puedes reemplazar esto con una etiqueta <img src={product.imageURL} /> real */}
                        <h4 className="text-muted">🖼️ Imagen de Producto</h4>
                    </div>
                </Col>
                
                {/* Columna Derecha: Información y Compra */}
                <Col md={6}>
                    <h1 className="mb-3">{product.name}</h1>
                    <h2 className="text-primary mb-4">${product.price.toFixed(2)}</h2>
                    
                    <p className="lead border-bottom pb-3">
                        {product.description}
                    </p>
                    
                    <div className="mb-4">
                        <p className="fw-bold">
                            Disponibilidad: 
                            <span className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                                {product.stock > 0 ? ` En Stock (${product.stock} unidades)` : ' Agotado'}
                            </span>
                        </p>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                        <span className="me-3 fw-bold">Cantidad:</span>
                        <input
                            type="number"
                            min="1"
                            max={product.stock}
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="form-control me-3"
                            style={{ width: '80px' }}
                            disabled={product.stock === 0}
                        />
                        
                        <Button
                            variant="success"
                            size="lg"
                            onClick={handleAddToCartClick}
                            disabled={product.stock === 0}
                        >
                            <i className="bi bi-cart-plus-fill me-2"></i> 
                            Añadir al Carrito
                        </Button>
                    </div>
                    
                    <p className="small text-secondary mt-4">
                        ID del Producto: {product._id}
                    </p>
                </Col>
            </Row>
        </Container>
=======
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`${API_URL}/products/${id}`); 
                setProduct(response.data);
                setError(null);
            } catch (err) {
                console.error("Error al obtener producto:", err);
                if (err.response && err.response.status === 404) {
                    setError('Producto no encontrado.');
                } else {
                    setError('Error al cargar la información del producto.');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        const success = await addToCart(product._id, quantity);
        if (success) {
            setQuantity(1); 
        }
    };

    if (loading) {
        return <h2 style={{ textAlign: 'center' }}>Cargando producto...</h2>;
    }

    if (error) {
        return <h2 style={{ color: 'red', textAlign: 'center' }}>{error}</h2>;
    }
    
    if (!product) {
        return <h2 style={{ textAlign: 'center' }}>Producto no encontrado.</h2>;
    }

    return (
        <div className="product-detail-page">
            <button onClick={() => navigate('/')} className="back-btn">
                ← Volver al Catálogo
            </button>
            <div className="product-info-container">
                <h1>{product.name}</h1>
                <p className="product-price">Precio: ${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description || 'Sin descripción detallada.'}</p>
                <p className="product-stock">Stock disponible: <strong>{product.stock}</strong></p>

                {product.stock > 0 ? (
                    <div className="add-to-cart-controls">
                        <label htmlFor="quantity">Cantidad:</label>
                        <input
                            type="number"
                            id="quantity"
                            min="1"
                            max={product.stock}
                            value={quantity}
                            onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, Number(e.target.value))))}
                            className="quantity-input"
                        />
                        <button onClick={handleAddToCart} className="add-to-cart-btn-lg">
                            Añadir al Carrito ({quantity} unidad{quantity > 1 ? 'es' : ''})
                        </button>
                    </div>
                ) : (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>Producto agotado.</p>
                )}
            </div>
        </div>
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
    );
}

export default ProductDetailPage;