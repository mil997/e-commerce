import React from 'react';
import { Link } from 'react-router-dom';
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

  const handleDecreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity === 1) {
      handleRemoveItem(productId);
    } else {
      alert('Funcionalidad de decrementar pendiente — requiere endpoint PUT en backend.');
    }
  };

  if (isLoading) {
    return <h2 className="text-center mt-5">Cargando Carrito...</h2>;
  }

  if (!isAuthenticated) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="text-danger mb-4">Acceso Requerido</h2>
        <p className="text-muted mb-4">Debes iniciar sesión para ver tu carrito.</p>
        <Link to="/login" className="btn btn-primary me-2">Iniciar Sesión</Link>
        <Link to="/register" className="btn btn-outline-primary">Registrarse</Link>
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="container mt-5 text-center">
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
          
          {/* Columna izquierda: productos */}
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
                        <tr key={item.product._id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.product.image || '/images/placeholder.jpg'} 
                                alt={item.product.name}
                                className="me-3"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              />
                              <div>
                                <strong>{item.product.name}</strong>
                                {item.product.stock < 5 && item.product.stock > 0 && (
                                  <small className="text-warning d-block">Poco stock</small>
                                )}
                              </div>
                            </div>
                          </td>

                          <td>${item.product.price?.toFixed(2) || '0.00'}</td>

                          <td className="text-center">
                            <div className="btn-group">
                              <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => handleDecreaseQuantity(item.product._id, item.quantity)}
                              >
                                -
                              </button>

                              <span className="btn btn-light btn-sm disabled">
                                {item.quantity}
                              </span>

                              <button 
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => handleIncreaseQuantity(item.product._id, 1)}
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td>${((item.product.price || 0) * item.quantity).toFixed(2)}</td>

                          <td>
                            <button 
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleRemoveItem(item.product._id)}
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
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
          
          {/* Columna derecha: resumen */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: '6rem' }}>
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Resumen del Pedido</h5>
              </div>

              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <strong>${cart.total?.toFixed(2) || '0.00'}</strong>
                </div>

                <div className="list-group-item d-flex justify-content-between bg-light">
                  <strong>Total:</strong>
                  <strong className="text-primary">${cart.total?.toFixed(2) || '0.00'}</strong>
                </div>
              </div>

              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-success btn-lg">
                    Proceder al Pago
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
