import { refreshToken, validateToken } from '../services/auth';

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const TOKEN_EXPIRY = parseInt(import.meta.env.VITE_TOKEN_EXPIRY || '86400000');

export const authInterceptor = async (request: Request): Promise<Request> => {
  const token = localStorage.getItem(TOKEN_KEY);
  
  if (!token) {
    return request;
  }

  // Verificar si el token está por expirar
  const tokenData = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = tokenData.exp * 1000; // Convertir a milisegundos
  const currentTime = Date.now();
  const timeUntilExpiry = expirationTime - currentTime;

  // Si el token está por expirar en menos de 5 minutos, renovarlo
  if (timeUntilExpiry < 300000) {
    try {
      const newToken = await refreshToken();
      localStorage.setItem(TOKEN_KEY, newToken.accessToken);
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Si falla la renovación, verificar si el token actual es válido
      const isValid = await validateToken(token);
      if (!isValid) {
        // Si el token no es válido, redirigir al login
        window.location.href = '/login';
        return request;
      }
    }
  }

  // Agregar el token a la petición
  request.headers.set('Authorization', `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
  return request;
}; 