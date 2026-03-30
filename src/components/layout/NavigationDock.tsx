import { useOSStore } from '../../store/useOSStore';

const NAV_ITEMS = [
  { id: 'home', icon: '⬡', label: 'Home' },
  { id: 'neural-hub', icon: '🧠', label: 'Neural' },
  { id: 'aria', icon: '✦', label: 'ARIA' },
  { id: 'apps', icon: '⊞', label: 'Apps' },
];

export default function NavigationDock() {
  const { currentScreen, navigateTo } = useOSStore();

  return (
    <div className="nav-dock">
      <div className="nav-dock__bar">
        {NAV_ITEMS.map((item) => {
          const isActive =
            currentScreen === item.id ||
            (item.id === 'apps' && currentScreen === 'app-drawer');

          return (
            <button
              key={item.id}
              className={`nav-dock__item ${isActive ? 'nav-dock__item--active' : ''}`}
              onClick={() =>
                navigateTo(item.id === 'apps' ? 'app-drawer' : item.id)
              }
              aria-label={item.label}
            >
              <span className="nav-dock__icon">{item.icon}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
