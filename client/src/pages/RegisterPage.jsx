import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const API_URL = 'http://localhost:3000/api';

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);

        try {
            await axios.post(`${API_URL}/auth/register`, {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            
            alert('¡Registro exitoso! Por favor, inicia sesión.');
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error desconocido al registrar.';
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
                    
                    {/* Campo de nombre de usuario */}
                    <div className="form-group">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Nombre de usuario"
                        />
                    </div>
                    
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
                    
                    {/* Campo de confirmar contraseña */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    
                    {/* Botón de registro */}
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'REGISTRANDO...' : 'CREAR CUENTA'}
                    </button>
                </form>

                {/* Link para volver al login */}
                <div className="auth-links">
                    <div className="auth-divider"></div>
                    <Link to="/login" className="auth-link-main">
                        ¿Ya tienes cuenta? INICIAR SESIÓN
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;