import { Message } from "../types/Chat";

export async function fetchSocialMaviAiResponse(messages: Message[]): Promise<string> {
  // Chamada simulada para o seu back-end ou endpoint seguro
  const response = await fetch("/api/social-ia", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("Erro na requisição com a IA");
  }

  const data = await response.json();
  return data.text || "Erro ao gerar resposta.";
}