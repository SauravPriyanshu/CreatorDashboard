import { Calendar, CreditCard, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function ContractSection({ creator }) {
    if (!creator) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Contract Details */}
            <div className="bg-white border border-border rounded-xl p-6 shadow-soft col-span-2">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar size={20} className="text-indigo-600" />
                    Contract & Performance
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Start Date</p>
                        <p className="font-medium text-slate-900">{creator.contractStart}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Monthly Commitment</p>
                        <p className="font-medium text-slate-900">{creator.commitment.videosPerMonth} Videos</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Current Progress</p>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-2xl text-indigo-600">{creator.commitment.postedThisMonth}</span>
                            <span className="text-slate-400 text-sm">/ {creator.commitment.videosPerMonth}</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Videos Pending</p>
                        <p className="font-medium text-slate-900">{Math.max(0, creator.commitment.videosPerMonth - creator.commitment.postedThisMonth)}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Payment Email</p>
                        <div className="flex items-center gap-1.5 group cursor-pointer">
                            <p className="font-medium text-slate-900 truncate" title={creator.payment.email || creator.email}>{creator.payment.email || creator.email}</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">App Login</p>
                        <p className="font-medium text-slate-900 truncate" title={creator.appLoginEmail}>{creator.appLoginEmail || 'Not set'}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Premium Access</p>
                        <div>
                            <p className="font-medium text-emerald-600 flex items-center gap-1">
                                <CheckCircle size={14} /> Active
                            </p>
                            <div className="text-[10px] text-slate-400 mt-0.5 space-y-0.5">
                                <p>Start: {creator.premiumStart || 'N/A'}</p>
                                <p>Expires: {creator.premiumExpiry || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white border border-border rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CreditCard size={20} className="text-teal-600" />
                    Payment Details
                </h3>

                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-slate-500 text-sm">Contract Amount</span>
                        <span className="font-bold text-slate-900">{creator.payment.currency} {creator.payment.amount}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-sm">Payment Cycle</span>
                        <span className="font-medium text-slate-900">{creator.payment.cycle}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-sm">Status</span>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${creator.payment.status?.toLowerCase() === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {creator.payment.status}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-sm">Method</span>
                        <span className="font-medium text-slate-900">{creator.payment.method}</span>
                    </div>

                    {/* Bonus Eligibility Section */}
                    <div className="pt-4 border-t border-dashed border-border-subtle mt-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-900 text-sm font-semibold flex items-center gap-1.5">
                                <DollarSign size={14} className="text-amber-500" />
                                Performance Bonus
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${creator.payment.bonusEligibility ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                                {creator.payment.bonusEligibility ? 'Eligible' : 'Not Eligible'}
                            </span>
                        </div>

                        {creator.payment.bonusEligibility && creator.payment.bonusSlabs && (
                            <div className="bg-amber-50/50 rounded-md p-2 space-y-1.5 mt-2 border border-amber-100/50">
                                {creator.payment.bonusSlabs.map((slab, idx) => (
                                    <div key={idx} className="flex justify-between text-xs">
                                        <span className="text-slate-600">{slab.views.toLocaleString()} Views</span>
                                        <span className="font-medium text-slate-900">+ ${slab.payout}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
