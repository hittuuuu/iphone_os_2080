import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

function WaveVisualizer() {
  const [bars, setBars] = useState<number[]>(Array(30).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(bars.map(() => Math.random() * 100));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '60px', justifyContent: 'center' }}>
      {bars.map((h, i) => (
        <div
          key={i}
          style={{
            width: '4px',
            height: `${h * 0.6}px`,
            background: `linear-gradient(180deg, var(--color-primary) 0%, var(--color-secondary) 100%)`,
            borderRadius: '2px',
            transition: 'height 0.15s ease',
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
}

function MetricGauge({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  const circumference = 2 * Math.PI * 30;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="health-metric" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="circular-progress" style={{ width: '76px', height: '76px' }}>
        <svg className="circular-progress__svg" width="76" height="76" viewBox="0 0 76 76">
          <circle className="circular-progress__track" cx="38" cy="38" r="30" />
          <circle
            className="circular-progress__fill"
            cx="38"
            cy="38"
            r="30"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ stroke: color, filter: `drop-shadow(0 0 6px ${color}50)` }}
          />
        </svg>
        <div className="circular-progress__value" style={{ color, fontSize: '14px' }}>
          {icon}
        </div>
      </div>
      <div className="health-metric__value" style={{ color, marginTop: '8px' }}>{value}%</div>
      <div className="health-metric__label">{label}</div>
    </div>
  );
}

export default function NeuralHub() {
  const { goBack, cognitiveMetrics, neuralLinkStrength } = useOSStore();

  const THOUGHT_LOG = [
    { time: '14:23', thought: 'Navigate to Neural Hub', type: 'command' },
    { time: '14:21', thought: 'Feeling curious about quantum mechanics', type: 'emotion' },
    { time: '14:15', thought: 'Compose message to Nova Chen', type: 'command' },
    { time: '14:10', thought: 'Remember yesterday\'s sunset', type: 'memory' },
    { time: '13:55', thought: 'Calculate energy expenditure', type: 'command' },
  ];

  const CONNECTED_DEVICES = [
    { name: 'Neural Implant v9', status: 'Active', icon: '🧠' },
    { name: 'Optical HUD', status: 'Active', icon: '👁️' },
    { name: 'Nanobots Cluster', status: '12M units', icon: '🔬' },
    { name: 'Quantum Comm Link', status: 'Entangled', icon: '📡' },
  ];

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      <div className="screen__header" style={{ padding: 'var(--space-sm) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '18px', cursor: 'pointer' }}>‹</button>
          <h1 className="screen__title gradient-text">Neural Hub</h1>
        </div>
        <p className="screen__subtitle" style={{ marginLeft: '26px' }}>Brain Interface Dashboard</p>
      </div>

      {/* Neural Activity */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card"
        style={{ marginBottom: 'var(--space-md)' }}
      >
        <div className="widget__title">NEURAL ACTIVITY — REAL-TIME</div>
        <WaveVisualizer />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-sm)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
          <span>Coherence: {neuralLinkStrength}%</span>
          <span style={{ color: 'var(--color-success)' }}>● Optimal</span>
        </div>
      </motion.div>

      {/* Cognitive Metrics */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card"
        style={{ marginBottom: 'var(--space-md)' }}
      >
        <div className="widget__title">COGNITIVE PERFORMANCE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)' }}>
          <MetricGauge label="Memory" value={cognitiveMetrics.memory} color="hsl(185, 100%, 55%)" icon="💾" />
          <MetricGauge label="Focus" value={cognitiveMetrics.focus} color="hsl(270, 100%, 65%)" icon="🎯" />
          <MetricGauge label="Create" value={cognitiveMetrics.creativity} color="hsl(330, 100%, 65%)" icon="✨" />
          <MetricGauge label="Empathy" value={cognitiveMetrics.empathy} color="hsl(150, 100%, 50%)" icon="💚" />
        </div>
      </motion.div>

      {/* Thought Log */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
        style={{ marginBottom: 'var(--space-md)' }}
      >
        <div className="widget__title">THOUGHT LOG</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'var(--space-sm)' }}>
          {THOUGHT_LOG.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)', fontSize: 'var(--text-xs)' }}>
              <span style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', minWidth: '36px' }}>{t.time}</span>
              <span style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: t.type === 'command' ? 'var(--color-primary)' : t.type === 'emotion' ? 'var(--color-accent)' : 'var(--color-secondary)',
                flexShrink: 0,
              }} />
              <span style={{ color: 'var(--text-secondary)' }}>{t.thought}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Connected Devices */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass-card"
        style={{ marginBottom: 'var(--space-md)' }}
      >
        <div className="widget__title">CONNECTED DEVICES</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'var(--space-sm)' }}>
          {CONNECTED_DEVICES.map((d, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', fontSize: 'var(--text-sm)' }}>
              <span style={{ fontSize: '18px' }}>{d.icon}</span>
              <span style={{ flex: 1 }}>{d.name}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>{d.status}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
