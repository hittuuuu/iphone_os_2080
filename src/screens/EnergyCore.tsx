import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

function EnergyCore3D() {

  return (
    <div style={{
      width: '180px',
      height: '180px',
      position: 'relative',
      margin: '0 auto',
    }}>
      {/* Outer ring */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '2px solid hsla(185, 100%, 55%, 0.2)',
        animation: 'quantumSpin 8s linear infinite',
      }}>
        <div style={{
          position: 'absolute',
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--color-primary)',
          boxShadow: '0 0 10px var(--color-primary)',
        }} />
      </div>

      {/* Middle ring */}
      <div style={{
        position: 'absolute',
        inset: '20px',
        borderRadius: '50%',
        border: '2px solid hsla(270, 100%, 65%, 0.2)',
        animation: 'quantumSpinReverse 6s linear infinite',
      }}>
        <div style={{
          position: 'absolute',
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--color-secondary)',
          boxShadow: '0 0 10px var(--color-secondary)',
        }} />
      </div>

      {/* Inner ring */}
      <div style={{
        position: 'absolute',
        inset: '40px',
        borderRadius: '50%',
        border: '2px solid hsla(330, 100%, 65%, 0.2)',
        animation: 'quantumSpin 4s linear infinite',
      }}>
        <div style={{
          position: 'absolute',
          bottom: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--color-accent)',
          boxShadow: '0 0 10px var(--color-accent)',
        }} />
      </div>

      {/* Core */}
      <div style={{
        position: 'absolute',
        inset: '60px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, hsla(185, 100%, 55%, 0.3), transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'glowBreathe 3s infinite',
      }}>
        <span style={{ fontSize: '28px' }}>⚡</span>
      </div>
    </div>
  );
}

export default function EnergyCore() {
  const { goBack } = useOSStore();

  const DISTRIBUTION = [
    { label: 'Neural Processing', percent: 35, color: 'var(--color-secondary)' },
    { label: 'Holographic Display', percent: 25, color: 'var(--color-primary)' },
    { label: 'Quantum Comms', percent: 20, color: 'var(--color-accent)' },
    { label: 'Nanobot Operations', percent: 12, color: 'var(--color-success)' },
    { label: 'System Reserve', percent: 8, color: 'var(--color-warning)' },
  ];

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      <div className="screen__header" style={{ padding: 'var(--space-sm) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '18px', cursor: 'pointer' }}>‹</button>
          <h1 className="screen__title gradient-text">Energy Core</h1>
        </div>
        <p className="screen__subtitle" style={{ marginLeft: '26px' }}>Zero-Point Power Management</p>
      </div>

      {/* Energy Core Visualization */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card gradient-border"
        style={{ marginBottom: 'var(--space-md)', padding: 'var(--space-lg)', textAlign: 'center' }}
      >
        <div className="widget__title">ZERO-POINT ENERGY CORE</div>
        <EnergyCore3D />
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 900,
          color: 'var(--color-primary)',
          marginTop: 'var(--space-sm)',
          textShadow: '0 0 20px var(--color-primary-glow)',
        }}>
          ∞
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>
          Unlimited capacity • Zero degradation
        </div>
      </motion.div>

      {/* Power Distribution */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="glass-card"
        style={{ marginBottom: 'var(--space-md)' }}
      >
        <div className="widget__title">POWER DISTRIBUTION</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'var(--space-md)' }}>
          {DISTRIBUTION.map((d, i) => (
            <div key={d.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: 'var(--text-xs)' }}>
                <span>{d.label}</span>
                <span style={{ color: d.color, fontFamily: 'var(--font-display)' }}>{d.percent}%</span>
              </div>
              <div style={{ height: '4px', borderRadius: '2px', background: 'var(--bg-tertiary)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.percent}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: d.color,
                    borderRadius: '2px',
                    boxShadow: `0 0 8px ${d.color}50`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-sm)',
          marginBottom: 'var(--space-md)',
        }}
      >
        {[
          { icon: '🔄', label: 'Recalibrate', color: 'hsl(185, 80%, 25%)' },
          { icon: '📤', label: 'Share Energy', color: 'hsl(270, 60%, 30%)' },
          { icon: '📊', label: 'Usage History', color: 'hsl(220, 50%, 25%)' },
          { icon: '⚙️', label: 'Core Settings', color: 'hsl(45, 60%, 25%)' },
        ].map((a) => (
          <div
            key={a.label}
            className="glass-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--space-sm)',
              padding: 'var(--space-md)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: a.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}>
              {a.icon}
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>{a.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
