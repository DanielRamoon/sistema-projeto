import axios from "axios";

const API_URL = "http://localhost:3000";
async function handleRequest(url, method, data) {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });

    const result = response.data;

    if (response.status >= 200 && response.status < 300) {
      return result;
    } else {
      throw new Error(result.error || "Erro na solicitação");
    }
  } catch (error) {
    console.error(`Erro durante o login: ${error.message}`);
    throw new Error(`Erro na solicitação: ${error.message}`);
  }
}

export async function registerUser(username, password) {
  try {
    const data = await handleRequest("/auth/register", "POST", {
      username,
      password,
    });
    console.log("Usuário registrado com sucesso:", data.message);
  } catch (error) {
    console.error("Erro durante o registro:", error.message);
  }
}

export async function loginUser(username, password) {
  try {
    console.log("Dados enviados para loginUser:", { username, password });
    const data = await handleRequest("/auth/login", "POST", {
      username,
      password,
    });
    console.log("Login bem-sucedido. Token:", data.token);
  } catch (error) {
    console.error("Erro durante o login:", error.message);
  }
}
