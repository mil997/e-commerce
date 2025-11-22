import React from 'react';
<<<<<<< HEAD
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.jsx'; 
import { useCart } from '../context/useCart.jsx'; 

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const { cart } = useCart();
    
    const cartItemCount = cart ? cart.items.length : 0; 
    
    return (
        // Usamos BsNavbar (Navbar de Bootstrap) con colores oscuros
        <BsNavbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                {/* Título y enlace a la página principal */}
                <BsNavbar.Brand as={Link} to="/">
                    🛒 **CODIGO NEGRO**
                </BsNavbar.Brand>
                <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
                
                <BsNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* Enlaces de HOME */}
                        <Nav.Link as={Link} to="/">
                            HOME
                        </Nav.Link>
                    </Nav>
                  <Nav className="me-auto">
                  {/* Enlace de Catálogo actualizado */}
                   <Nav.Link as={Link} to="/catalogue">
                       Catálogo
                    </Nav.Link>
                       </Nav>
                    <Nav>
                        {/* Carrito con contador */}
                        <Nav.Link as={Link} to="/cart" className="me-3">
                            🛍️ Carrito ({cartItemCount})
                        </Nav.Link>

                        {/* Estado de Autenticación */}
                        {isAuthenticated ? (
                            <>
                                <Nav.Text className="text-info me-3">
                                    Hola, **{user.username}**
                                </Nav.Text>
                                <Button variant="outline-danger" onClick={logout}>
                                    Cerrar Sesión
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button 
                                    as={Link} 
                                    to="/login" 
                                    variant="outline-success" 
                                    className="me-2"
                                >
                                    Iniciar Sesión
                                </Button>
                                <Button as={Link} to="/register" variant="light">
                                    Registrarse
                                </Button>
                            </>
                        )}
                    </Nav>
                </BsNavbar.Collapse>
            </Container>
        </BsNavbar>
=======
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth'; // Asumiendo esta ruta
import { useCart } from "../context/useCart.jsx"; // Para mostrar ítems en el carrito

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth(); // Autenticación
    const { cart } = useCart(); // Carrito
    
    // Número total de ítems distintos en el carrito (para el icono)
    const cartItemCount = cart ? cart.items.length : 0; 
    
    return (
        <nav>
            <Link to="/">
                <h1>🛒 CODIGO NEGRO</h1>
            </Link>

            <div>
                <Link to="/" style={{ marginRight: '15px' }}>Catálogo</Link>
                
                <Link to="/cart" style={{ marginRight: '15px' }}>
                    Carrito ({cartItemCount})
                </Link>

                {isAuthenticated ? (
                    <>
                        <span style={{ marginRight: '15px' }}>Hola, **{user.username}**</span>
                        <button onClick={logout} className="auth-btn">
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: '15px' }}>Iniciar Sesión</Link>
                        <Link to="/register">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
    );
}

export default Navbar;