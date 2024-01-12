import axios from "axios";

const API_URL = "http://localhost:3000";

async function handleRequest(url, method, data, token) {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${url}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
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
    console.error(`Erro durante a solicitação: ${error.message}`);
    throw new Error(`Erro na solicitação: ${error.message}`);
  }
}

export async function createPayment(user, amount, description, token) {
  try {
    const data = await handleRequest(
      "/payments",
      "POST",
      {
        user,
        amount,
        description,
      },
      token
    );
    console.log("Pagamento criado com sucesso:", data.message);
  } catch (error) {
    console.error("Erro durante a criação do pagamento:", error.message);
  }
}

export async function getPayments(token) {
  try {
    const data = await handleRequest("/payments", "GET", null, token);
    console.log("Pagamentos obtidos com sucesso:", data.payments);
    return data.payments;
  } catch (error) {
    console.error("Erro ao obter pagamentos:", error.message);
  }
}
