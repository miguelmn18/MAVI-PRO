import React, { useState, useRef, useEffect } from "react";
import { Message } from "../../types/Chat";
import { fetchSocialMaviAiResponse } from "../../services/aiService";

// DICA: Importe os componentes de cabeçalho e constantes de tema
// import { SHead } from "../SHead";
// import { BK3, BD, Y, YD, BK, WT, HF, BF } from "../../styles/theme";

export function SocialMaviIA() {
  const [msgs, setMsgs] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Oi! Sou a Social Mavi IA 💈\n\nMe conta seu estilo e o que quer postar. Vou sugerir conteúdos virais pra sua empresa crescer nas redes.",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");

    const updatedMessages: Message[] = [
      ...msgs,
      { role: "user", content: userText },
    ];

    setMsgs(updatedMessages);
    setLoading(true);

    try {
      const responseText = await fetchSocialMaviAiResponse(updatedMessages);
      setMsgs([
        ...updatedMessages,
        { role: "assistant", content: responseText },
      ]);
    } catch (error) {
      setMsgs([
        ...updatedMessages,
        {
          role: "assistant",
          content: "Erro de conexão. Tente novamente.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      {/* Exemplo de uso do componente SHead */}
      {/* <SHead title="SOCIAL" accent="MAVI IA" sub="Especialista em conteúdo · Plano Diamante"/> */}

      <div className="chat-messages-box">
        {msgs.map((m, index) => (
          <div
            key={index}
            className={`chat-message-wrapper ${m.role === "user" ? "user-msg" : "assistant-msg"}`}
          >
            {m.role === "assistant" && <div className="chat-avatar">M</div>}
            <div className="chat-bubble">{m.content}</div>
          </div>
        ))}

        {loading && (
          <div className="chat-loading-wrapper">
            <div className="chat-avatar">M</div>
            <div className="chat-loading-dots">
              <div className="dot" />
              <div className="dot" />
              <div className="dot" />
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="chat-input-wrapper">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Me conta seu estilo..."
          className="chat-input"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="chat-send-button"
        >
          {loading ? "..." : "ENVIAR"}
        </button>
      </div>
    </div>
  );
}