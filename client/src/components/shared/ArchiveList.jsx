import { useNavigate } from 'react-router-dom';
import { RotateCcw } from 'lucide-react';
import { useCreators } from '../../context/CreatorsContext';

export function ArchiveList() {
    const { archivedCreators, updateCreator } = useCreators();
    const navigate = useNavigate();

    const handleRestore = (e, id) => {
        e.stopPropagation();
        if (confirm('Restore this creator to active status?')) {
            updateCreator(id, { status: 'active' });
        }
    };

    if (archivedCreators.length === 0) {
        return (
            <div className="bg-white border border-border-subtle rounded-lg p-12 text-center">
                <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center mx-auto mb-3 text-text-tertiary">
                    <RotateCcw size={20} />
                </div>
                <h3 className="text-sm font-medium text-text-primary">No archived creators</h3>
                <p className="text-text-secondary text-xs max-w-sm mx-auto mt-1">Creators moved to archive will appear here for historical reference.</p>
            </div>
        );
    }

    return (
        <div className="bg-white border border-border-subtle rounded-lg shadow-xs overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-surface border-b border-border-subtle">
                    <tr>
                        <th className="py-3 px-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Creator</th>
                        <th className="py-3 px-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Archive Date</th>
                        <th className="py-3 px-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Reason</th>
                        <th className="py-3 px-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                    {archivedCreators.map(creator => (
                        <tr
                            key={creator.id}
                            className="hover:bg-surface-hover transition-colors opacity-75 hover:opacity-100 cursor-pointer"
                            onClick={() => navigate(`/creator/${creator.id}`)}
                        >
                            <td className="py-3 px-6">
                                <div className="flex items-center gap-3">
                                    <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-full grayscale border border-border-subtle" />
                                    <div>
                                        <p className="font-medium text-text-primary text-sm">{creator.name}</p>
                                        <p className="text-xs text-text-tertiary">{creator.username}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-3 px-6 text-sm text-text-secondary">
                                Feb 03, 2026
                            </td>
                            <td className="py-3 px-6 text-sm text-text-secondary">
                                Contract Completed
                            </td>
                            <td className="py-3 px-6 text-right">
                                <button
                                    onClick={(e) => handleRestore(e, creator.id)}
                                    className="text-accent-DEFAULT text-xs font-medium hover:underline flex items-center gap-1 justify-end ml-auto"
                                >
                                    <RotateCcw size={12} /> Restore
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
