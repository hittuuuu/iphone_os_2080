import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';
import { APPS } from '../utils/constants';

const CATEGORIES = ['All', 'Neural', 'Quantum', 'Social', 'Creative', 'Health', 'Utility'];

export default function AppDrawer() {
  const { navigateTo } = useOSStore();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = APPS.filter((app) => {
    if (activeCategory !== 'All' && app.category !== activeCategory.toLowerCase()) return false;
    if (search && !app.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="screen" style={{ padding: '0 var(--space-md)' }}>
      <div className="screen__header" style={{ padding: 'var(--space-sm) 0' }}>
        <h1 className="screen__title gradient-text">App Space</h1>
        <p className="screen__subtitle">24 dimensions available</p>
      </div>

      {/* Search */}
      <div
        style={{
          padding: '10px var(--space-md)',
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-glass)',
          border: 'var(--glass-border)',
          marginBottom: 'var(--space-md)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-sm)',
        }}
      >
        <span style={{ opacity: 0.4 }}>🔍</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search apps..."
          style={{
            background: 'none',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            width: '100%',
          }}
        />
      </div>

      {/* Category tabs */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--space-sm)',
          overflowX: 'auto',
          paddingBottom: 'var(--space-sm)',
          marginBottom: 'var(--space-md)',
          scrollbarWidth: 'none',
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border:
                activeCategory === cat
                  ? '1px solid var(--color-primary)'
                  : 'var(--glass-border)',
              background:
                activeCategory === cat
                  ? 'hsla(185, 100%, 55%, 0.15)'
                  : 'var(--bg-glass)',
              color:
                activeCategory === cat
                  ? 'var(--color-primary)'
                  : 'var(--text-secondary)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.6rem',
              letterSpacing: '1px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* App list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {filtered.map((app, i) => (
          <motion.div
            key={app.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="glass-card"
            style={{
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-md)',
              cursor: 'pointer',
            }}
            onClick={() => navigateTo(app.screen)}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                background: app.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
              }}
            >
              {app.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                {app.name}
              </div>
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                  textTransform: 'capitalize',
                }}
              >
                {app.category}
              </div>
            </div>
            <span style={{ color: 'var(--text-tertiary)', fontSize: '14px' }}>›</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
