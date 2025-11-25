import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'; 
import Navbar from './components/Navbar.jsx'; 
import Footer from './components/Footer.jsx';
import RegisterPage from './pages/RegisterPage.jsx'; 
import LoginPage from './pages/LoginPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx'; 
import CataloguePage from './pages/CataloguePage.jsx'; 
import ContactPage from './pages/ContactPage.jsx'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <main className="main-content">
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} /> 
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Si necesitas una página de contacto, añádela: */}
        {/* <Route path="/contact" element={<ContactPage />} /> */}
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
// Componente simple para páginas no encontradas
function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>404 - Página No Encontrada</h1>
      <p>La página que buscas no existe.</p>
    </div>
  );
}

export default App;
