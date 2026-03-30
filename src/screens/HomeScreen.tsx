import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';
import { APPS } from '../utils/constants';

const WIDGETS = [
  {
    id: 'neural',
    title: 'NEURAL LINK',
    value: '97.3%',
    subtitle: 'Coherence',
    gradient: 'linear-gradient(135deg, hsla(270, 80%, 30%, 0.4), hsla(270, 60%, 20%, 0.3))',
    color: 'hsl(270, 100%, 65%)',
  },
  {
    id: 'emotion',
    title: 'EMOTION',
    value: '😌',
    subtitle: 'Focused',
    gradient: 'linear-gradient(135deg, hsla(185, 80%, 25%, 0.4), hsla(185, 60%, 15%, 0.3))',
    color: 'hsl(185, 100%, 55%)',
  },
  {
    id: 'quantum',
    title: 'Q-WEATHER',
    value: '∿ 42°',
    subtitle: 'Stable',
    gradient: 'linear-gradient(135deg, hsla(330, 80%, 30%, 0.4), hsla(330, 60%, 20%, 0.3))',
    color: 'hsl(330, 100%, 65%)',
  },
];

// Show first 8 apps on home screen
const homeApps = APPS.slice(0, 8);
const secondRow = APPS.slice(8, 16);

export default function HomeScreen() {
  const { navigateTo, notifications } = useOSStore();

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      {/* Search Bar */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          margin: 'var(--space-sm) 0',
          padding: '10px var(--space-md)',
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(20px)',
          border: 'var(--glass-border)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          cursor: 'pointer',
        }}
        onClick={() => {}}
      >
        <span style={{ fontSize: '14px', opacity: 0.5 }}>✦</span>
        <span
          style={{
            color: 'var(--text-tertiary)',
            fontSize: 'var(--text-sm)',
            fontFamily: 'var(--font-body)',
            letterSpacing: '1px',
          }}
        >
          Think to search...
        </span>
      </motion.div>

      {/* Widgets */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-sm)',
          marginBottom: 'var(--space-lg)',
        }}
      >
        {WIDGETS.map((w, i) => (
          <motion.div
            key={w.id}
            className="widget glass"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.08 }}
            style={{ background: w.gradient, textAlign: 'center' }}
          >
            <div className="widget__title" style={{ fontSize: '0.5rem' }}>
              {w.title}
            </div>
            <div
              className="widget__value"
              style={{
                color: w.color,
                fontSize: 'var(--text-md)',
                textShadow: `0 0 15px ${w.color}40`,
              }}
            >
              {w.value}
            </div>
            <div
              style={{
                fontSize: '0.5rem',
                color: 'var(--text-secondary)',
                marginTop: '2px',
              }}
            >
              {w.subtitle}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notification banner */}
      {notifications.length > 0 && (
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card"
          style={{
            padding: '10px 14px',
            marginBottom: 'var(--space-md)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-sm)',
            cursor: 'pointer',
            borderColor: 'hsla(185, 100%, 55%, 0.2)',
          }}
          onClick={() => navigateTo('notifications')}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--color-primary)',
              boxShadow: '0 0 10px var(--color-primary-glow)',
              animation: 'holoPulse 2s infinite',
            }}
          />
          <span style={{ fontSize: 'var(--text-xs)', flex: 1 }}>
            {notifications.length} quantum notifications
          </span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            View ›
          </span>
        </motion.div>
      )}

      {/* App Grid - Row 1 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-md) var(--space-sm)',
          marginBottom: 'var(--space-md)',
        }}
      >
        {homeApps.map((app, i) => (
          <motion.div
            key={app.id}
            className="app-icon"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.3 + i * 0.06,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            onClick={() => navigateTo(app.screen)}
          >
            <div
              className="app-icon__glyph"
              style={{ background: app.gradient }}
            >
              {app.icon}
            </div>
            <span className="app-icon__name">{app.name}</span>
          </motion.div>
        ))}
      </div>

      {/* App Grid - Row 2 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-md) var(--space-sm)',
          marginBottom: 'var(--space-md)',
        }}
      >
        {secondRow.map((app, i) => (
          <motion.div
            key={app.id}
            className="app-icon"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5 + i * 0.06,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
            onClick={() => navigateTo(app.screen)}
          >
            <div
              className="app-icon__glyph"
              style={{ background: app.gradient }}
            >
              {app.icon}
            </div>
            <span className="app-icon__name">{app.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Quick access ARIA */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass-card gradient-border"
        style={{
          padding: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-md)',
          cursor: 'pointer',
        }}
        onClick={() => navigateTo('aria')}
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, hsl(185, 80%, 30%), hsl(270, 80%, 40%))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            boxShadow: '0 0 20px hsla(185, 100%, 55%, 0.2)',
          }}
        >
          ✦
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              letterSpacing: '1px',
            }}
          >
            ARIA — Quantum AI
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            "Your neural patterns look great today"
          </div>
        </div>
        <span style={{ color: 'var(--color-primary)', fontSize: '18px' }}>›</span>
      </motion.div>
    </div>
  );
}
