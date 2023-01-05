const BASE_URL = "https://notes-api.dicoding.dev/v1";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const putAccessToken = (accessToken) => {
  return localStorage.setItem("accessToken", accessToken);
};

const fetchWithToken = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};

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

export const getUserLogged = async () => {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }
  return { error: false, data: responseJson.data };
};

export const getNotes = async () => {
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return {
      error: true,
      data: [],
      message: responseJson.message,
    };
  }
  return {
    error: false,
    data: responseJson.data,
    message: responseJson.message,
  };
};

export const archiveNote = async (id) =>{
  const response = await fetchWithToken(`${BASE_URL}/${id}/archive`);
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
}