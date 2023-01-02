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
