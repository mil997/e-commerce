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
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/catalogue">Catálogo</Link>
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
              <a className="nav-link shopping-bag" href="/cart">
                <img 
                  src="/images/shopping_bag.png"
                  alt="Carrito de compras"
                  className="shopping-bag-image"
                />
                <span className="shopping-bag-count">0</span>
              </a>
            </li>
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