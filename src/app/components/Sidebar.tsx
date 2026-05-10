import {
  LayoutDashboard,
  Package,
  BarChart3,
  Settings
} from 'lucide-react';

type Page = 'dashboard' | 'orders' | 'analytics' | 'settings';

interface NavItem {
  icon: React.ElementType;
  label: string;
  page: Page;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', page: 'dashboard' },
  { icon: Package, label: 'Orders', page: 'orders' },
  { icon: BarChart3, label: 'Analytics', page: 'analytics' },
  { icon: Settings, label: 'Settings', page: 'settings' }
];

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-64 bg-[var(--woolworths-green)] text-white flex flex-col h-full">
      <div className="p-6 border-b border-[var(--woolworths-light-green)]">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white rounded-lg overflow-hidden flex items-center justify-center">
            <img src="/Images/image.png" alt="Woolworths" className="h-full w-full object-cover" />
          </div>
          <div>
            <h2 className="font-semibold">Woolworths</h2>
            <p className="text-xs text-green-100">Online Hub</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;
            return (
              <li key={item.label}>
                <button
                  onClick={() => onNavigate(item.page)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white text-[var(--woolworths-green)] font-medium'
                      : 'text-green-50 hover:bg-[var(--woolworths-light-green)] hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-[var(--woolworths-light-green)]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">SM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Supervisor</p>
            <p className="text-xs text-green-100">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
}
