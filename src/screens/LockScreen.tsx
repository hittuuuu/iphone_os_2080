import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOSStore } from '../store/useOSStore';
import { formatNeuralTime, formatNeuralDate } from '../utils/constants';

export default function LockScreen() {
  const { isLocked, unlock, notifications } = useOSStore();
  const [time, setTime] = useState(new Date());
  const [authState, setAuthState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const touchStartY = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAuth = useCallback(() => {
    if (authState !== 'idle') return;
    setAuthState('scanning');
    setTimeout(() => {
      setAuthState('success');
      setTimeout(() => unlock(), 400);
    }, 1200);
  }, [authState, unlock]);

  // Swipe up detection
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (deltaY > 100) {
        // Swipe up detected
        handleAuth();
      }
    },
    [handleAuth]
  );

  // Mouse drag for desktop
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartY.current = e.clientY;
  }, []);

  const handleMouseUp = useCallback(
    (e: React.MouseEvent) => {
      const deltaY = touchStartY.current - e.clientY;
      if (deltaY > 80) {
        handleAuth();
      }
    },
    [handleAuth]
  );

  if (!isLocked) return null;

  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div
          className="lock-screen scanline-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.92 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onClick={handleAuth}
          style={{ cursor: 'default' }}
        >
          {/* Ambient top glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '200px',
              background:
                'radial-gradient(ellipse at 50% 0%, hsla(270, 80%, 40%, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Ambient center glow */}
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '280px',
              height: '280px',
              background:
                'radial-gradient(circle, hsla(185, 100%, 55%, 0.04) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              animation: 'holoPulse 5s ease-in-out infinite',
            }}
          />

          {/* Time Display */}
          <motion.div
            className="lock-screen__time gradient-text"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 80, damping: 15 }}
            style={{ fontSize: '4rem', letterSpacing: '6px' }}
          >
            {formatNeuralTime(time)}
          </motion.div>

          <motion.div
            className="lock-screen__date"
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ letterSpacing: '4px', fontSize: '0.7rem' }}
          >
            {formatNeuralDate(time)}
          </motion.div>

          {/* Auth Ring */}
          <motion.div
            className="lock-screen__auth"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          >
            <div
              className="lock-screen__scan-ring"
              style={{
                borderColor:
                  authState === 'success'
                    ? 'hsl(150, 100%, 50%)'
                    : authState === 'scanning'
                    ? 'hsl(45, 100%, 60%)'
                    : undefined,
                boxShadow:
                  authState === 'success'
                    ? '0 0 40px hsla(150, 100%, 50%, 0.4), inset 0 0 25px hsla(150, 100%, 50%, 0.15)'
                    : authState === 'scanning'
                    ? '0 0 40px hsla(45, 100%, 60%, 0.4), inset 0 0 25px hsla(45, 100%, 60%, 0.15)'
                    : undefined,
                transition: 'all 0.5s ease',
              }}
            >
              {authState === 'idle' && '🧬'}
              {authState === 'scanning' && (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ fontSize: '36px' }}
                >
                  ◎
                </motion.span>
              )}
              {authState === 'success' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ fontSize: '36px', color: 'hsl(150, 100%, 50%)' }}
                >
                  ✓
                </motion.span>
              )}
            </div>

            <div
              className="lock-screen__label"
              style={{
                color:
                  authState === 'success'
                    ? 'hsl(150, 100%, 50%)'
                    : authState === 'scanning'
                    ? 'hsl(45, 100%, 60%)'
                    : undefined,
              }}
            >
              {authState === 'idle' && 'TAP OR SWIPE UP'}
              {authState === 'scanning' && 'SCANNING DNA PATTERN...'}
              {authState === 'success' && 'IDENTITY VERIFIED'}
            </div>
          </motion.div>

          {/* Lock screen notifications */}
          <div className="lock-screen__notifs">
            {notifications.slice(0, 2).map((n, i) => (
              <motion.div
                key={n.id}
                className="glass-card"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  fontSize: 'var(--text-xs)',
                }}
              >
                <span style={{ fontSize: '16px' }}>{n.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-xs)' }}>
                    {n.title}
                  </div>
                  <div
                    style={{
                      color: 'var(--text-secondary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: '0.6rem',
                    }}
                  >
                    {n.text}
                  </div>
                </div>
                <span style={{ color: 'var(--text-tertiary)', fontSize: '0.55rem' }}>
                  {n.time}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Swipe up hint with animated chevron */}
          <motion.div
            className="lock-screen__swipe"
            style={{
              fontFamily: 'var(--font-display)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <motion.span
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '16px', opacity: 0.4 }}
            >
              ▲
            </motion.span>
            <span style={{ fontSize: '0.5rem', letterSpacing: '3px' }}>SWIPE UP TO UNLOCK</span>
          </motion.div>

          {/* Home indicator on lock screen */}
          <div
            className="home-indicator"
            style={{ bottom: '8px', background: 'hsla(0, 0%, 100%, 0.15)' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
