const BASE_URL = "https://notes-api.dicoding.dev/v1";

export const register = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return {
        error: true,
        message: responseJson.message,
      };
    }
    return {
      error: false,
      message: responseJson.message,
    };
  } catch (e) {
    return {
      error: true,
      message: "There is a problem with the connection!",
    };
  }
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null, message: responseJson.message };
  }
  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  };
};
