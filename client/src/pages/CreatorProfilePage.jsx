import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCreators } from '../context/CreatorsContext';
import { ProfileHeader } from '../components/creator/ProfileHeader';
import { ContractSection } from '../components/creator/ContractSection';
import { ContentCalendar } from '../components/creator/ContentCalendar';
import { PerformanceMetrics } from '../components/creator/PerformanceMetrics';
import { FeedbackSection } from '../components/creator/FeedbackSection';
import { ChevronLeft, Archive as ArchiveIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export function CreatorProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getCreatorById, archiveCreator } = useCreators();

    const creator = getCreatorById(id);

    if (!creator) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-semibold text-slate-900">Creator not found</h2>
                <Link to="/" className="text-indigo-600 hover:underline mt-2 inline-block">Return to Dashboard</Link>
            </div>
        );
    }

    const handleArchive = () => {
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">Archive Creator</p>
                            <p className="mt-1 text-sm text-gray-500">Are you sure you want to archive {creator.name}? This action can be undone later.</p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => {
                            archiveCreator(id);
                            toast.dismiss(t.id);
                            toast.success('Creator archived');
                            navigate('/archive');
                        }}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Archive
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        ), { duration: 5000 });
    };

    return (
        <div className="max-w-6xl mx-auto pb-10 animate-fade-in">
            {/* Breadcrumb / Back */}
            <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center gap-1 text-text-tertiary hover:text-text-primary transition-colors text-sm font-medium group">
                    <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Dashboard
                </Link>
                <button
                    onClick={handleArchive}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-tertiary hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors border border-transparent hover:border-rose-100"
                >
                    <ArchiveIcon size={14} /> Archive Creator
                </button>
            </div>

            <ProfileHeader creator={creator} />

            <ContractSection creator={creator} />

            <ContentCalendar creator={creator} />

            <PerformanceMetrics creator={creator} />

            {/* <FeedbackSection creator={creator} /> */}
        </div>
    );
}
