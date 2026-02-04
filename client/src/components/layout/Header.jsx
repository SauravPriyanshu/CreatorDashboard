import { Search, Bell, HelpCircle } from 'lucide-react';

export function Header() {
    return (
        <header className="h-14 bg-background border-b border-border/50 px-6 flex items-center justify-between sticky top-0 z-10 w-full backdrop-blur-sm bg-background/80 supports-[backdrop-filter]:bg-background/60">
            <div className="w-96 relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary group-focus-within:text-text-primary transition-colors" size={16} />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-1.5 bg-surface-hover hover:bg-secondary border-none rounded-md focus:outline-none focus:ring-1 focus:ring-border focus:bg-background transition-all text-sm placeholder:text-text-tertiary"
                />
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <button className="p-2 text-text-tertiary hover:text-text-primary hover:bg-surface-hover rounded-md transition-all">
                        <HelpCircle size={18} />
                    </button>
                    <button className="p-2 text-text-tertiary hover:text-text-primary hover:bg-surface-hover rounded-md transition-all relative">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-background"></span>
                    </button>
                </div>

                <div className="h-4 w-[1px] bg-border-subtle"></div>

                <button className="flex items-center gap-2 hover:bg-surface-hover p-1 rounded-md transition-all">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-medium text-indigo-700">
                        AU
                    </div>
                </button>
            </div>
        </header>
    );
}
