const AUTH_API_URL = import.meta.env.VITE_API_AUTH_URL;

export const loginUser = async (username: string, password: string) => {
  const response = await fetch(`${AUTH_API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();

    let formattedErrors = "";
    if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      formattedErrors = errorData.errors
        .map(
          (err: { field: string; defaultMessage: string }) =>
            `${err.field}: ${err.defaultMessage}`
        )
        .join("\n");
    }

    throw new Error(
      formattedErrors ||
        "Nombre de usuario o contraseña incorrectos" ||
        `Response not successful: Received status code ${response.status}`
    );
  }

  const data = await response.json();
  return data;
};

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${AUTH_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    let formattedErrors = "";
    if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
      formattedErrors = errorData.errors
        .map(
          (err: { field: string; defaultMessage: string }) =>
            `${err.field}: ${err.defaultMessage}`
        )
        .join("\n");
    }

    throw new Error(
      formattedErrors ||
        "Nombre de usuario o contraseña incorrectos" ||
        `Response not successful: Received status code ${response.status}`
    );
  }

  const data = await response.json();
  return data;
};
