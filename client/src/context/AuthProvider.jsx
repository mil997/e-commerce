import React, {useState } from 'react';
import axios from 'axios';

import { AuthContext } from './AuthContext';

const API_URL = 'http://localhost:3000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return { token: token, username: 'UsuarioTemporal' };
        }
        return null;
    });

    const [loading] = useState(false);

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            setUser(user);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return user;

        } catch (error) {
            console.error('Login fallido:', error.response?.data?.message || error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isLoggedIn: !!user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};