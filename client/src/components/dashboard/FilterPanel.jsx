import { useState } from 'react';
import { Filter, Users, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useCreators } from '../../context/CreatorsContext';

export function FilterPanel() {
    const { filters, setFilters } = useCreators();
    const [isOpen, setIsOpen] = useState(false);

    // Initial Options (in real app, these could be derived from data)
    const options = {
        status: ['Active', 'Paused', 'Completed'],
        country: ['US', 'UK', 'Australia'],
        language: ['English', 'Spanish'],
        platformCommitment: ['Tiktok', 'Tiktok+IG', 'Tiktok+YT', 'Tiktok+IG+YT', 'Tiktok+IG+FB+YT'],
        courses: ['UI/UX Design', 'Cooking Basics', 'Spanish 101'],
        contentTags: [
            'Wrong saying', 'Custom AI', 'Whiteboard', 'Story time', 'Relatable', 'Carousel'
            // Add full list if needed or derive from creators
        ]
    };

    const handleMultiSelect = (category, value) => {
        setFilters(prev => {
            const current = prev[category];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

    const clearFilters = () => {
        setFilters({
            search: filters.search, // Keep search
            status: [],
            platformCommitment: [],
            country: [],
            language: [],
            course: [],
            contentTags: [],
            minViews: '',
            maxViews: '',
            dateStart: '',
            dateEnd: '',
            email: ''
        });
    };

    const activeFilterCount = Object.keys(filters).reduce((acc, key) => {
        if (key === 'search') return acc;
        if (Array.isArray(filters[key])) return acc + filters[key].length;
        if (filters[key]) return acc + 1;
        return acc;
    }, 0);

    return (
        <div className="bg-white border border-border-subtle rounded-lg shadow-sm mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-hover/50 transition-colors"
            >
                <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
                    <Filter size={16} className="text-text-tertiary" />
                    <span>Advanced Filters</span>
                    {activeFilterCount > 0 && (
                        <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">
                            {activeFilterCount} Active
                        </span>
                    )}
                </div>
                {isOpen ? <ChevronUp size={16} className="text-text-tertiary" /> : <ChevronDown size={16} className="text-text-tertiary" />}
            </button>

            {isOpen && (
                <div className="p-4 border-t border-border-subtle grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">

                    {/* 1. Tags & Categories */}
                    <div className="space-y-4 lg:col-span-1">
                        <label className="text-xs font-semibold text-text-tertiary uppercase">Tags & Status</label>

                        {/* Status */}
                        <div className="space-y-1">
                            <p className="text-xs text-text-secondary font-medium">Status</p>
                            <div className="flex flex-wrap gap-1.5">
                                {options.status.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleMultiSelect('status', opt)}
                                        className={`text-[10px] px-2 py-1 rounded border transition-all ${filters.status.includes(opt)
                                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-medium'
                                                : 'bg-surface border-border-subtle text-text-secondary hover:border-border-secondary'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Language */}
                        <div className="space-y-1">
                            <p className="text-xs text-text-secondary font-medium">Language</p>
                            <div className="flex flex-wrap gap-1.5">
                                {options.language.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => handleMultiSelect('language', opt)}
                                        className={`text-[10px] px-2 py-1 rounded border transition-all ${filters.language.includes(opt)
                                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-medium'
                                                : 'bg-surface border-border-subtle text-text-secondary hover:border-border-secondary'
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. Platform & Content */}
                    <div className="space-y-4 lg:col-span-1">
                        <label className="text-xs font-semibold text-text-tertiary uppercase">Platform & Content</label>

                        {/* Commitment */}
                        <div className="space-y-1">
                            <p className="text-xs text-text-secondary font-medium">Platform Commitment</p>
                            <select
                                className="w-full text-xs bg-surface border border-border-subtle rounded p-1.5 outline-none focus:border-indigo-500"
                                onChange={(e) => {
                                    if (e.target.value) handleMultiSelect('platformCommitment', e.target.value)
                                }}
                                value=""
                            >
                                <option value="">Select commitment...</option>
                                {options.platformCommitment.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {filters.platformCommitment.map(val => (
                                    <span key={val} className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                                        {val} <X size={10} className="cursor-pointer" onClick={() => handleMultiSelect('platformCommitment', val)} />
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content Tags */}
                        <div className="space-y-1">
                            <p className="text-xs text-text-secondary font-medium">Content Tags</p>
                            <select
                                className="w-full text-xs bg-surface border border-border-subtle rounded p-1.5 outline-none focus:border-indigo-500"
                                onChange={(e) => {
                                    if (e.target.value) handleMultiSelect('contentTags', e.target.value)
                                }}
                                value=""
                            >
                                <option value="">Select tags...</option>
                                {options.contentTags.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {filters.contentTags.map(val => (
                                    <span key={val} className="text-[10px] bg-amber-50 border border-amber-100 text-amber-700 px-1.5 py-0.5 rounded flex items-center gap-1">
                                        {val} <X size={10} className="cursor-pointer" onClick={() => handleMultiSelect('contentTags', val)} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Performance (Views) */}
                    <div className="space-y-4 lg:col-span-1">
                        <label className="text-xs font-semibold text-text-tertiary uppercase">Performance (Views)</label>
                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <p className="text-xs text-text-secondary mb-1">Min Views</p>
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={filters.minViews}
                                    onChange={(e) => setFilters(prev => ({ ...prev, minViews: e.target.value }))}
                                    className="w-full text-xs bg-surface border border-border-subtle rounded p-1.5 outline-none focus:border-indigo-500"
                                />
                            </div>
                            <span className="mt-4 text-text-tertiary">-</span>
                            <div className="flex-1">
                                <p className="text-xs text-text-secondary mb-1">Max Views</p>
                                <input
                                    type="number"
                                    placeholder="Unlimited"
                                    value={filters.maxViews}
                                    onChange={(e) => setFilters(prev => ({ ...prev, maxViews: e.target.value }))}
                                    className="w-full text-xs bg-surface border border-border-subtle rounded p-1.5 outline-none focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4. Date & Email */}
                    <div className="space-y-4 lg:col-span-1">
                        <label className="text-xs font-semibold text-text-tertiary uppercase">Date & Contact</label>

                        {/* Date Range */}
                        <div className="space-y-1">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <p className="text-xs text-text-secondary mb-1">Contract Start</p>
                                    <input
                                        type="date"
                                        value={filters.dateStart}
                                        onChange={(e) => setFilters(prev => ({ ...prev, dateStart: e.target.value }))}
                                        className="w-full text-xs bg-surface border border-border-subtle rounded p-1.5 outline-none focus:border-indigo-500"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-text-secondary mb-1">End</p>
                                    <input
                                        type="date"
                                        value={filters.dateEnd}
                                        onChange={(e) => setFilters(prev => ({ ...prev, dateEnd: e.target.value }))}
                                        className="w-full text-xs bg-surface border border-border-subtle rounded p-1.5 outline-none focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <p className="text-xs text-text-secondary font-medium">Email / ID</p>
                            <input
                                type="text"
                                placeholder="Search by email..."
                                value={filters.email}
                                onChange={(e) => setFilters(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full text-xs bg-surface border border-border-subtle rounded p-1.5 outline-none focus:border-indigo-500"
                            />
                        </div>

                        <button
                            onClick={clearFilters}
                            className="w-full mt-2 text-xs text-center text-text-tertiary hover:text-red-500 hover:underline transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
