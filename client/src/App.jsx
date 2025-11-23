import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx'; 
import Navbar from './components/Navbar.jsx'; 
import RegisterPage from './pages/RegisterPage.jsx'; 
import LoginPage from './pages/LoginPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx'; 
import CataloguePage from './pages/CataloguePage.jsx'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> 
        
        {/* RUTA DEL CATÁLOGO COMPLETO */}
        <Route path="/catalogue" element={<CataloguePage />} />

        <Route path="/products/:id" element={<ProductDetailPage />} /> 
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;