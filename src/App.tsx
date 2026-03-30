import { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useOSStore } from './store/useOSStore';
import HolographicBackground from './components/3d/HolographicBackground';
import StatusBar from './components/layout/StatusBar';
import NavigationDock from './components/layout/NavigationDock';
import LockScreen from './screens/LockScreen';
import HomeScreen from './screens/HomeScreen';
import AppDrawer from './screens/AppDrawer';
import Settings from './screens/Settings';
import ARIAChat from './screens/ARIAChat';
import NeuralHub from './screens/NeuralHub';
import HealthMatrix from './screens/HealthMatrix';
import EnergyCore from './screens/EnergyCore';
import QuantumMessenger from './screens/QuantumMessenger';
import MemoryPalace from './screens/MemoryPalace';
import NotificationCenter from './screens/NotificationCenter';
import DimensionalBrowser from './screens/DimensionalBrowser';

import './styles/index.css';
import './styles/animations.css';

/* ---- Waveform Bars (pre-computed to avoid Math.random in render) ---- */
const WAVEFORM_CONFIGS = [
  { targetH: 14, dur: 0.85, delay: 0 },
  { targetH: 18, dur: 1.0, delay: 0.1 },
  { targetH: 12, dur: 0.75, delay: 0.2 },
  { targetH: 20, dur: 1.1, delay: 0.3 },
  { targetH: 15, dur: 0.9, delay: 0.4 },
  { targetH: 17, dur: 0.95, delay: 0.5 },
];

function WaveformBars() {
  return (
    <div style={{ display: 'flex', gap: '1.5px', alignItems: 'center', height: '20px' }}>
      {WAVEFORM_CONFIGS.map((cfg, i) => (
        <motion.div
          key={i}
          animate={{ height: [4, cfg.targetH, 4] }}
          transition={{
            duration: cfg.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: cfg.delay,
          }}
          style={{
            width: '2px',
            background: 'var(--color-primary)',
            borderRadius: '1px',
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

/* ---- Dynamic Island Component ---- */
function DynamicIsland() {
  const { notifications, currentEmotion, neuralLinkStrength } = useOSStore();
  const [expanded, setExpanded] = useState(false);

  const handleClick = useCallback(() => {
    setExpanded((prev) => !prev);
    if (!expanded) {
      setTimeout(() => setExpanded(false), 4000);
    }
  }, [expanded]);

  return (
    <div
      className={`dynamic-island ${expanded ? 'dynamic-island--expanded' : ''}`}
      onClick={handleClick}
    >
      {expanded && (
        <motion.div
          className="dynamic-island__content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            width: '100%',
            padding: '8px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left: now playing / status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, hsl(185, 80%, 30%), hsl(270, 80%, 40%))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                boxShadow: '0 0 10px hsla(185, 100%, 55%, 0.3)',
              }}
            >
              ✦
            </div>
            <div>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                ARIA Active
              </div>
              <div style={{ fontSize: '0.5rem', color: 'var(--color-primary)' }}>
                Neural: {neuralLinkStrength}% • {currentEmotion}
              </div>
            </div>
          </div>

          {/* Right: notification count + waveform */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <WaveformBars />
            {notifications.length > 0 && (
              <div
                style={{
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '9px',
                  background: 'var(--color-accent)',
                  color: '#fff',
                  fontSize: '0.5rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 5px',
                  boxShadow: '0 0 8px var(--color-accent-glow)',
                }}
              >
                {notifications.length}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ---- Swipe-enabled Screen Router ---- */
const screenVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 80 : -80,
    scale: 0.97,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -80 : 80,
    scale: 0.97,
  }),
};

function ScreenRouter() {
  const { currentScreen, goBack } = useOSStore();
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const [swipeIndicator, setSwipeIndicator] = useState(false);
  const [direction, setDirection] = useState(1);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;

    // Show edge swipe indicator when touching near left edge
    if (e.touches[0].clientX < 30) {
      setSwipeIndicator(true);
    }
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      setSwipeIndicator(false);
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

      // Only horizontal swipe (not vertical scroll)
      if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        if (deltaX > 0 && currentScreen !== 'home') {
          // Swipe right → go back
          setDirection(-1);
          goBack();
        }
      }
    },
    [currentScreen, goBack]
  );

  const getScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen key="home" />;
      case 'app-drawer':
        return <AppDrawer key="app-drawer" />;
      case 'settings':
        return <Settings key="settings" />;
      case 'aria':
        return <ARIAChat key="aria" />;
      case 'neural-hub':
        return <NeuralHub key="neural-hub" />;
      case 'health-matrix':
        return <HealthMatrix key="health-matrix" />;
      case 'energy-core':
        return <EnergyCore key="energy-core" />;
      case 'messenger':
        return <QuantumMessenger key="messenger" />;
      case 'memory-palace':
        return <MemoryPalace key="memory-palace" />;
      case 'notifications':
        return <NotificationCenter key="notifications" />;
      case 'dim-browser':
        return <DimensionalBrowser key="dim-browser" />;
      default:
        return <HomeScreen key="home-default" />;
    }
  };

  return (
    <div
      style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={(e) => {
        touchStartXRef.current = e.clientX;
        touchStartYRef.current = e.clientY;
        if (e.clientX < 30) setSwipeIndicator(true);
      }}
      onMouseUp={(e) => {
        setSwipeIndicator(false);
        const deltaX = e.clientX - touchStartXRef.current;
        const deltaY = e.clientY - touchStartYRef.current;
        if (Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
          if (deltaX > 0 && currentScreen !== 'home') {
            setDirection(-1);
            goBack();
          }
        }
      }}
    >
      {/* Edge swipe back indicator */}
      <div
        className={`edge-swipe-indicator ${swipeIndicator ? 'edge-swipe-indicator--visible' : ''}`}
      />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScreen}
          custom={direction}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
          onAnimationComplete={() => {
            // Reset direction to forward after animation completes
            setDirection(1);
          }}
        >
          {getScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ---- Main App ---- */
export default function App() {
  const { isLocked } = useOSStore();

  return (
    <>
      {/* Desktop background gradient */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background:
            'radial-gradient(ellipse at 30% 20%, hsla(270, 50%, 15%, 0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsla(185, 50%, 10%, 0.5) 0%, transparent 50%), #030308',
          zIndex: -1,
        }}
      />

      {/* Phone Frame */}
      <div className="phone-frame">
        <div className="phone-frame__inner scanline-overlay">
          {/* Dynamic Island */}
          <DynamicIsland />

          {/* 3D Background */}
          <HolographicBackground />

          {/* UI Content */}
          <div className="phone-frame__content">
            {!isLocked && <StatusBar />}
            {!isLocked && <ScreenRouter />}
            {!isLocked && <NavigationDock />}
            {/* iPhone Home Indicator */}
            {!isLocked && <div className="home-indicator" />}
          </div>

          {/* Lock Screen Overlay */}
          <LockScreen />
        </div>
      </div>

      {/* Desktop label */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.55rem',
          letterSpacing: '5px',
          color: 'hsla(185, 60%, 50%, 0.2)',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        ΩS 2080.1 SINGULARITY
      </div>
    </>
  );
}
