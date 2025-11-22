import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< HEAD
import { useAuth } from '../context/useAuth.jsx'; 
// Importaciones de Bootstrap
import { Container, Card, Form, Button, Alert } from 'react-bootstrap'; 

function LoginPage() {
// llamo al hook personalizado para poder acceder a la funcion login
    const { login } = useAuth();
=======
import { useAuth } from '../context/useAuth'; // Importa el hook personalizado

function LoginPage() {
    // llamo al hook personalizado para poder acceder a la funcion login
    const { login } = useAuth(); 
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
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

<<<<<<< HEAD
   return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '25rem' }} className="shadow-lg p-3">
                <Card.Body>
                    <Card.Title className="text-center mb-4"><h2>Iniciar Sesión</h2></Card.Title>
                    
                    <Form onSubmit={handleSubmit}>
                        {/* Muestra errores con el componente Alert de Bootstrap */}
                        {error && <Alert variant="danger">{error}</Alert>}
                        
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        
                        <div className="d-grid gap-2 mt-4">
                            <Button 
                                variant="primary" 
                                type="submit" 
                                disabled={loading}
                            >
                                {loading ? 'Iniciando sesión...' : 'Ingresar'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-center">
                    ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                </Card.Footer>
            </Card>
        </Container>
=======
    return (
        <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                {/* Muestra errores si existen */}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button type="submit" disabled={loading}>
                    {loading ? 'Iniciando sesión...' : 'Ingresar'}
                </button>
            </form>

            <p className="link-text">
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
            </p>
        </div>
>>>>>>> 65c0989fbe76a5a33a0a13bc71bf706dcb128665
    );
}

export default LoginPage;