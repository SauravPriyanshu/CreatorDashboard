import { MapPin, Globe, ExternalLink, ArrowLeft, BookOpen, Share2 } from 'lucide-react';
import { PlatformIcon } from '../shared/PlatformIcon';
import { Link } from 'react-router-dom';
import { useCreators } from '../../context/CreatorsContext';
import { cn } from '../../utils/cn';

export function ProfileHeader({ creator }) {
    const { updateCreator } = useCreators();
    if (!creator) return null;

    return (
        <div className="bg-white border border-border-subtle rounded-lg p-6 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="shrink-0 relative">
                {creator.avatar ? (
                    <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-20 h-20 rounded-full object-cover border border-border-subtle shadow-sm"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xl border border-indigo-100 shadow-sm">
                        {creator.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                )}
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${creator.status?.toLowerCase() === 'active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
            </div>

            <div className="flex-1 space-y-3 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2 tracking-tight">
                            {creator.name}
                            <span className="text-sm font-normal text-text-tertiary">{creator.username}</span>
                        </h1>

                        {/* Meta Row 1: Location & Language */}
                        <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                            <div className="flex items-center gap-1.5" title="Country">
                                <MapPin size={14} className="text-text-tertiary" />
                                {creator.country}
                            </div>
                            <div className="flex items-center gap-1.5" title="Language">
                                <Globe size={14} className="text-text-tertiary" />
                                {creator.language}
                            </div>
                        </div>

                        {/* Meta Row 2: Commitment & Courses */}
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                            {/* Commitment Badge */}
                            {creator.platformCommitment && (
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-sm">
                                    <Share2 size={12} />
                                    {creator.platformCommitment}
                                </div>
                            )}

                            {/* Courses */}
                            {creator.courses && creator.courses.length > 0 && (
                                <div className="flex items-center gap-1.5 text-xs text-text-secondary bg-surface px-2 py-1 rounded border border-border-subtle">
                                    <BookOpen size={13} className="text-text-tertiary" />
                                    <span className="font-medium">{creator.courses.join(', ')}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div className="flex gap-2">
                        {creator.platforms?.includes('tiktok') && (
                            <a href="#" title="TikTok" className="transition-transform hover:scale-105">
                                <PlatformIcon platform="tiktok" />
                            </a>
                        )}
                        {creator.platforms?.includes('instagram') && (
                            <a href="#" title="Instagram" className="transition-transform hover:scale-105">
                                <PlatformIcon platform="instagram" />
                            </a>
                        )}
                        {creator.platforms?.includes('youtube') && (
                            <a href="#" title="YouTube" className="transition-transform hover:scale-105">
                                <PlatformIcon platform="youtube" />
                            </a>
                        )}
                        <a href="#" title="Facebook" className="transition-transform hover:scale-105">
                            <PlatformIcon platform="facebook" />
                        </a>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-1">
                    {creator.tags && creator.tags
                        .filter(tag => !['platform', 'course', 'language'].includes(tag.category))
                        .map((tag, index) => (
                            <span key={`${tag.category}-${tag.value}-${index}`} className="px-2 py-0.5 text-xs rounded border font-medium bg-slate-100 text-slate-700 border-slate-200">
                                {tag.value}
                            </span>
                        ))}
                </div>
            </div>

            {/* General Feedback Column/Row */}
            {/* <div className="w-full md:w-1/3 pt-4 md:pt-0 md:pl-6 md:border-l border-border-subtle mt-4 md:mt-0">
                <label className="block text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
                    Feedback Box
                </label>
                <textarea
                    className="w-full bg-surface-hover/50 border border-border-subtle rounded-md p-3 text-sm text-text-primary placeholder:text-text-tertiary focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none h-[100px]"
                    placeholder="Enter feedback regarding this creator..."
                    defaultValue={creator.generalFeedback || ''}
                    onBlur={(e) => updateCreator(creator.id, { generalFeedback: e.target.value })}
                />
            </div> */}
        </div>
    );
}
