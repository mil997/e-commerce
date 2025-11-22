import React from 'react';
<<<<<<< HEAD
import { useCart } from '../context/useCart.jsx'; 
// Importaciones de Bootstrap
import { Container, Row, Col, Button, Card, ListGroup, Table } from 'react-bootstrap'; 

function CartPage() {
    // Estas son las funciones y estado que vienen de tu CartProvider
=======
import { useCart } from '../context/CartProvider'; 

function CartPage() {
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
    const { 
        cart, 
        handleRemoveItem, 
        handleIncreaseQuantity, 
        handleClearCart, 
        isLoading, 
<<<<<<< HEAD
        isAuthenticated
    } = useCart();
    
    // Función de disminución (Requiere un endpoint PUT en el backend que no tenemos, por ahora solo elimina el ítem si la cantidad es 1)
=======
        isAuthenticated 
    } = useCart();
    
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
    const handleDecreaseQuantity = (productId, currentQuantity) => {
        if (currentQuantity === 1) {
            handleRemoveItem(productId); 
        } else {
<<<<<<< HEAD
            // Lógica para decrementar: necesitarías un endpoint PUT /api/cart/:productId
            alert('Funcionalidad de decrementar pendiente de endpoint en el backend.');
        }
    };
    
    if (isLoading) return <h2 className="text-center mt-5">Cargando Carrito...</h2>;

    if (!isAuthenticated) {
        return <h2 className="text-center mt-5 text-danger">Debes iniciar sesión para ver tu carrito.</h2>;
    }

    if (cart.items.length === 0) {
        return <h2 className="text-center mt-5 text-secondary">Tu carrito está vacío 😔. ¡Añade algunos productos!</h2>;
    }

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">🛍️ Carrito de Compras</h1>
            
            <Row>
                
                {/* === Columna de Ítems del Carrito (8 de 12) === */}
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Header as="h5">Productos en tu Carrito</Card.Header>
                        <Table responsive hover className="mb-0">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio Unitario</th>
                                    <th className="text-center">Cantidad</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.items.map(item => (
                                    <tr key={item.product._id}>
                                        <td>{item.product.name}</td>
                                        <td>${item.product.price.toFixed(2)}</td>
                                        <td className="text-center">
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm" 
                                                onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                                                className="me-1"
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button 
                                                variant="outline-secondary" 
                                                size="sm" 
                                                onClick={() => handleIncreaseQuantity(item.product._id, 1)}
                                            >
                                                +
                                            </Button>
                                        </td>
                                        <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <Button 
                                                variant="outline-danger" 
                                                size="sm" 
                                                onClick={() => handleRemoveItem(item.product._id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card>
                    <div className="d-grid gap-2 mt-3">
                        <Button 
                            variant="warning" 
                            onClick={handleClearCart}
                        >
                            Vaciar Carrito
                        </Button>
                    </div>
                </Col>
                
                {/* === Columna de Resumen (4 de 12) === */}
                <Col md={4}>
                    <Card className="shadow-sm sticky-top" style={{ top: '6rem' }}>
                        <Card.Header as="h5" className="bg-primary text-white">Resumen del Pedido</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Subtotal: <span className="float-end">${cart.total.toFixed(2)}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="bg-light fw-bold">
                                Total a Pagar: <span className="float-end">${cart.total.toFixed(2)}</span>
                            </ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <div className="d-grid">
                                <Button variant="success" size="lg" className="mb-2">
                                    Proceder al Pago
                                </Button>
                                <Button variant="outline-primary" size="sm">
                                    Seguir Comprando
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
=======
            alert('Para disminuir la cantidad, debes implementar un endpoint PUT en el backend.');
        }
    };
    
    if (isLoading) return <h2 style={{ textAlign: 'center' }}>Cargando Carrito...</h2>;

    if (!isAuthenticated) {
        return <h2 style={{ textAlign: 'center' }}>Debes iniciar sesión para ver tu carrito.</h2>;
    }

    if (cart.items.length === 0) {
        return <h2 style={{ textAlign: 'center' }}>Tu carrito está vacío 😔. ¡Añade algunos productos!</h2>;
    }

    return (
        <div className="cart-page">
            <h1>🛍️ Carrito de Compras</h1>
            
            <div className="cart-content">
                
                {/* === Sección de Ítems del Carrito === */}
                <div className="cart-items">
                    {cart.items.map(item => (
                        <div key={item.product._id} className="cart-item">
                            <div className="item-details">
                                <h4>{item.product.name}</h4>
                                <p>Precio: ${item.product.price.toFixed(2)} c/u</p>
                            </div>
                            
                            <div className="item-controls">
                                <div className="quantity-control">
                                    <button 
                                        className="qty-btn"
                                        onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                                        aria-label="Disminuir cantidad"
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{item.quantity}</span>
                                    <button 
                                        className="qty-btn"
                                        onClick={() => handleIncreaseQuantity(item.product._id, 1)}
                                        aria-label="Aumentar cantidad"
                                    >
                                        +
                                    </button>
                                </div>
                                
                                <button 
                                    className="remove-btn"
                                    onClick={() => handleRemoveItem(item.product._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* === Sección de Resumen del Carrito === */}
                <div className="cart-summary">
                    <h2>Resumen del Pedido</h2>
                    <p>Subtotal: ${cart.total.toFixed(2)}</p>
                    <div className="cart-total">
                        Total a Pagar: ${cart.total.toFixed(2)}
                    </div>
                    
                    <button className="checkout-btn">
                        Proceder al Pago
                    </button>
                    
                    <button 
                        className="clear-cart-btn"
                        onClick={handleClearCart}
                    >
                        Vaciar Carrito
                    </button>
                </div>
            </div>
        </div>
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
    );
}

export default CartPage;