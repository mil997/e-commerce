import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ 
      backgroundColor: 'transparent !important',
      padding: '20px 0'
    }}>
      <div className="container">
        <h1 className="navbar-brand mb-0" style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
          color: 'black',
          margin: '0 auto'
        }}>
          CODIGO NEGRO
        </h1>
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '-10px',
          color: 'black',
          fontSize: '1rem',
          fontWeight: '300',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 1)'
        }}>
          COLECCION PRIMAVERA-VERANO 2025
        </div>
      </div>
    </nav>
  );
} 

export default Navbar;