import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart.jsx'; 
import '../styles/CartPage.css';

function CartPage() {
  const { 
    cart, 
    handleRemoveItem, 
    handleIncreaseQuantity, 
    handleClearCart, 
    isLoading, 
    isAuthenticated
  } = useCart();

  const navigate = useNavigate();
  
  const handleDecreaseQuantity = async (productId, currentQuantity) => {
    if (currentQuantity === 1) {
      handleRemoveItem(productId); 
    } else {
      // Para decrementar, usamos handleIncreaseQuantity con cantidad negativa
      await handleIncreaseQuantity(productId, -1);
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.items && cart.items.length > 0) {
      navigate('/checkout');
    } else {
      alert('Tu carrito está vacío');
    }
  };

  if (isLoading) {
    return <h2 className="text-center mt-5">Cargando Carrito...</h2>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container text-center cart-container-fix">
        <h2 className="text-danger mb-4">Acceso Requerido</h2>
        <p className="text-muted mb-4">Debes iniciar sesión para ver tu carrito.</p>
        <Link to="/login" className="btn btn-primary me-2">Iniciar Sesión</Link>
        <Link to="/register" className="btn btn-outline-primary">Registrarse</Link>
      </div>
    );
  }

  // Verificar si cart.items existe y tiene elementos
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container text-center cart-container-fix">
        <h2 className="text-secondary mb-4">Carrito Vacío</h2>
        <p className="text-muted mb-4">Tu carrito está vacío. ¡Añade algunos productos!</p>
        <Link to="/catalogue" className="btn btn-primary">Explorar Catálogo</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container mt-5" style={{ paddingTop: '50px' }}>
        <h1 className="text-center mb-4">Carrito de Compras</h1>
        
        <div className="row">
          
          {/* Columna de productos */}
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Productos en tu Carrito</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th className="text-center">Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.items.map(item => (
                        <tr key={item.product?._id || item._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.product?.image || item.image || '/images/placeholder.jpg'} 
                                alt={item.product?.name || item.name}
                                className="me-3"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                onError={(e) => {
                                  e.target.src = '/images/placeholder.jpg';
                                }}
                              />
                              <div>
                                <strong>{item.product?.name || item.name}</strong>
                                {item.product?.stock < 5 && item.product?.stock > 0 && (
                                  <small className="text-warning d-block">Poco stock</small>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>${(item.product?.price || item.price || 0).toFixed(2)}</td>
                          <td className="text-center">
                            <div className="btn-group" role="group">
                              <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => handleDecreaseQuantity(item.product?._id || item._id, item.quantity)}
                                disabled={isLoading}
                              >
                                -
                              </button>
                              <span className="btn btn-light btn-sm disabled">
                                {item.quantity}
                              </span>
                              <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => handleIncreaseQuantity(item.product?._id || item._id, 1)}
                                disabled={isLoading}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td>${((item.product?.price || item.price || 0) * item.quantity).toFixed(2)}</td>
                          <td>
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleRemoveItem(item.product?._id || item._id)}
                              disabled={isLoading || !item.product}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button 
                className="btn btn-warning"
                onClick={handleClearCart}
                disabled={isLoading || cart.items.length === 0}
              >
                {isLoading ? 'Procesando...' : 'Vaciar Carrito'}
              </button>
            </div>
          </div>
          
          {/* Columna de resumen */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '6rem' }}>
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Resumen del Pedido</h5>
              </div>
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <strong>${(cart.total || 0).toFixed(2)}</strong>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <span>Envío:</span>
                  <span className="text-success">Gratis</span>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <span>Items:</span>
                  <span>{cart.items?.length || 0}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between bg-light">
                  <strong>Total:</strong>
                  <strong className="text-primary">${(cart.total || 0).toFixed(2)}</strong>
                </div>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-success btn-lg"
                    onClick={handleProceedToCheckout}
                    disabled={isLoading || cart.items.length === 0}
                  >
                    {isLoading ? 'Procesando...' : 'Proceder al Pago'}
                  </button>
                  <Link to="/catalogue" className="btn btn-outline-primary">
                    ← Seguir Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;