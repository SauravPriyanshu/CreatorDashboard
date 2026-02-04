import { Outlet } from 'react-router-dom';

import { Header } from './Header';

export function Layout() {
    return (
        <div className="flex min-h-screen bg-background text-text-primary font-sans">

            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 p-6 overflow-auto bg-background">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
