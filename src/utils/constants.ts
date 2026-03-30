// App definitions for the OS
export interface AppDef {
  id: string;
  name: string;
  icon: string;
  screen: string;
  gradient: string;
  category: 'neural' | 'quantum' | 'social' | 'utility' | 'creative' | 'health';
}

export const APPS: AppDef[] = [
  { id: 'neural-hub', name: 'Neural Hub', icon: '🧠', screen: 'neural-hub', gradient: 'linear-gradient(135deg, hsl(270, 60%, 20%), hsl(270, 80%, 35%))', category: 'neural' },
  { id: 'aria', name: 'ARIA', icon: '🤖', screen: 'aria', gradient: 'linear-gradient(135deg, hsl(185, 60%, 15%), hsl(185, 80%, 30%))', category: 'neural' },
  { id: 'quantum-msg', name: 'Quantum Msg', icon: '💬', screen: 'messenger', gradient: 'linear-gradient(135deg, hsl(210, 60%, 18%), hsl(210, 80%, 35%))', category: 'social' },
  { id: 'memory-palace', name: 'Memory Palace', icon: '🏛️', screen: 'memory-palace', gradient: 'linear-gradient(135deg, hsl(40, 50%, 15%), hsl(40, 70%, 30%))', category: 'neural' },
  { id: 'dim-browser', name: 'DimBrowser', icon: '🌐', screen: 'dim-browser', gradient: 'linear-gradient(135deg, hsl(200, 60%, 15%), hsl(200, 80%, 30%))', category: 'utility' },
  { id: 'health-matrix', name: 'Health Matrix', icon: '❤️', screen: 'health-matrix', gradient: 'linear-gradient(135deg, hsl(340, 60%, 18%), hsl(340, 80%, 35%))', category: 'health' },
  { id: 'energy-core', name: 'Energy Core', icon: '⚡', screen: 'energy-core', gradient: 'linear-gradient(135deg, hsl(50, 60%, 15%), hsl(50, 80%, 30%))', category: 'utility' },
  { id: 'holo-camera', name: 'Holo Camera', icon: '📸', screen: 'home', gradient: 'linear-gradient(135deg, hsl(160, 60%, 15%), hsl(160, 80%, 30%))', category: 'creative' },
  { id: 'quantum-music', name: 'Quantum Music', icon: '🎵', screen: 'home', gradient: 'linear-gradient(135deg, hsl(300, 60%, 18%), hsl(300, 80%, 35%))', category: 'creative' },
  { id: 'dream-recorder', name: 'Dream Rec', icon: '🌙', screen: 'home', gradient: 'linear-gradient(135deg, hsl(240, 50%, 15%), hsl(240, 70%, 30%))', category: 'neural' },
  { id: 'teleport', name: 'Teleport', icon: '🚀', screen: 'home', gradient: 'linear-gradient(135deg, hsl(15, 60%, 18%), hsl(15, 80%, 35%))', category: 'utility' },
  { id: 'time-stream', name: 'Time Stream', icon: '⏰', screen: 'home', gradient: 'linear-gradient(135deg, hsl(280, 50%, 18%), hsl(280, 70%, 35%))', category: 'social' },
  { id: 'nano-forge', name: 'Nano Forge', icon: '🔧', screen: 'home', gradient: 'linear-gradient(135deg, hsl(170, 50%, 15%), hsl(170, 70%, 28%))', category: 'utility' },
  { id: 'void-wallet', name: 'Void Wallet', icon: '💎', screen: 'home', gradient: 'linear-gradient(135deg, hsl(220, 50%, 15%), hsl(220, 70%, 30%))', category: 'utility' },
  { id: 'star-map', name: 'Star Map', icon: '⭐', screen: 'home', gradient: 'linear-gradient(135deg, hsl(45, 60%, 15%), hsl(45, 80%, 30%))', category: 'utility' },
  { id: 'gene-editor', name: 'Gene Editor', icon: '🧬', screen: 'home', gradient: 'linear-gradient(135deg, hsl(120, 50%, 15%), hsl(120, 70%, 28%))', category: 'health' },
  { id: 'holo-studio', name: 'Holo Studio', icon: '🎨', screen: 'home', gradient: 'linear-gradient(135deg, hsl(330, 60%, 18%), hsl(330, 80%, 35%))', category: 'creative' },
  { id: 'quantum-games', name: 'Q-Games', icon: '🎮', screen: 'home', gradient: 'linear-gradient(135deg, hsl(260, 60%, 18%), hsl(260, 80%, 35%))', category: 'creative' },
  { id: 'mindscape', name: 'Mindscape', icon: '🧘', screen: 'home', gradient: 'linear-gradient(135deg, hsl(180, 40%, 15%), hsl(180, 60%, 28%))', category: 'health' },
  { id: 'synth-kitchen', name: 'Synth Kitchen', icon: '🍳', screen: 'home', gradient: 'linear-gradient(135deg, hsl(30, 60%, 15%), hsl(30, 80%, 30%))', category: 'utility' },
  { id: 'academy', name: 'Academy', icon: '📚', screen: 'home', gradient: 'linear-gradient(135deg, hsl(200, 50%, 15%), hsl(200, 70%, 28%))', category: 'neural' },
  { id: 'social-hive', name: 'Social Hive', icon: '👥', screen: 'home', gradient: 'linear-gradient(135deg, hsl(290, 50%, 18%), hsl(290, 70%, 35%))', category: 'social' },
  { id: 'warp-call', name: 'Warp Call', icon: '📞', screen: 'home', gradient: 'linear-gradient(135deg, hsl(150, 60%, 15%), hsl(150, 80%, 30%))', category: 'social' },
  { id: 'settings', name: 'Settings', icon: '⚙️', screen: 'settings', gradient: 'linear-gradient(135deg, hsl(220, 30%, 15%), hsl(220, 40%, 25%))', category: 'utility' },
];

// Time formatting for the futuristic OS
export const formatNeuralTime = (date: Date): string => {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const formatNeuralDate = (date: Date): string => {
  const months = ['Quantum', 'Nebula', 'Stellar', 'Plasma', 'Photon', 'Neutron', 'Quasar', 'Pulsar', 'Nova', 'Cosmic', 'Void', 'Zenith'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  return `${day} ${month} 2080`;
};

export const EMOTIONS = ['focused', 'calm', 'excited', 'creative', 'contemplative', 'joyful', 'determined', 'serene'];
