import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

export default function NotificationCenter() {
  const { goBack, notifications, dismissNotification } = useOSStore();

  const QUICK_TOGGLES = [
    { icon: '🧠', label: 'Neural Link', active: true },
    { icon: '📡', label: 'DimNet', active: true },
    { icon: '🛡️', label: 'Q-Shield', active: true },
    { icon: '🌙', label: 'Dream Mode', active: false },
    { icon: '👁️', label: 'HUD', active: true },
    { icon: '✈️', label: 'Void Mode', active: false },
  ];

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      <div className="screen__header" style={{ padding: 'var(--space-sm) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '18px', cursor: 'pointer' }}>‹</button>
          <h1 className="screen__title gradient-text">Notifications</h1>
        </div>
      </div>

      {/* Quick Toggles */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card"
        style={{ marginBottom: 'var(--space-md)', padding: 'var(--space-md)' }}
      >
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-sm)',
        }}>
          {QUICK_TOGGLES.map((t) => (
            <div
              key={t.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                padding: 'var(--space-sm)',
                borderRadius: 'var(--radius-md)',
                background: t.active ? 'hsla(185, 100%, 55%, 0.1)' : 'transparent',
                border: t.active ? '1px solid hsla(185, 100%, 55%, 0.2)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '20px' }}>{t.icon}</span>
              <span style={{
                fontSize: '0.5rem',
                color: t.active ? 'var(--color-primary)' : 'var(--text-tertiary)',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.5px',
              }}>
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Notifications */}
      <div className="widget__title" style={{ marginBottom: 'var(--space-sm)' }}>RECENT</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {notifications.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-2xl)',
            color: 'var(--text-tertiary)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: 'var(--space-sm)' }}>✨</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', letterSpacing: '2px' }}>ALL CLEAR</div>
            <div style={{ fontSize: 'var(--text-xs)', marginTop: '4px' }}>No pending notifications</div>
          </div>
        ) : (
          notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ delay: i * 0.06 }}
              className="notif-item"
            >
              <div
                className="notif-item__icon"
                style={{ background: `${n.color}20`, border: `1px solid ${n.color}30` }}
              >
                {n.icon}
              </div>
              <div className="notif-item__content">
                <div className="notif-item__title">{n.title}</div>
                <div className="notif-item__text">{n.text}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <span className="notif-item__time">{n.time}</span>
                <button
                  onClick={() => dismissNotification(n.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-tertiary)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    padding: '2px',
                  }}
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
