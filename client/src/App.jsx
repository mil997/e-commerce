import { BrowserRouter, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import HomePage from './pages/HomePage'; 
import Navbar from './components/Navbar'; // <-- IMPORTADO
import RegisterPage from './pages/RegisterPage'; 
import LoginPage from './pages/LoginPage';

function App() {
  return (
    // <BrowserRouter> es el router principal que envuelve todo.
    <BrowserRouter> 
      {/* EL NAVBAR ES VISIBLE EN TODAS LAS PÁGINAS */}
      <Navbar /> 

>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} /> 
<<<<<<< HEAD
        
        {/* RUTA DEL CATÁLOGO COMPLETO */}
        <Route path="/catalogue" element={<CataloguePage />} /> {/* <-- NUEVA RUTA */}

        <Route path="/products/:id" element={<ProductDetailPage />} /> 
        <Route path="/cart" element={<CartPage />} />
=======
        <Route path="/cart" element={<h1>Carrito de Compras</h1>} /> {/* O CartPage */}
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
      </Routes>
    </BrowserRouter>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
