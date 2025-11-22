<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> yoquienmas
import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { Link } from "react-router-dom";


function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
<<<<<<< HEAD
=======
=======
import React from 'react';
<<<<<<< HEAD
import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.jsx'; 
import { useCart } from '../context/useCart.jsx'; 

function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const { cart } = useCart();
>>>>>>> d072c96e9424f77456a7fad24c55a8f7dd9ff67b
>>>>>>> yoquienmas
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> yoquienmas
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Buscar:", searchQuery);
    setSearchQuery('');
    setSearchVisible(false);
  }

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container">
        {/* Nombre de la marca */}
        <a className="navbar-brand" href="/">
          <div className="brand-container">
            <h1 className="brand-title">CODIGO NEGRO</h1>
            <div className="brand-subtitle">Coleccion V26</div>
          </div>
        </a>

        {/* Botón hamburguesa para celulares */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
<<<<<<< HEAD
              <Link className="nav-link" to="/">Productos</Link>
=======
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/catalogue">Catálogo</Link>
>>>>>>> yoquienmas
            </li>

               {/* Registro y LogIn */}
            <li className="nav-item">
              <Link className="nav-link" to="/Register">Registrarse</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Login">Login</Link>
            </li>
            
            {/* Barra de búsqueda*/}
            <li className="nav-item search-container">
              {searchVisible ? (
                <form className="search-form" onSubmit={handleSearchSubmit}>
                  <div className="input-group">
                    <input 
                      type="text" 
                      className="form-control search-input" 
                      placeholder="Buscar productos..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button 
                      className="btn search-close" 
                      type="button"
                      onClick={() => setSearchVisible(false)}
                    >
                      ×
                    </button>
                  </div>
                </form>
              ) : (
                <button 
                  className="nav-link search-toggle"
                  onClick={() => setSearchVisible(true)}
                >
                  <img 
                    src="/images/search_icon.png" 
                    alt="Buscar"
                    className="search-icon"
                  />
                </button>
              )}
            </li>

            {/* Carrito de compras */}
            <li className="nav-item">
<<<<<<< HEAD
              <a className="nav-link shopping-bag" href="/carrito">
=======
              <a className="nav-link shopping-bag" href="/cart">
>>>>>>> yoquienmas
                <img 
                  src="/images/shopping_bag.png"
                  alt="Carrito de compras"
                  className="shopping-bag-image"
                />
                <span className="shopping-bag-count">0</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
} 
<<<<<<< HEAD
=======
=======
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
>>>>>>> d072c96e9424f77456a7fad24c55a8f7dd9ff67b
>>>>>>> yoquienmas

export default Navbar;