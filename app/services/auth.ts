interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
  username: string;
  email: string;
  roles: string[];
}

interface ErrorResponse {
  errors?: Array<{ field: string; defaultMessage: string }>;
  message?: string;
}

const handleError = async (response: Response): Promise<never> => {
  const errorData: ErrorResponse = await response.json();
  let errorMessage = 'Error en la autenticación';

  if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
    errorMessage = errorData.errors
      .map(err => `${err.field}: ${err.defaultMessage}`)
      .join('\n');
  } else if (errorData.message) {
    errorMessage = errorData.message;
  }

  throw new Error(errorMessage);
};

export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(`/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    return handleError(response);
  }

  const data = await response.json();
  // Guardar tokens
  localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, data.accessToken);
  localStorage.setItem(import.meta.env.VITE_REFRESH_TOKEN_KEY, data.refreshToken);
  return data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ message: string }> => {
  // Validaciones frontend
  if (!username || username.length < 3) {
    throw new Error('El nombre de usuario debe tener al menos 3 caracteres.');
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error('Debes ingresar un correo electrónico válido.');
  }
  if (!password || password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    return handleError(response);
  }

  return response.json();
};

export const refreshToken = async (): Promise<AuthResponse> => {
  const refreshToken = localStorage.getItem(import.meta.env.VITE_REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`/api/auth/refreshToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
    credentials: 'include',
  });

  if (!response.ok) {
    return handleError(response);
  }

  const data = await response.json();
  localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, data.accessToken);
  return data;
};

export const validateToken = async (token: string): Promise<boolean> => {
  const response = await fetch(`/api/auth/validateToken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
    credentials: 'include',
  });

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const logoutUser = async (): Promise<void> => {
    const response = await fetch(`/api/auth/signout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    return handleError(response);
  }

  // Limpiar tokens
  localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
  localStorage.removeItem(import.meta.env.VITE_REFRESH_TOKEN_KEY);
};
