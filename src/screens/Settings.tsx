import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';

const SETTINGS_SECTIONS = [
  {
    title: 'NEURAL INTERFACE',
    items: [
      { icon: '🧠', label: 'Neural-Link', sublabel: 'Connection: 97.3% coherence', color: 'hsl(270, 80%, 35%)', hasToggle: false },
      { icon: '🎚️', label: 'Thought Sensitivity', sublabel: 'Medium-High', color: 'hsl(270, 60%, 30%)', hasToggle: false },
      { icon: '🛡️', label: 'Thought Guard', sublabel: 'Active — blocking intrusive scans', color: 'hsl(185, 80%, 30%)', hasToggle: true, defaultOn: true },
    ],
  },
  {
    title: 'DISPLAY & HOLOGRAPHICS',
    items: [
      { icon: '✨', label: 'Holo Intensity', sublabel: '75%', color: 'hsl(185, 60%, 25%)', hasToggle: false },
      { icon: '🌌', label: 'Particle Density', sublabel: 'Standard', color: 'hsl(240, 60%, 25%)', hasToggle: false },
      { icon: '🎨', label: 'Theme', sublabel: 'Quantum Aurora', color: 'hsl(330, 60%, 30%)', hasToggle: false },
      { icon: '📐', label: 'Spatial Anchoring', sublabel: 'Auto-adapt to environment', color: 'hsl(200, 60%, 25%)', hasToggle: true, defaultOn: true },
    ],
  },
  {
    title: 'PRIVACY & SECURITY',
    items: [
      { icon: '🔐', label: 'Quantum Encryption', sublabel: '4096-qubit active', color: 'hsl(150, 70%, 25%)', hasToggle: true, defaultOn: true },
      { icon: '🧬', label: 'Biometric Lock', sublabel: 'DNA + Neural + Retina', color: 'hsl(340, 60%, 30%)', hasToggle: false },
      { icon: '🔒', label: 'Memory Protection', sublabel: 'All memories encrypted', color: 'hsl(45, 70%, 25%)', hasToggle: true, defaultOn: true },
    ],
  },
  {
    title: 'ARIA AI',
    items: [
      { icon: '🤖', label: 'Personality', sublabel: 'Helpful & Curious', color: 'hsl(185, 80%, 25%)', hasToggle: false },
      { icon: '📊', label: 'Proactivity', sublabel: 'Medium — suggests when relevant', color: 'hsl(210, 60%, 25%)', hasToggle: false },
      { icon: '🧪', label: 'Experimental Features', sublabel: 'Precognition module active', color: 'hsl(300, 60%, 30%)', hasToggle: true, defaultOn: false },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { icon: '⚡', label: 'Energy Core', sublabel: 'Zero-point: ∞ capacity', color: 'hsl(50, 70%, 25%)', hasToggle: false },
      { icon: '📡', label: 'DimNet', sublabel: 'Connected to 7 dimensions', color: 'hsl(200, 70%, 25%)', hasToggle: false },
      { icon: 'ℹ️', label: 'About', sublabel: 'ΩS 2080.1 Singularity', color: 'hsl(220, 30%, 25%)', hasToggle: false },
    ],
  },
];

function ToggleSwitch({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div
      className={`quantum-toggle ${on ? 'quantum-toggle--active' : ''}`}
      onClick={(e) => { e.stopPropagation(); setOn(!on); }}
    >
      <div className="quantum-toggle__knob" />
    </div>
  );
}

import { useState } from 'react';

export default function Settings() {
  const { goBack } = useOSStore();

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      <div className="screen__header" style={{ padding: 'var(--space-sm) 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          <button
            onClick={goBack}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary)',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            ‹
          </button>
          <h1 className="screen__title gradient-text">Settings</h1>
        </div>
        <p className="screen__subtitle" style={{ marginLeft: '26px' }}>System Configuration</p>
      </div>

      {SETTINGS_SECTIONS.map((section, si) => (
        <motion.div
          key={section.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: si * 0.1 }}
          style={{ marginBottom: 'var(--space-lg)' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.55rem',
              letterSpacing: '3px',
              color: 'var(--text-tertiary)',
              marginBottom: 'var(--space-sm)',
              paddingLeft: '4px',
            }}
          >
            {section.title}
          </div>
          <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
            {section.items.map((item) => (
              <div key={item.label} className="settings-row">
                <div className="settings-row__left">
                  <div
                    className="settings-row__icon"
                    style={{ background: item.color }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="settings-row__label">{item.label}</div>
                    <div className="settings-row__sublabel">{item.sublabel}</div>
                  </div>
                </div>
                <div className="settings-row__right">
                  {item.hasToggle ? (
                    <ToggleSwitch defaultOn={item.defaultOn ?? false} />
                  ) : (
                    <span>›</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
