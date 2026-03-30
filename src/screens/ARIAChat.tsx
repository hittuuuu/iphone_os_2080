import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

export default function ARIAChat() {
  const { ariaMessages, addARIAMessage, goBack } = useOSStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ariaMessages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: `u${Date.now()}`,
      sender: 'user' as const,
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text' as const,
    };
    addARIAMessage(userMsg);
    setInput('');
    setIsTyping(true);

    // Simulate ARIA response
    setTimeout(() => {
      const responses = [
        'I\'ve analyzed your neural patterns and detected elevated curiosity. This is a positive cognitive state. Shall I unlock deeper knowledge protocols?',
        'Interesting question. My quantum processors have computed 2.7 million possible responses. The most relevant: Your consciousness is operating at 97.3% coherence today.',
        'I\'ve cross-referenced your query across 11 dimensional databases. The answer exists in a quantum superposition — it\'s simultaneously yes and no until you observe it.',
        'Your emotional wavelength suggests you\'re feeling creative. I\'ve pre-loaded the Holo Studio with templates matching your current neural aesthetic preferences.',
        'Processing through quantum entanglement channels... Done. I\'ve updated your cognitive pathways with the relevant information. You should feel it settling in your prefrontal cortex now.',
      ];

      const ariaMsg = {
        id: `a${Date.now()}`,
        sender: 'aria' as const,
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text' as const,
      };
      addARIAMessage(ariaMsg);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div
      className="screen"
      style={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '90px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: 'var(--space-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
          borderBottom: '1px solid hsla(185, 100%, 55%, 0.08)',
        }}
      >
        <button
          onClick={goBack}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--color-primary)',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          ‹
        </button>
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, hsl(185, 80%, 30%), hsl(270, 80%, 40%))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            boxShadow: '0 0 15px hsla(185, 100%, 55%, 0.3)',
            animation: 'glowBreathe 3s infinite',
          }}
        >
          ✦
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              letterSpacing: '2px',
            }}
          >
            A.R.I.A.
          </div>
          <div style={{ fontSize: '0.6rem', color: 'var(--color-success)' }}>
            ● Quantum-linked • Mood: Helpful
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--space-md)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-sm)',
        }}
      >
        {ariaMessages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`chat-bubble chat-bubble--${msg.sender === 'user' ? 'sent' : 'received'}`}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
            <div className="chat-bubble__time">{msg.time}</div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="chat-bubble chat-bubble--received"
            style={{ alignSelf: 'flex-start', padding: '12px 18px' }}
          >
            <div style={{ display: 'flex', gap: '4px' }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    animation: `typingDots 1.4s infinite ${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: 'var(--space-sm) var(--space-md)',
          borderTop: '1px solid hsla(185, 100%, 55%, 0.08)',
          display: 'flex',
          gap: 'var(--space-sm)',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '8px var(--space-md)',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-glass)',
            border: 'var(--glass-border)',
          }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type or think..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              width: '100%',
            }}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: input.trim()
              ? 'linear-gradient(135deg, var(--color-primary-dim), var(--color-primary))'
              : 'var(--bg-tertiary)',
            border: 'none',
            color: input.trim() ? 'var(--bg-primary)' : 'var(--text-tertiary)',
            cursor: input.trim() ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            transition: 'all 0.2s',
            boxShadow: input.trim() ? '0 0 15px var(--color-primary-glow)' : 'none',
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
