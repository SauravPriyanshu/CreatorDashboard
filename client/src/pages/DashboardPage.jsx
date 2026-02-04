import { useState } from 'react';
import { KPICards } from '../components/dashboard/KPICards';
import { FilterPanel } from '../components/dashboard/FilterPanel';
import { CreatorsTable } from '../components/dashboard/CreatorsTable';
import { AddCreatorModal } from '../components/dashboard/AddCreatorModal';
import { useCreators } from '../context/CreatorsContext';

export function DashboardPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { addCreator } = useCreators();

    const handleSaveCreator = (data) => {
        addCreator(data);
        setIsAddModalOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-text-primary tracking-tight">Dashboard</h1>
                    <p className="text-sm text-text-secondary mt-1">Overview of creator performance and contracts.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm flex items-center gap-1.5"
                >
                    <span>+</span> Add Creator
                </button>
            </div>

            <KPICards />
            <FilterPanel />
            <CreatorsTable />

            <AddCreatorModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleSaveCreator}
            />
        </div>
    );
}
