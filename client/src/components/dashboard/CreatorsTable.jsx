import { useNavigate, Link } from 'react-router-dom';
import { MoreHorizontal, ExternalLink, Video } from 'lucide-react';
import { useCreators } from '../../context/CreatorsContext';
import { cn } from '../../utils/cn';
import { PlatformIcon } from '../shared/PlatformIcon';



export function CreatorsTable() {
    const { filteredCreators } = useCreators();
    const navigate = useNavigate();

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'paused': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'top_performer': return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-1 ring-emerald-200';
            case 'underperforming': return 'bg-red-50 text-red-700 border-red-100';
            case 'archived': return 'bg-slate-50 text-slate-600 border-slate-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const getStatusLabel = (status) => {
        if (!status) return 'Unknown';
        return status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    };



    return (
        <div className="bg-white border border-border-subtle rounded-lg shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface border-b border-border-subtle">
                            <th className="py-3 px-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Creator</th>
                            <th className="py-3 px-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Status</th>
                            <th className="py-3 px-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Platforms</th>
                            <th className="py-3 px-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Country/Lang</th>
                            <th className="py-3 px-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider text-center">Videos Posted</th>
                            <th className="py-3 px-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider">Payment</th>
                            <th className="py-3 px-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-sm">
                        {filteredCreators.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="py-12 text-center text-text-tertiary">No creators found matching your filters.</td>
                            </tr>
                        ) : (
                            filteredCreators.map((creator) => (
                                <tr
                                    key={creator.id}
                                    onClick={() => navigate(`/creator/${creator.id}`)}
                                    className="hover:bg-surface-hover transition-colors group cursor-pointer"
                                >
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            {creator.avatar ? (
                                                <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-full object-cover border border-border-subtle" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100 shadow-sm shrink-0">
                                                    {creator.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-text-primary group-hover:text-indigo-600 transition-colors">{creator.name}</p>
                                                <p className="text-xs text-text-tertiary">{creator.username}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={cn("px-2 py-0.5 rounded text-[11px] font-medium border", getStatusColor(creator.status))}>
                                            {getStatusLabel(creator.status)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-1.5">
                                            {creator.platforms.map(p => (
                                                <PlatformIcon key={p} platform={p} size={12} className="shrink-0" />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="text-sm text-text-secondary">{creator.country}</div>
                                        <div className="text-xs text-text-tertiary">{creator.language}</div>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="inline-flex items-center gap-1.5">
                                            <span className="font-medium text-text-primary">{creator.commitment.postedThisMonth}</span>
                                            <span className="text-text-tertiary text-xs">/ {creator.commitment.videosPerMonth}</span>
                                        </div>
                                        <div className="w-16 h-1 bg-border-subtle rounded-full mt-1.5 mx-auto overflow-hidden">
                                            <div
                                                className="h-full bg-accent-DEFAULT rounded-full"
                                                style={{ width: `${Math.min(100, (creator.commitment.postedThisMonth / creator.commitment.videosPerMonth) * 100)}%` }}
                                            />
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className={cn(
                                            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-colors",
                                            creator.payment.status === 'pending'
                                                ? "text-amber-700 bg-amber-50"
                                                : "text-emerald-700 bg-emerald-50"
                                        )}>
                                            {creator.payment.status === 'pending' ? 'Pending' : 'Paid'}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-right">
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-text-tertiary hover:text-text-primary p-1.5 rounded hover:bg-surface-hover transition-colors"
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="bg-surface px-4 py-3 border-t border-border-subtle flex items-center justify-between">
                <p className="text-xs text-text-tertiary">Showing <span className="font-medium text-text-primary">{filteredCreators.length}</span> creators</p>
                <div className="flex gap-2">
                    <button className="px-2.5 py-1 text-xs bg-white border border-border rounded text-text-secondary hover:bg-surface-hover disabled:opacity-50 transition-colors">Previous</button>
                    <button className="px-2.5 py-1 text-xs bg-white border border-border rounded text-text-secondary hover:bg-surface-hover disabled:opacity-50 transition-colors">Next</button>
                </div>
            </div>
        </div>
    );
}
