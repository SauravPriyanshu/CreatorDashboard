import { useState } from 'react';
import { X } from 'lucide-react';
import { PlatformIcon } from '../shared/PlatformIcon';

export function AddCreatorModal({ isOpen, onClose, onSave }) {
    const [step, setStep] = useState(1); // 1: Basic, 2: Platforms & Contract, 3: Payment
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        country: '',
        language: '',
        platforms: [],
        platformCommitment: '', // e.g. Tiktok+IG
        courses: [],
        contractStart: '',
        videosPerMonth: 10,
        premiumStart: '',
        premiumExpiry: '',
        paymentEmail: '',
        paymentAmount: 0,
        paymentCycle: 'Monthly',
        paymentMethod: 'Other'
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlatformToggle = (platform) => {
        setFormData(prev => {
            const updated = prev.platforms.includes(platform)
                ? prev.platforms.filter(p => p !== platform)
                : [...prev.platforms, platform];
            return {
                ...prev,
                platforms: updated,
                // Simple auto-commitment badge logic
                platformCommitment: updated.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('+')
            };
        });
    };

    const handleSubmit = () => {
        onSave({
            ...formData,
            // Construct the nested objects expected by the data structure
            commitment: {
                videosPerMonth: Number(formData.videosPerMonth),
                postedThisMonth: 0
            },
            payment: {
                amount: Number(formData.paymentAmount),
                currency: 'USD',
                cycle: formData.paymentCycle,
                method: formData.paymentMethod,
                email: formData.paymentEmail,
                status: 'Pending',
                bonusEligibility: false // Default off
            }
        });
        onClose();
        setFormData({ name: '', username: '', country: '', language: '', platforms: [], courses: [] }); // Reset
        setStep(1);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-border-subtle">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-surface">
                    <h2 className="text-lg font-semibold text-text-primary">Add New Creator</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-surface-hover text-text-tertiary transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[70vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Section 1: Identity */}
                        <div className="md:col-span-2">
                            <h3 className="text-sm font-semibold text-text-primary mb-3">Identity</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Full Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" placeholder="e.g. Jane Doe" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Username</label>
                                    <input name="username" value={formData.username} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" placeholder="@username" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Country</label>
                                    <input name="country" value={formData.country} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" placeholder="e.g. US" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Language</label>
                                    <input name="language" value={formData.language} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" placeholder="e.g. English" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Platforms & Contract */}
                        <div className="md:col-span-2">
                            <h3 className="text-sm font-semibold text-text-primary mb-3 mt-2">Platforms & Contract</h3>

                            <div className="mb-4">
                                <label className="block text-xs font-medium text-text-secondary mb-2">Active Platforms</label>
                                <div className="flex flex-wrap gap-3">
                                    {['tiktok', 'instagram', 'youtube', 'facebook'].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => handlePlatformToggle(p)}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors capitalize ${formData.platforms.includes(p)
                                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                                : 'bg-white border-border-subtle text-text-secondary hover:border-indigo-200'
                                                }`}
                                        >
                                            <PlatformIcon platform={p} size={14} />
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Videos / Month</label>
                                    <input type="number" name="videosPerMonth" value={formData.videosPerMonth} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Contract Start</label>
                                    <input type="date" name="contractStart" value={formData.contractStart} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Premium Start</label>
                                    <input type="date" name="premiumStart" value={formData.premiumStart} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Premium Expiry</label>
                                    <input type="date" name="premiumExpiry" value={formData.premiumExpiry} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Payment */}
                        <div className="md:col-span-2">
                            <h3 className="text-sm font-semibold text-text-primary mb-3 mt-2">Payment Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Payment Amount ($)</label>
                                    <input type="number" name="paymentAmount" value={formData.paymentAmount} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Payment Email</label>
                                    <input type="email" name="paymentEmail" value={formData.paymentEmail} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Payment Cycle</label>
                                    <select name="paymentCycle" value={formData.paymentCycle} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none">
                                        <option>Monthly</option>
                                        <option>Bi-weekly</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-text-secondary mb-1">Payment Method</label>
                                    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full text-sm p-2 rounded border border-border-subtle focus:border-indigo-500 outline-none">
                                        <option>Payoneer</option>
                                        <option>Wise</option>
                                        <option>PayPal</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="px-6 py-4 bg-surface border-t border-border-subtle flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-white rounded border border-transparent hover:border-border-subtle transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium shadow-sm transition-colors"
                        disabled={!formData.name || !formData.username}
                    >
                        Create Creator
                    </button>
                </div>
            </div>
        </div>
    );
}
