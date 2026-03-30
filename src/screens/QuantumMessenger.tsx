import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

export default function QuantumMessenger() {
  const { goBack, contacts } = useOSStore();

  const statusColor: Record<string, string> = {
    'online': 'var(--color-success)',
    'neural-linked': 'var(--color-primary)',
    'dreaming': 'var(--color-secondary)',
    'offline': 'var(--text-tertiary)',
  };

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      <div className="screen__header" style={{ padding: 'var(--space-sm) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '18px', cursor: 'pointer' }}>‹</button>
          <h1 className="screen__title gradient-text">Quantum Msg</h1>
        </div>
        <p className="screen__subtitle" style={{ marginLeft: '26px' }}>Encrypted Communications</p>
      </div>

      {/* Encryption status */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-sm)',
          padding: '8px',
          marginBottom: 'var(--space-md)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-success)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: 'var(--color-success)',
          boxShadow: '0 0 8px var(--color-success)',
        }} />
        QUANTUM ENCRYPTION ACTIVE — 4096 QUBITS
      </motion.div>

      {/* Online avatars strip */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-md)',
        overflowX: 'auto',
        paddingBottom: 'var(--space-md)',
        marginBottom: 'var(--space-sm)',
        scrollbarWidth: 'none',
      }}>
        {contacts.filter(c => c.status !== 'offline').map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.08, type: 'spring' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'var(--bg-glass)',
              border: `2px solid ${statusColor[c.status]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: `0 0 12px ${statusColor[c.status]}40`,
            }}>
              {c.avatar}
            </div>
            <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', maxWidth: '50px', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {c.name.split(' ')[0]}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Chat list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {contacts.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            className="glass-card"
            style={{
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              cursor: 'pointer',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--bg-tertiary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
              }}>
                {c.avatar}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: statusColor[c.status],
                border: '2px solid var(--bg-primary)',
                boxShadow: `0 0 6px ${statusColor[c.status]}`,
              }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{c.name}</span>
                <span style={{ fontSize: '0.55rem', color: 'var(--text-tertiary)' }}>{c.time}</span>
              </div>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginTop: '2px',
              }}>
                {c.lastMessage}
              </div>
            </div>
            {c.unread > 0 && (
              <div style={{
                minWidth: '20px',
                height: '20px',
                borderRadius: '10px',
                background: 'var(--color-primary)',
                color: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem',
                fontWeight: 700,
                boxShadow: '0 0 10px var(--color-primary-glow)',
                padding: '0 6px',
              }}>
                {c.unread}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Hive Mind Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="glass-card gradient-border"
        style={{
          marginTop: 'var(--space-md)',
          padding: 'var(--space-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, hsl(270, 80%, 30%), hsl(330, 80%, 40%))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
        }}>
          🌐
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Hive-Mind Group</div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            3 members connected • Shared consciousness active
          </div>
        </div>
      </motion.div>
    </div>
  );
}
