import React from 'react';
import useAuth from '../context/useAuth';  // ← SIN llaves
import { Link } from 'react-router-dom';
import '../styles/ProfilePage.css';

function ProfilePage() {
    const { user, isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        return (
            <div className="profile-page">
                <div className="container mt-5">
                    <div className="text-center">
                        <h2>Acceso Denegado</h2>
                        <p>Debes iniciar sesión para ver tu perfil.</p>
                        <Link to="/login" className="btn btn-primary">
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="profile-card shadow-sm">
                            <div className="profile-header text-center">
                                <div className="profile-avatar">
                                    {user?.username?.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="profile-name">{user?.username}</h2>
                                <p className="profile-email text-muted">{user?.email}</p>
                            </div>

                            <div className="profile-info">
                                <h4 className="section-title">Información del Perfil</h4>
                                
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="info-label">Nombre de Usuario:</span>
                                        <span className="info-value">{user?.username}</span>
                                    </div>
                                    
                                    <div className="info-item">
                                        <span className="info-label">Email:</span>
                                        <span className="info-value">{user?.email}</span>
                                    </div>
                                    
                                    <div className="info-item">
                                        <span className="info-label">ID de Usuario:</span>
                                        <span className="info-value">{user?._id}</span>
                                    </div>
                                    
                                    <div className="info-item">
                                        <span className="info-label">Miembro desde:</span>
                                        <span className="info-value">
                                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Fecha no disponible'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-actions">
                                <h4 className="section-title">Acciones</h4>
                                
                                <div className="actions-grid">
                                    <Link to="/" className="action-btn btn btn-outline-primary">
                                        🏠 Continuar Comprando
                                    </Link>
                                    
                                    <Link to="/catalogue" className="action-btn btn btn-outline-secondary">
                                        📦 Ver Catálogo
                                    </Link>
                                    
                                    <Link to="/cart" className="action-btn btn btn-outline-info">
                                        🛒 Ver Carrito
                                    </Link>
                                    
                                    <button 
                                        onClick={logout}
                                        className="action-btn btn btn-outline-danger"
                                    >
                                        🚪 Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;