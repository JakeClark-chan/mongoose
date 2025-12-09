import axios from "axios";

export const assetsAPI = axios.create({
  baseURL: "https://assets.wallet.maistodos.com.br",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});