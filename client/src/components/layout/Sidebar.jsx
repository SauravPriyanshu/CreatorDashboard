import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Archive, CreditCard, BarChart2, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        // Creators link removed as it's redundant with Dashboard (which has the list)
        { icon: Archive, label: 'Archive', path: '/archive' },
        { icon: CreditCard, label: 'Payments', path: '/payments' },
        { icon: BarChart2, label: 'Analytics', path: '/analytics' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside
            className={cn(
                "h-screen sticky top-0 left-0 bg-background-subtle border-r border-border-subtle flex flex-col transition-all duration-300 z-20",
                collapsed ? "w-16" : "w-60"
            )}
        >
            <div className="h-14 flex items-center justify-between px-3 mb-2">
                {!collapsed && (
                    <div className="flex items-center gap-2 px-2">
                        <div className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center font-bold text-xs">C</div>
                        <span className="font-semibold text-sm text-text-primary tracking-tight">CreatorOps</span>
                    </div>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded hover:bg-surface-hover text-text-tertiary hover:text-text-secondary transition-colors"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            <nav className="flex-1 px-2 space-y-0.5">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-3 py-2 rounded-r-md transition-all duration-200 group relative text-sm border-l-[3px]",
                            isActive
                                ? "border-primary bg-primary/5 text-primary font-medium"
                                : "border-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                        )}
                    >
                        <item.icon size={18} className="shrink-0 transition-colors opacity-70 group-hover:opacity-100" />
                        {!collapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
                        {collapsed && (
                            <div className="absolute left-12 bg-primary text-white text-[10px] px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                                {item.label}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-3 mt-auto">
                <div className={cn("flex items-center gap-3 rounded-md p-1 hover:bg-surface-hover transition-colors cursor-pointer", collapsed ? "justify-center" : "")}>
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600 shrink-0">
                        A
                    </div>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium text-text-primary truncate">Admin User</p>
                            <p className="text-[11px] text-text-tertiary truncate">admin@creatorops.com</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
