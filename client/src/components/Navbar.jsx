import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/useAuth';
import { useCart } from '../context/useCart';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Buscar:", searchQuery);
    if (searchQuery.trim()) {
    navigate(`/catalogue?search=${encodeURIComponent(searchQuery)}`);
  } else {
    navigate('/catalogue');
  }
    setSearchQuery('');
    setSearchVisible(false);
  }
    const handleLogout = () => {
    logout();
    navigate('/');
  }
  //calcula el total de items del carrito
  const totalItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${scrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
      <div className="container">
        {/* Nombre de la marca */}
        <Link className="navbar-brand" to="/">
          <div className="brand-container">
            <h1 className="brand-title">CODIGO NEGRO</h1>
            <div className="brand-subtitle">Coleccion V26</div>
          </div>
        </Link>

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
              <Link className="nav-link" to="/catalogue">Catálogo</Link>
            </li>
            {/* Usuario NO autenticado */}
            {!isAuthenticated ? (
            <>
            {/* Registro y LogIn */}
            <li className="nav-item">
              <Link className="nav-link" to="/register">Registrarse</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            </>
            ) : (
            /* Usuario autenticado */
         <li className='nav-item'>
              <button
                className="nav-link btn-logout"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
         </li>
            )}
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
              <Link className="nav-link shopping-bag" to="/cart">
                <img 
                  src="/images/shopping_bag.png"
                  alt="Carrito de compras"
                  className="shopping-bag-image"
                />
                <span className="shopping-bag-count">{totalItemCount}</span>
              </Link>
            </li>
            {/* Contacto */}
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contacto</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
} 

export default Navbar;