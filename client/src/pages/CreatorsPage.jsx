import { CreatorsTable } from '../components/dashboard/CreatorsTable';
import { FilterPanel } from '../components/dashboard/FilterPanel';

export function CreatorsPage() {
    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-text-primary tracking-tight">Creators Directory</h1>
                    <p className="text-text-tertiary mt-1">Manage and track all creator partnerships</p>
                </div>
                <button className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm">
                    Add New Creator
                </button>
            </div>

            <FilterPanel />
            <CreatorsTable />
        </div>
    );
}
