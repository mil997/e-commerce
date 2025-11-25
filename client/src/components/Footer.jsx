import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        

        <div className="footer-main">
          <div className="row">


            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="footer-title">Métodos de pago</h5>
              <div className="payment-methods">
                <img src="/images/visa.png" alt="Visa" className="payment-icon" />
                <img src="/images/paypal.png" alt="PayPal" className="payment-icon" />
                <img src="/images/mastercard.png" alt="Mastercard" className="payment-icon" />
                <img src="/images/mercadopago-icon.png" alt="Mercado Pago" className="payment-icon" />
                <img src="/images/naranja-icon.jpg" alt="Tarjeta Naranja" className="payment-icon" />
              </div>
            </div>

 
            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="footer-title">Métodos de envío</h5>
              <div className="shipping-methods">
                <img src="/images/oca-icon.png" alt="OCA" className="shipping-icon" />
                <img src="/images/correoargentino-icon.png" alt="Correo Argentino" className="shipping-icon" />
                <img src="/images/andreani-icon.jpg" alt="Andreani" className="shipping-icon" />
              </div>
            </div>


            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="footer-title">Gift Cards</h5>
              <ul className="footer-list">
                <li>Comprar Gift Cards</li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="footer-title">Prometemos</h5>
              <ul className="footer-list">
                <li>Devoluciones gratuitas en las primeras 24hs</li>
                <li>Política de 3 días de espera para devolución</li>
                <li>Opciones de pago flexibles</li>
                <li>Envíos a todo el país</li>
              </ul>

              {/* Redes Sociales */}
              <h5 className="footer-title mt-4">Síguenos</h5>
              <div className="social-media">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="/images/instagram.jpg" alt="Instagram" className="social-icon" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="/images/facebook.png" alt="Facebook" className="social-icon" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <img src="/images/tiktok.png" alt="TikTok" className="social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="footer-divider" />

        {/* Sección inferior del footer */}
              <p className="company-info">
                © 2025 - TD S.A.. Todos los derechos reservados.<br />
                Calle 1234, Corrientes, Pcia de Corrientes.<br />
                <span className="ecommerce-by">E-COMMERCE by Grupo3</span>
              </p>
        </div>
    </footer>
  );
}

export default Footer;