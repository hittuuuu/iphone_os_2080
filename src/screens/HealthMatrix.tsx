import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

function BodySilhouette() {
  return (
    <div style={{
      width: '100%',
      height: '180px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Simple stylized body outline */}
      <div style={{
        width: '60px',
        height: '150px',
        position: 'relative',
      }}>
        {/* Head */}
        <div style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          border: '2px solid var(--color-primary)',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '0 0 15px var(--color-primary-glow)',
        }} />
        {/* Body */}
        <div style={{
          width: '2px',
          height: '60px',
          background: 'var(--color-primary)',
          position: 'absolute',
          top: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.6,
        }} />
        {/* Arms */}
        <div style={{
          width: '50px',
          height: '2px',
          background: 'var(--color-primary)',
          position: 'absolute',
          top: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0.6,
        }} />
        {/* Legs */}
        <div style={{
          width: '2px',
          height: '50px',
          background: 'var(--color-primary)',
          position: 'absolute',
          top: '92px',
          left: '35%',
          transform: 'rotate(10deg)',
          opacity: 0.6,
        }} />
        <div style={{
          width: '2px',
          height: '50px',
          background: 'var(--color-primary)',
          position: 'absolute',
          top: '92px',
          right: '35%',
          transform: 'rotate(-10deg)',
          opacity: 0.6,
        }} />

        {/* Pulse points */}
        {[
          { top: '15px', left: '50%', color: 'var(--color-accent)' }, // head
          { top: '55px', left: '50%', color: 'var(--color-success)' }, // heart
          { top: '75px', left: '50%', color: 'var(--color-primary)' }, // core
        ].map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: p.top,
            left: p.left,
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: p.color,
            boxShadow: `0 0 12px ${p.color}`,
            animation: `holoPulse ${2 + i * 0.5}s infinite`,
          }} />
        ))}
      </div>

      {/* Floating vital labels */}
      {[
        { label: 'Neural: 97%', top: '10px', right: '10px', color: 'var(--color-secondary)' },
        { label: 'Heart: 62 bpm', top: '60px', left: '10px', color: 'var(--color-success)' },
        { label: 'Nano: Active', top: '110px', right: '10px', color: 'var(--color-primary)' },
      ].map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: v.left ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.2 }}
          style={{
            position: 'absolute',
            top: v.top,
            left: v.left,
            right: (v as any).right,
            fontSize: '0.6rem',
            fontFamily: 'var(--font-mono)',
            color: v.color,
            padding: '3px 8px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-glass)',
            border: `1px solid ${v.color}30`,
          }}
        >
          {v.label}
        </motion.div>
      ))}
    </div>
  );
}

function EmotionRadar() {
  const emotions = [
    { label: 'Joy', value: 75, angle: 0 },
    { label: 'Focus', value: 90, angle: 60 },
    { label: 'Calm', value: 85, angle: 120 },
    { label: 'Love', value: 60, angle: 180 },
    { label: 'Energy', value: 70, angle: 240 },
    { label: 'Curious', value: 80, angle: 300 },
  ];

  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 55;

  const points = emotions.map((e) => {
    const r = (e.value / 100) * maxR;
    const rad = (e.angle - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid circles */}
        {[0.33, 0.66, 1].map((s, i) => (
          <circle key={i} cx={cx} cy={cy} r={maxR * s} fill="none" stroke="hsla(185, 100%, 55%, 0.08)" strokeWidth="1" />
        ))}
        {/* Grid lines */}
        {emotions.map((e, i) => {
          const rad = (e.angle - 90) * (Math.PI / 180);
          return (
            <line key={i} x1={cx} y1={cy} x2={cx + maxR * Math.cos(rad)} y2={cy + maxR * Math.sin(rad)} stroke="hsla(185, 100%, 55%, 0.06)" strokeWidth="1" />
          );
        })}
        {/* Data shape */}
        <path d={pathD} fill="hsla(185, 100%, 55%, 0.15)" stroke="var(--color-primary)" strokeWidth="1.5" />
        {/* Data points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--color-primary)" style={{ filter: 'drop-shadow(0 0 4px var(--color-primary))' }} />
        ))}
        {/* Labels */}
        {emotions.map((e, i) => {
          const rad = (e.angle - 90) * (Math.PI / 180);
          const lx = cx + (maxR + 15) * Math.cos(rad);
          const ly = cy + (maxR + 15) * Math.sin(rad);
          return (
            <text key={i} x={lx} y={ly} fill="var(--text-secondary)" fontSize="7" fontFamily="var(--font-display)" textAnchor="middle" dominantBaseline="middle">
              {e.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

export default function HealthMatrix() {
  const { goBack, healthMetrics } = useOSStore();

  const vitals = [
    { label: 'Heart Rate', value: `${healthMetrics.heartRate}`, unit: 'bpm', color: 'var(--color-accent)', icon: '💓' },
    { label: 'Neural', value: `${healthMetrics.neuralActivity}`, unit: '%', color: 'var(--color-secondary)', icon: '🧠' },
    { label: 'Q-Coherence', value: `${healthMetrics.quantumCoherence}`, unit: '%', color: 'var(--color-primary)', icon: '⚛️' },
    { label: 'Nanobots', value: `${healthMetrics.nanobotStatus}`, unit: '%', color: 'var(--color-success)', icon: '🔬' },
  ];

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      <div className="screen__header" style={{ padding: 'var(--space-sm) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '18px', cursor: 'pointer' }}>‹</button>
          <h1 className="screen__title gradient-text">Health Matrix</h1>
        </div>
        <p className="screen__subtitle" style={{ marginLeft: '26px' }}>Biometric Monitoring</p>
      </div>

      {/* Health Score */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card gradient-border"
        style={{ textAlign: 'center', marginBottom: 'var(--space-md)', padding: 'var(--space-lg)' }}
      >
        <div className="widget__title">OVERALL HEALTH SCORE</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '3rem',
          fontWeight: 900,
          background: 'linear-gradient(135deg, var(--color-success), var(--color-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none',
        }}>
          98.7
        </div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-success)' }}>
          ● Excellent — All systems optimal
        </div>
      </motion.div>

      {/* Body Scan */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-card"
        style={{ marginBottom: 'var(--space-md)' }}
      >
        <div className="widget__title">BODY SCAN</div>
        <BodySilhouette />
      </motion.div>

      {/* Vitals Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-sm)',
        marginBottom: 'var(--space-md)',
      }}>
        {vitals.map((v, i) => (
          <motion.div
            key={v.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            className="glass-card"
            style={{ textAlign: 'center', padding: 'var(--space-md)' }}
          >
            <span style={{ fontSize: '24px' }}>{v.icon}</span>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 800,
              color: v.color,
              marginTop: '4px',
              textShadow: `0 0 15px ${v.color}40`,
            }}>
              {v.value}<span style={{ fontSize: 'var(--text-xs)', opacity: 0.7 }}>{v.unit}</span>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>{v.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Emotion Radar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
        style={{ marginBottom: 'var(--space-md)' }}
      >
        <div className="widget__title">EMOTION RADAR</div>
        <EmotionRadar />
      </motion.div>
    </div>
  );
}
