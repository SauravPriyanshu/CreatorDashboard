import { Users, FileCheck, DollarSign, Video } from 'lucide-react';
import { useCreators } from '../../context/CreatorsContext';

export function KPICards() {
    const { activeCreators, creators } = useCreators();

    // Calculate KPIs
    const totalActive = activeCreators.length;

    const activeContracts = activeCreators.filter(c => c.status === 'active' || c.status === 'top_performer').length;

    const pendingPaymentsCount = creators.filter(c => c.payment.status === 'pending').length;

    // Sum posted videos across all active creators
    const videosDelivered = activeCreators.reduce((acc, curr) => acc + (curr.commitment.postedThisMonth || 0), 0);

    const cards = [
        { label: 'Total Active Creators', value: totalActive, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Active Contracts', value: activeContracts, icon: FileCheck, color: 'text-teal-600', bg: 'bg-teal-50' },
        { label: 'Videos Delivered', value: videosDelivered, icon: Video, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Pending Payments', value: pendingPaymentsCount, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {cards.map((card, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                            <card.icon size={20} />
                        </div>
                        {/* Optional trend indicator could go here */}
                    </div>
                    <div>
                        <p className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-1">{card.label}</p>
                        <h3 className="text-3xl font-bold text-text-primary tracking-tight">{card.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
