import { useState } from 'react';

export function PerformanceMetrics({ creator }) {
    const [metrics, setMetrics] = useState([
        { id: 1, platform: 'Instagram', postDate: '2025-02-01', views: '45.2K', likes: '2.1K', comments: 145, shares: 890, status: 'average', lastUpdated: '2026-02-04 10:30 AM' },
        { id: 2, platform: 'TikTok', postDate: '2025-01-28', views: '120.5K', likes: '15K', comments: 420, shares: 3200, status: 'top', lastUpdated: '2026-02-04 10:30 AM' },
        { id: 3, platform: 'Instagram', postDate: '2025-01-25', views: '12.1K', likes: '450', comments: 22, shares: 45, status: 'underperforming', lastUpdated: '2026-02-03 04:15 PM' },
        { id: 4, platform: 'YouTube', postDate: '2025-01-20', views: '8.5K', likes: '320', comments: 85, shares: 120, status: 'average', lastUpdated: '2026-02-04 09:00 AM' },
        { id: 5, platform: 'Facebook', postDate: '2025-01-18', views: '5.2K', likes: '120', comments: 45, shares: 12, status: 'underperforming', lastUpdated: '2026-02-02 11:00 AM' },
    ]);

    // Helper to parse "1.2K", "1M" etc into numbers
    const parseMetricValue = (val) => {
        if (typeof val === 'number') return val;
        if (!val) return 0;
        const str = val.toString().toUpperCase().replace(/,/g, '');
        if (str.includes('K')) return parseFloat(str) * 1000;
        if (str.includes('M')) return parseFloat(str) * 1000000;
        return parseFloat(str) || 0;
    };

    const calculateEngagement = (views, likes, comments, shares) => {
        const v = parseMetricValue(views);
        const l = parseMetricValue(likes);
        const c = parseMetricValue(comments);
        const s = parseMetricValue(shares);

        if (v === 0) return '0.0%';
        const rate = ((l + c + s) / v) * 100;
        return rate.toFixed(2) + '%';
    };

    // Filter metrics to only show platforms this creator actually has (if we were using global store, but here we use local state + filter?)
    // Actually, local state should probably just be filtered by the *user's* platforms if we were fetching. 
    // Since we are mocking, we'll just show all `metrics` that match generic logic or just all of them for now?
    // The previous logic filtered `rawMetrics` by `creator.platforms`. We should keep that logic but apply it to `metrics`.

    // However, if we Add a video, we want to see it. 
    // Let's filter `metrics` by creator platforms for display.
    const displayedMetrics = creator
        ? metrics.filter(m => creator.platforms.some(p => p.toLowerCase() === m.platform.toLowerCase()))
        : metrics;

    const getStatusBadge = (status) => {
        switch (status) {
            case 'top': return <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100 font-medium whitespace-nowrap">Top Performer</span>;
            case 'underperforming': return <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-100 font-medium whitespace-nowrap">Underperforming</span>;
            default: return <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100 font-medium whitespace-nowrap">Average</span>;
        }
    };

    const getRowClass = (status) => {
        switch (status) {
            case 'top': return 'bg-emerald-50/60 hover:bg-emerald-50';
            case 'underperforming': return 'bg-red-50/60 hover:bg-red-50';
            default: return 'hover:bg-surface-hover';
        }
    };

    return (
        <div className="bg-white border border-border-subtle rounded-lg shadow-xs overflow-hidden mb-8">
            <div className="px-5 py-4 border-b border-border-subtle bg-white sticky top-0 z-10">
                <h3 className="text-base font-semibold text-text-primary">Video Performance</h3>
            </div>

            <div className="overflow-x-auto max-h-[400px]">
                <table className="w-full text-left relative border-collapse min-w-[800px]">
                    <thead className="bg-surface border-b border-border-subtle sticky top-0 z-10 shadow-sm">
                        <tr>
                            <th className="py-2.5 px-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider bg-surface whitespace-nowrap">Post Date</th>
                            <th className="py-2.5 px-4 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider bg-surface w-full">Platform</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                        {displayedMetrics.map(video => (
                            <tr key={video.id} className={`transition-colors border-b border-border-subtle last:border-0 hover:bg-surface-hover`}>
                                <td className="py-2.5 px-4 text-sm text-text-secondary whitespace-nowrap">{video.postDate}</td>
                                <td className="py-2.5 px-4 text-sm text-text-primary font-medium capitalize">{video.platform}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
