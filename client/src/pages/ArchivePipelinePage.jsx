import { useState } from 'react';
import { PipelineList } from '../components/shared/PipelineList';
import { ArchiveList } from '../components/shared/ArchiveList';
import { cn } from '../utils/cn';

export function ArchivePipelinePage() {
    const [activeTab, setActiveTab] = useState('pipeline');

    return (
        <div className="max-w-7xl mx-auto animate-fade-in pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-xl font-semibold text-text-primary tracking-tight">Archive & Pipeline</h1>
                    <p className="text-sm text-text-secondary mt-1">Manage prospective leads and historical creator records.</p>
                </div>

                <div className="flex gap-1 bg-surface p-1 rounded-lg border border-border-subtle w-fit">
                    <button
                        onClick={() => setActiveTab('pipeline')}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            activeTab === 'pipeline'
                                ? "bg-white text-text-primary shadow-sm ring-1 ring-border-subtle"
                                : "text-text-tertiary hover:text-text-secondary hover:bg-surface-hover"
                        )}
                    >
                        Pipeline
                    </button>
                    <button
                        onClick={() => setActiveTab('archive')}
                        className={cn(
                            "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                            activeTab === 'archive'
                                ? "bg-white text-text-primary shadow-sm ring-1 ring-border-subtle"
                                : "text-text-tertiary hover:text-text-secondary hover:bg-surface-hover"
                        )}
                    >
                        Archive
                    </button>
                </div>
            </div>

            {activeTab === 'pipeline' ? <PipelineList /> : <ArchiveList />}
        </div>
    );
}
