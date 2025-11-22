import { useContext } from 'react';
import { AuthContext } from './AuthProvider'; // Asegúrate de que el nombre coincida

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};