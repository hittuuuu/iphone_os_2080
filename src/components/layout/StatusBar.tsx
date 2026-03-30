import { useState, useEffect } from 'react';
import { formatNeuralTime } from '../../utils/constants';

export default function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="status-bar">
      {/* Left: Neural signal strength (like iPhone cellular bars) */}
      <div className="status-bar__left">
        <div className="status-bar__neural-bars">
          <div className="status-bar__neural-bar" />
          <div className="status-bar__neural-bar" />
          <div className="status-bar__neural-bar" />
          <div className="status-bar__neural-bar" />
        </div>
        <span
          style={{
            fontSize: '0.5rem',
            letterSpacing: '1.5px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
          }}
        >
          ΩS
        </span>
      </div>

      {/* Center: Time (iPhone always shows time in status bar) */}
      <div className="status-bar__center">
        {formatNeuralTime(time)}
      </div>

      {/* Right: Shield + DimNet + Energy (like WiFi + Battery on iPhone) */}
      <div className="status-bar__right">
        {/* DimNet indicator (like WiFi) */}
        <svg width="14" height="10" viewBox="0 0 14 10" style={{ opacity: 0.7 }}>
          <path d="M7 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="var(--color-primary)" />
          <path
            d="M4.5 7a3.5 3.5 0 0 1 5 0"
            stroke="var(--color-primary)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M2 4.5a7 7 0 0 1 10 0"
            stroke="var(--color-primary)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M0 2a10 10 0 0 1 14 0"
            stroke="var(--color-primary)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>

        {/* Quantum Shield */}
        <span className="status-bar__shield">🛡</span>

        {/* Battery (always infinity) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <div
            style={{
              width: '22px',
              height: '10px',
              borderRadius: '3px',
              border: '1px solid var(--color-success)',
              padding: '1px',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '1.5px',
                background: 'var(--color-success)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: '-4px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '2px',
                height: '5px',
                borderRadius: '0 1px 1px 0',
                background: 'var(--color-success)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
