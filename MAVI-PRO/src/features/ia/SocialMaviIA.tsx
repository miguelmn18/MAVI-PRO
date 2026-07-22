import React, { useState, useRef, useEffect, FC, ChangeEvent, KeyboardEvent, FocusEvent } from 'react';
import { ChatMessage } from '../../types/Chat';
import { sendChatMessage } from '../../services/aiService';
import { COLORS, FONTS } from '../../constants/theme';
import { SHead } from '../../components/ui/Atoms';

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    'Oi! Sou a Social Mavi IA 💈\n\nMe conta seu estilo e o que quer postar. Vou sugerir conteúdos virais pra sua empresa crescer nas redes.',
};

export const SocialMaviIA: FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (): Promise<void> => {
    const trimmedInput = input.trim();
    if (!trimmedInput || loading) return;

    setInput('');
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmedInput },
    ];

    setMessages(newMessages);
    setLoading(true);

    try {
      const assistantReply = await sendChatMessage(newMessages);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: assistantReply },
      ]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Erro de conexão. Tente novamente.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>): void => {
    e.target.style.borderColor = COLORS.primary;
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    e.target.style.borderColor = COLORS.border;
  };

  return (
    <div style={{ animation: 'fadeUp .3s ease', display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
      <SHead
        title="SOCIAL"
        accent="MAVI IA"
        sub="Especialista em conteúdo · Plano Diamante"
      />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: COLORS.bgElevated,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 12,
          padding: 12,
          overflowY: 'auto',
          minHeight: 260,
          maxHeight: 370,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              animation: 'fadeUp .2s ease',
            }}
          >
            {m.role === 'assistant' && (
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: FONTS.heading,
                  fontSize: 11,
                  color: COLORS.bg,
                  marginRight: 6,
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                M
              </div>
            )}
            <div
              style={{
                maxWidth: '78%',
                padding: '9px 12px',
                borderRadius: 11,
                background: m.role === 'user' ? COLORS.primary : COLORS.bgSurface,
                color: m.role === 'user' ? COLORS.bg : COLORS.text,
                fontSize: 13,
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
                borderBottomRightRadius: m.role === 'user' ? 2 : 11,
                borderBottomLeftRadius: m.role === 'assistant' ? 2 : 11,
              }}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: FONTS.heading,
                fontSize: 11,
                color: COLORS.bg,
              }}
            >
              M
            </div>
            <div
              style={{
                display: 'flex',
                gap: 4,
                padding: '8px 12px',
                background: COLORS.bgSurface,
                borderRadius: 11,
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: COLORS.primary,
                    animation: 'blink 1.2s ease infinite',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Me conta seu estilo..."
          style={{
            flex: 1,
            padding: '11px 13px',
            background: COLORS.bgElevated,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            color: COLORS.text,
            fontFamily: FONTS.body,
            fontSize: 13,
            outline: 'none',
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: '11px 16px',
            borderRadius: 10,
            border: 'none',
            background: loading ? COLORS.border : COLORS.primary,
            color: COLORS.bg,
            fontFamily: FONTS.heading,
            fontSize: 14,
            letterSpacing: 1,
            cursor: loading ? 'not-allowed' : 'pointer',
            flexShrink: 0,
          }}
        >
          {loading ? '...' : 'ENVIAR'}
        </button>
      </div>
    </div>
  );
};