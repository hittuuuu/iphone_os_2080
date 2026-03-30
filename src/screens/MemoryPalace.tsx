import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

const MEMORIES = [
  { id: 'm1', title: 'Mars Colony Sunset', date: '12 Plasma 2080', type: 'shared', preview: '🔴 A breathtaking view from Olympus Mons...', icon: '🌅', color: 'hsl(15, 80%, 50%)' },
  { id: 'm2', title: 'First Neural Link', date: '3 Stellar 2080', type: 'personal', preview: '🧠 The moment I connected to the hive-mind...', icon: '⚡', color: 'var(--color-primary)' },
  { id: 'm3', title: 'Quantum Graduation', date: '28 Nebula 2080', type: 'personal', preview: '🎓 Downloading 4 years of quantum physics...', icon: '📚', color: 'var(--color-secondary)' },
  { id: 'm4', title: 'Luna\'s Dream Share', date: '10 Photon 2080', type: 'shared', preview: '🌙 Exploring Luna\'s dreamscape together...', icon: '💫', color: 'var(--color-accent)' },
  { id: 'm5', title: 'First Teleportation', date: '1 Quantum 2080', type: 'ai-enhanced', preview: '🚀 Tokyo to New York in 0.003 seconds...', icon: '🌐', color: 'var(--color-success)' },
  { id: 'm6', title: 'Holo-Art Exhibition', date: '22 Cosmic 2079', type: 'personal', preview: '🎨 My dimensional art piece won first place...', icon: '🏆', color: 'hsl(45, 100%, 55%)' },
];

export default function MemoryPalace() {
  const { goBack } = useOSStore();

  const typeStyles: Record<string, { label: string; color: string }> = {
    'personal': { label: 'Personal', color: 'var(--color-primary)' },
    'shared': { label: 'Shared', color: 'var(--color-secondary)' },
    'ai-enhanced': { label: 'AI-Enhanced', color: 'var(--color-accent)' },
  };

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      <div className="screen__header" style={{ padding: 'var(--space-sm) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '18px', cursor: 'pointer' }}>‹</button>
          <h1 className="screen__title gradient-text">Memory Palace</h1>
        </div>
        <p className="screen__subtitle" style={{ marginLeft: '26px' }}>Digital Memory Archive</p>
      </div>

      {/* Storage indicator */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card"
        style={{ marginBottom: 'var(--space-md)', padding: 'var(--space-md)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
          <span className="widget__title" style={{ margin: 0 }}>QUANTUM MEMORY STORAGE</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-sm)', color: 'var(--color-primary)' }}>∞</span>
        </div>
        <div style={{ height: '4px', borderRadius: '2px', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '42%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent))',
              borderRadius: '2px',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.55rem', color: 'var(--text-tertiary)' }}>
          <span>12,847 memories stored</span>
          <span>42% of allocated space</span>
        </div>
      </motion.div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: 'var(--space-sm)', marginBottom: 'var(--space-md)' }}>
        {['All', 'Personal', 'Shared', 'AI-Enhanced'].map((cat) => (
          <button
            key={cat}
            style={{
              padding: '5px 12px',
              borderRadius: 'var(--radius-full)',
              border: cat === 'All' ? '1px solid var(--color-primary)' : 'var(--glass-border)',
              background: cat === 'All' ? 'hsla(185, 100%, 55%, 0.15)' : 'var(--bg-glass)',
              color: cat === 'All' ? 'var(--color-primary)' : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.55rem',
              letterSpacing: '1px',
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '20px' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          left: '6px',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(180deg, var(--color-primary), var(--color-secondary), var(--color-accent), transparent)',
        }} />

        {MEMORIES.map((mem, i) => (
          <motion.div
            key={mem.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            style={{ marginBottom: 'var(--space-md)', position: 'relative' }}
          >
            {/* Timeline dot */}
            <div style={{
              position: 'absolute',
              left: '-17px',
              top: '14px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: mem.color,
              boxShadow: `0 0 8px ${mem.color}60`,
              border: '2px solid var(--bg-primary)',
            }} />

            <div className="glass-card" style={{
              padding: 'var(--space-md)',
              cursor: 'pointer',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', marginBottom: '6px' }}>
                <span style={{ fontSize: '20px' }}>{mem.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{mem.title}</div>
                  <div style={{ fontSize: '0.55rem', color: 'var(--text-tertiary)' }}>{mem.date}</div>
                </div>
                <span style={{
                  fontSize: '0.5rem',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background: `${typeStyles[mem.type].color}20`,
                  color: typeStyles[mem.type].color,
                  border: `1px solid ${typeStyles[mem.type].color}30`,
                }}>
                  {typeStyles[mem.type].label}
                </span>
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                {mem.preview}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
