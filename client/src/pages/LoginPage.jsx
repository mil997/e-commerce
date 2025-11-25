import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth'; // Importa el hook personalizado
import '../styles/Auth.css';

function LoginPage() {
    // llamo al hook personalizado para poder acceder a la funcion login
    const { login } = useAuth(); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            //Llama a la funcion login del AuthContext
            await login(formData); 
            // Si se inicia sesión correctamente, se redirige a la página principal
            navigate('/'); 

        } catch (err) {
            // El error es manejado por el login en AuthContext
            const errorMessage = err.response?.data?.message || 'Error de red.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">                
                <form onSubmit={handleSubmit}>
                    {/* Mensaje de error */}
                    {error && <div className="auth-error">{error}</div>}
                    
                    {/* Campo de email */}
                    <div className="form-group">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="tu@email.com"
                        />
                    </div>
                    
                    {/* Campo de contraseña */}
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    
                    {/* Botón de inicio de sesión */}
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'INICIANDO SESIÓN...' : 'INGRESAR'}
                    </button>
                </form>
                {/* Link para olvide mi contraseña */}
                <div className='auth-links'>
                    <a href="/forgot-password" className="auth-link-main">
                        OLVIDE MI CONTRASEÑA
                    </a>
                </div>
                {/* Link para ir a registro */}
                <div className="auth-links">
                    <div className="auth-divider">
                    <span>o bien</span>
                </div>
                    <Link to="/register" className="auth-link-main">
                        ¿No tienes cuenta? REGÍSTRATE AQUÍ
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;