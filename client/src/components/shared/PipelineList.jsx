import { Mail, ArrowRight, UserPlus } from 'lucide-react';
import { useCreators } from '../../context/CreatorsContext';

export function PipelineList() {
    const { pipeline } = useCreators();

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-text-primary">Pipeline & Outreach</h2>
                <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-md transition-colors shadow-sm text-sm font-medium">
                    <UserPlus size={16} /> Add Lead
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pipeline.map(lead => (
                    <div key={lead.id} className="bg-white border border-border-subtle rounded-lg p-5 shadow-xs hover:border-border transition-all group">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-semibold text-text-primary text-base">{lead.name}</h3>
                                <p className="text-xs text-text-tertiary mt-0.5">{lead.platform}</p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-1.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${lead.stage === 'contacted' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                                    {lead.stage}
                                </span>
                                <span className="text-[10px] text-text-tertiary">Step {lead.stage === 'contacted' ? 2 : 1} of 4</span>
                            </div>
                            <div className="w-full h-1.5 bg-border-subtle rounded-full overflow-hidden flex gap-px">
                                <div className={`h-full flex-1 rounded-l-full ${lead.stage === 'lead' || lead.stage === 'contacted' ? 'bg-indigo-500' : 'bg-border'}`}></div>
                                <div className={`h-full flex-1 ${lead.stage === 'contacted' ? 'bg-indigo-500' : 'bg-border-subtle'}`}></div>
                                <div className="h-full flex-1 bg-border-subtle"></div>
                                <div className="h-full flex-1 bg-border-subtle rounded-r-full"></div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-text-secondary mb-4 bg-surface p-2 rounded border border-border-subtle">
                            <Mail size={12} className="text-text-tertiary" />
                            {lead.email}
                        </div>

                        <div className="flex justify-end pt-3 border-t border-border-subtle">
                            <button className="text-accent-DEFAULT text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity hover:underline">
                                View Details <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State / Add New Placeholder */}
                <button className="border-2 border-dashed border-border-subtle rounded-lg p-6 flex flex-col items-center justify-center text-text-tertiary hover:border-accent-DEFAULT hover:text-accent-DEFAULT hover:bg-surface transition-all group">
                    <UserPlus size={24} className="mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium text-sm">Add New Lead</span>
                </button>
            </div>
        </div>
    );
}
