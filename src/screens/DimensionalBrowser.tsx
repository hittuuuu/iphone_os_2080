import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

const BOOKMARKS = [
  { name: 'QuantumHub', url: 'dim://quantum-hub.void', icon: '⚛️', color: 'hsl(185, 80%, 30%)' },
  { name: 'Neural News', url: 'dim://neural.news', icon: '📰', color: 'hsl(270, 60%, 35%)' },
  { name: 'Galaxy Wiki', url: 'dim://galaxy.wiki', icon: '🌌', color: 'hsl(220, 60%, 30%)' },
  { name: 'Void Market', url: 'dim://void-market.q', icon: '🛒', color: 'hsl(150, 60%, 28%)' },
  { name: 'Dream Archive', url: 'dim://dreams.archive', icon: '🌙', color: 'hsl(240, 50%, 35%)' },
  { name: 'Temporal Wiki', url: 'dim://time.wiki', icon: '⏳', color: 'hsl(45, 70%, 30%)' },
];

const TABS = [
  { title: 'Quantum Computing 101', url: 'dim://academy.q/quantum-101', preview: '⚛️' },
  { title: 'Mars Colony Guide', url: 'dim://mars-travel.void', preview: '🔴' },
  { title: 'Neural Art Gallery', url: 'dim://neural-art.holo', preview: '🎨' },
];

export default function DimensionalBrowser() {
  const { goBack } = useOSStore();

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      <div className="screen__header" style={{ padding: 'var(--space-sm) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '18px', cursor: 'pointer' }}>‹</button>
          <h1 className="screen__title gradient-text">DimBrowser</h1>
        </div>
        <p className="screen__subtitle" style={{ marginLeft: '26px' }}>Dimensional Web Explorer</p>
      </div>

      {/* Address bar */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
          padding: '10px var(--space-md)',
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-glass)',
          border: 'var(--glass-border)',
          marginBottom: 'var(--space-md)',
        }}
      >
        <span style={{ fontSize: '10px', color: 'var(--color-success)' }}>🔒</span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)',
          flex: 1,
        }}>
          dim://home.void
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>⟳</span>
      </motion.div>

      {/* Bookmarks */}
      <div className="widget__title" style={{ marginBottom: 'var(--space-sm)' }}>BOOKMARKS</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-lg)',
      }}>
        {BOOKMARKS.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.06, type: 'spring' }}
            className="glass-card"
            style={{
              padding: 'var(--space-md) var(--space-sm)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: b.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}>
              {b.icon}
            </div>
            <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
              {b.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Open Tabs */}
      <div className="widget__title" style={{ marginBottom: 'var(--space-sm)' }}>
        OPEN DIMENSIONS ({TABS.length})
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {TABS.map((tab, i) => (
          <motion.div
            key={tab.url}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="glass-card"
            style={{
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              border: 'var(--glass-border)',
            }}>
              {tab.preview}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{tab.title}</div>
              <div style={{
                fontSize: '0.55rem',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {tab.url}
              </div>
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-tertiary)',
              fontSize: '14px',
              cursor: 'pointer',
            }}>
              ✕
            </button>
          </motion.div>
        ))}
      </div>

      {/* New tab button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="holo-btn holo-btn--ghost"
        style={{
          width: '100%',
          marginTop: 'var(--space-md)',
          padding: 'var(--space-md)',
          justifyContent: 'center',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        + Open New Dimension
      </motion.button>
    </div>
  );
}
