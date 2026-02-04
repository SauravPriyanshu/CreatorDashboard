import { useState } from 'react';
import { useCreators } from '../../context/CreatorsContext';
import { format } from 'date-fns';

export function FeedbackSection({ creator }) {
    const { addNote } = useCreators();
    const [noteContent, setNoteContent] = useState('');

    if (!creator) return null;

    const handleAddNote = () => {
        if (!noteContent.trim()) return;
        addNote(creator.id, noteContent);
        setNoteContent('');
    };

    const sortedNotes = [...(creator.notes || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="bg-background-subtle border border-border-subtle rounded-xl p-6 shadow-xs">
            <h3 className="text-base font-medium text-text-primary mb-4 flex items-center gap-2">
                Internal Notes
                <span className="text-xs font-normal text-text-tertiary px-2 py-0.5 bg-surface border border-border-subtle rounded-full">Private</span>
            </h3>

            <div className="mb-6">
                <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full bg-surface border-none shadow-sm rounded-lg p-4 text-sm text-text-primary placeholder:text-text-tertiary focus:ring-1 focus:ring-border focus:shadow-md transition-all resize-none h-24"
                    placeholder="Type a note..."
                />
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-text-tertiary">Markdown supported</p>
                    <button
                        onClick={handleAddNote}
                        disabled={!noteContent.trim()}
                        className="bg-white border border-border text-text-primary hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed text-xs px-3 py-1.5 rounded-md font-medium shadow-sm transition-colors"
                    >
                        Add Note
                    </button>
                </div>
            </div>

            <div className="space-y-4 pl-2 border-l border-border-subtle ml-2">
                {sortedNotes.length > 0 ? (
                    sortedNotes.map(note => (
                        <div key={note.id} className="flex gap-3 pl-4 relative">
                            <div className={`absolute -left-[21px] top-0 w-2.5 h-2.5 rounded-full border-2 border-background-subtle ${note.type === 'manual' ? 'bg-indigo-200' : 'bg-teal-200'}`}></div>
                            <div>
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-xs font-bold text-text-primary">{note.author}</span>
                                    <span className="text-[10px] text-text-tertiary">{format(new Date(note.date), 'MMM dd, h:mm a')}</span>
                                </div>
                                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                                    {note.content}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="pl-4 text-sm text-text-tertiary italic">No notes added yet.</div>
                )}
            </div>
        </div>
    );
}
