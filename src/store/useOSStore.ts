import { create } from 'zustand';

export interface Notification {
  id: string;
  app: string;
  icon: string;
  title: string;
  text: string;
  time: string;
  color: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'aria' | 'contact';
  text: string;
  time: string;
  type: 'text' | 'thought' | 'emotion';
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'neural-linked' | 'dreaming' | 'offline';
  lastMessage: string;
  time: string;
  unread: number;
}

interface OSState {
  // System
  isLocked: boolean;
  currentScreen: string;
  previousScreen: string | null;
  theme: 'quantum-aurora';

  // Neural
  neuralLinkStrength: number;
  currentEmotion: string;
  cognitiveMetrics: {
    memory: number;
    focus: number;
    creativity: number;
    empathy: number;
  };

  // Notifications
  notifications: Notification[];

  // ARIA
  ariaMessages: Message[];
  ariaMood: string;

  // Messenger
  contacts: Contact[];
  activeChat: string | null;

  // Settings
  holoIntensity: number;
  particleDensity: number;
  quantumEncryption: boolean;
  neuralSensitivity: number;

  // Health
  healthMetrics: {
    heartRate: number;
    neuralActivity: number;
    quantumCoherence: number;
    nanobotStatus: number;
    emotionBalance: number;
  };

  // Actions
  unlock: () => void;
  lock: () => void;
  navigateTo: (screen: string) => void;
  goBack: () => void;
  addARIAMessage: (msg: Message) => void;
  setActiveChat: (id: string | null) => void;
  toggleQuantumEncryption: () => void;
  setHoloIntensity: (val: number) => void;
  dismissNotification: (id: string) => void;
}

const demoNotifications: Notification[] = [
  {
    id: 'n1',
    app: 'ARIA',
    icon: '🤖',
    title: 'Quantum Anomaly Detected',
    text: 'Your neural patterns show elevated creativity. Shall I optimize?',
    time: '2m ago',
    color: 'hsl(185, 100%, 55%)',
  },
  {
    id: 'n2',
    app: 'Health Matrix',
    icon: '❤️',
    title: 'Biometric Update',
    text: 'All nanobots operating at optimal efficiency. Health score: 98.7%',
    time: '15m ago',
    color: 'hsl(150, 100%, 50%)',
  },
  {
    id: 'n3',
    app: 'Quantum Msg',
    icon: '💬',
    title: 'Nova Chen',
    text: 'Just shared a memory fragment from the Mars colony! 🔴',
    time: '1h ago',
    color: 'hsl(270, 100%, 65%)',
  },
  {
    id: 'n4',
    app: 'Time Stream',
    icon: '⏰',
    title: 'Temporal Alert',
    text: 'Your future self left a message tagged for today',
    time: '3h ago',
    color: 'hsl(330, 100%, 65%)',
  },
];

const demoContacts: Contact[] = [
  { id: 'c1', name: 'Nova Chen', avatar: '👩‍🚀', status: 'neural-linked', lastMessage: 'The mars sunset was incredible...', time: '14:23', unread: 2 },
  { id: 'c2', name: 'Kai Nexus', avatar: '🧑‍💻', status: 'online', lastMessage: 'Quantum code compiled! Check the sim.', time: '13:45', unread: 0 },
  { id: 'c3', name: 'Luna Drift', avatar: '🧝‍♀️', status: 'dreaming', lastMessage: 'Dream-sharing session tonight?', time: '12:10', unread: 1 },
  { id: 'c4', name: 'Orion Vex', avatar: '🤖', status: 'online', lastMessage: 'New holo-art piece finished', time: '11:30', unread: 0 },
  { id: 'c5', name: 'Zara Quantum', avatar: '👩‍🔬', status: 'neural-linked', lastMessage: 'Found a new dimension pocket!', time: '09:15', unread: 3 },
  { id: 'c6', name: 'Atlas Prime', avatar: '🦾', status: 'offline', lastMessage: 'Upgrading my neural implant v7', time: 'Yesterday', unread: 0 },
];

const demoARIAMessages: Message[] = [
  { id: 'a1', sender: 'aria', text: 'Good cycle, Human. Your neural patterns indicate high focus today. I\'ve optimized your cognitive pathways accordingly.', time: '08:00', type: 'text' },
  { id: 'a2', sender: 'user', text: 'Thanks ARIA. What\'s on my schedule?', time: '08:01', type: 'text' },
  { id: 'a3', sender: 'aria', text: 'You have a hive-mind meeting at Cycle 10, a quantum simulation at Cycle 14, and Nova Chen wants to share a Mars memory at Cycle 18. Shall I prepare your consciousness?', time: '08:01', type: 'text' },
  { id: 'a4', sender: 'user', text: 'Prepare for the meeting. Also run a health scan.', time: '08:02', type: 'thought' },
  { id: 'a5', sender: 'aria', text: '✅ Meeting prep initiated. Downloading context to your prefrontal cortex.\n\n🏥 Health scan complete:\n• Heart: 62 bpm (optimal)\n• Neural coherence: 97.3%\n• Nanobots: All 12 million active\n• Quantum state: Entangled & stable', time: '08:02', type: 'text' },
];

export const useOSStore = create<OSState>((set) => ({
  // System
  isLocked: true,
  currentScreen: 'home',
  previousScreen: null,
  theme: 'quantum-aurora',

  // Neural
  neuralLinkStrength: 97,
  currentEmotion: 'focused',
  cognitiveMetrics: {
    memory: 94,
    focus: 97,
    creativity: 82,
    empathy: 88,
  },

  // Notifications
  notifications: demoNotifications,

  // ARIA
  ariaMessages: demoARIAMessages,
  ariaMood: 'helpful',

  // Messenger
  contacts: demoContacts,
  activeChat: null,

  // Settings
  holoIntensity: 75,
  particleDensity: 60,
  quantumEncryption: true,
  neuralSensitivity: 80,

  // Health
  healthMetrics: {
    heartRate: 62,
    neuralActivity: 97,
    quantumCoherence: 99,
    nanobotStatus: 100,
    emotionBalance: 88,
  },

  // Actions
  unlock: () => set({ isLocked: false }),
  lock: () => set({ isLocked: true }),
  navigateTo: (screen) =>
    set((state) => ({
      currentScreen: screen,
      previousScreen: state.currentScreen,
    })),
  goBack: () =>
    set((state) => ({
      currentScreen: state.previousScreen || 'home',
      previousScreen: null,
    })),
  addARIAMessage: (msg) =>
    set((state) => ({
      ariaMessages: [...state.ariaMessages, msg],
    })),
  setActiveChat: (id) => set({ activeChat: id }),
  toggleQuantumEncryption: () =>
    set((state) => ({ quantumEncryption: !state.quantumEncryption })),
  setHoloIntensity: (val) => set({ holoIntensity: val }),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
