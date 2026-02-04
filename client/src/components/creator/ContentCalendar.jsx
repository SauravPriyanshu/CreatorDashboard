
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X, Clock, Trash2 } from 'lucide-react';
import { PlatformIcon } from '../shared/PlatformIcon';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isAfter,
    isBefore,
    parseISO,
    startOfDay
} from 'date-fns';
import { useCreators } from '../../context/CreatorsContext';

export function ContentCalendar({ creator }) {
    const { calendarEvents, addEvent, updateEvent, deleteEvent, dayFeedbacks, updateDayFeedback } = useCreators();

    const today = startOfDay(new Date());
    // Parse contract start or default to 1 year ago if missing
    const contractStartDate = creator?.contractStart ? parseISO(creator.contractStart) : subMonths(today, 12);

    // State for currently viewed month
    const [currentMonth, setCurrentMonth] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today);

    // Navigation handlers
    const nextMonth = () => {
        const next = addMonths(currentMonth, 1);
        if (!isAfter(startOfMonth(next), startOfMonth(today))) {
            setCurrentMonth(next);
        }
    };

    const prevMonth = () => {
        const prev = subMonths(currentMonth, 1);
        if (!isBefore(endOfMonth(prev), contractStartDate)) {
            setCurrentMonth(prev);
        }
    };

    const canGoNext = !isSameMonth(currentMonth, today) && !isAfter(addMonths(currentMonth, 1), today);
    // actually we want to stop if the *next* month is strictly after today's month? 
    // Wait, requirement is "go to any month till the date". 
    // Usually means up to current month. 
    // If currentMonth is Feb 2026 (today), next is Mar 2026. Should be disabled.
    const isNextDisabled = isSameMonth(currentMonth, today);

    // Can go prev if the *previous* month's end is not before contract start.
    // simpler: if current month is same as contract start month, disable prev.
    const isPrevDisabled = isSameMonth(currentMonth, contractStartDate) || isBefore(currentMonth, contractStartDate);


    // Calendar Grid Generation
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    });

    // Filter events for this creator
    const creatorEvents = calendarEvents.filter(e => e.creatorId === creator.id);

    // Get events for selected date
    const selectedDateEvents = creatorEvents.filter(e => isSameDay(parseISO(e.date), selectedDate));

    // Handlers for marking events
    const handleMarkDate = (status) => {
        // Create a new event for this date with generic default
        addEvent({
            creatorId: creator.id,
            date: format(selectedDate, 'yyyy-MM-dd'),
            platform: 'instagram', // Default to instagram
            status: status, // 'posted' or 'missed'
            type: 'post',
            link: ''
        });
    };

    const handleUpdateStatus = (eventId, newStatus) => {
        updateEvent(eventId, { status: newStatus });
    };

    return (
        <div className="bg-white border border-border shadow-sm rounded-xl p-6 mb-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-text-primary">Content Calendar</h3>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-text-tertiary">{format(currentMonth, 'MMM yyyy')}</span>
                    <div className="flex gap-1">
                        <button
                            onClick={prevMonth}
                            disabled={isPrevDisabled}
                            className="p-1 hover:bg-surface-hover rounded text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={nextMonth}
                            disabled={isNextDisabled}
                            className="p-1 hover:bg-surface-hover rounded text-text-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-border-subtle rounded-lg overflow-hidden border border-border-subtle">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                    <div key={day} className="bg-surface text-center text-[10px] font-semibold text-text-tertiary py-2">
                        {day}
                    </div>
                ))}

                {calendarDays.map((day, dayIdx) => {
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isDaySelected = isSameDay(day, selectedDate);
                    const isToday = isSameDay(day, today);

                    // Events for this specific day
                    const dayEvents = creatorEvents.filter(e => isSameDay(parseISO(e.date), day));

                    return (
                        <div
                            key={day.toString()}
                            className={`
                                min-h-[6rem] p-2 relative group flex flex-col items-end transition-all
                                ${!isCurrentMonth ? 'bg-surface/30 text-text-disabled' : ''}
                                ${isCurrentMonth && dayEvents.length > 0 ? 'bg-emerald-50/60' : isCurrentMonth ? 'bg-white' : ''}
                                ${isDaySelected ? 'ring-2 ring-inset ring-indigo-500/50 z-10' : 'hover:bg-surface-hover cursor-pointer'}
`}
                            onClick={() => setSelectedDate(day)}
                        >
                            <span className={`
                                text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full transition-colors
                                ${isToday ? 'bg-indigo-600 text-white shadow-sm' : ''}
                                ${!isToday && isDaySelected ? 'bg-indigo-50 text-indigo-700' : ''}
                                ${!isToday && !isDaySelected && isCurrentMonth ? 'text-text-tertiary' : ''}
`}>
                                {format(day, 'd')}
                            </span>

                            {/* Event Indicators */}
                            <div className="w-full mt-1 space-y-1">
                                {dayEvents.map((event, idx) => (
                                    <div
                                        key={event.id}
                                        className={`
                                            flex items-center gap-1.5 px-1.5 py-1 rounded border transition-colors
                                            ${event.status === 'missed' ? 'bg-red-50 border-red-100 text-red-700' : ''}
                                            ${event.status === 'posted' && event.platform === 'tiktok' ? 'bg-rose-50 border-rose-100 text-rose-700' : ''}
                                            ${event.status === 'posted' && event.platform === 'instagram' ? 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700' : ''}
                                            ${event.status === 'posted' && event.platform === 'youtube' ? 'bg-red-50 border-red-100 text-red-700' : ''}
                                            ${event.status === 'posted' && event.platform === 'facebook' ? 'bg-blue-50 border-blue-100 text-blue-700' : ''}
                                            ${event.status === 'scheduled' ? 'bg-amber-50 border-amber-100 text-amber-700' : ''}
                                            ${event.status !== 'missed' && event.status !== 'scheduled' && !['tiktok', 'instagram', 'youtube', 'facebook'].includes(event.platform) ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : ''}
`}
                                    >
                                        <div className={`w-1.5 h-1.5 rounded-full ${event.status === 'posted' ? 'bg-current' : 'border-2 border-current'} `}></div>
                                        <span className="text-[10px] font-medium truncate hidden md:block capitalize">{event.platform}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Selected Day Details */}
            <div className="mt-6 border-t border-border-subtle pt-6">
                <h4 className="text-sm font-semibold text-text-primary mb-4 flex items-center justify-between">
                    <span>Details for {format(selectedDate, 'MMM d, yyyy')}</span>
                    {isSameDay(selectedDate, today) && (
                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded border border-indigo-100 font-medium">Today</span>
                    )}
                </h4>

                <div className="space-y-4">
                    {selectedDateEvents.map(event => (
                        <div key={event.id} className="bg-surface rounded-lg border border-border-subtle p-4">
                            <div className="flex gap-4 items-start">
                                <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center 
                                    ${event.status === 'posted' ? 'bg-emerald-100 text-emerald-600' : ''}
                                    ${event.status === 'missed' ? 'bg-red-100 text-red-600' : ''}
                                    ${event.status === 'scheduled' || !event.status ? 'bg-amber-100 text-amber-600' : ''}
                                `}>
                                    {event.status === 'posted' && <Check size={16} />}
                                    {event.status === 'missed' && <X size={16} />}
                                    {(event.status === 'scheduled' || !event.status) && <Clock size={16} />}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div className="flex flex-col gap-2 w-full mr-4">
                                            {/* Platform Selection */}
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-2 px-2 py-1 bg-surface border border-border-subtle rounded-md shadow-sm">
                                                    <PlatformIcon platform={event.platform} size={14} />

                                                    <select
                                                        value={['instagram', 'tiktok', 'youtube', 'facebook'].includes(event.platform) ? event.platform : 'instagram'}
                                                        onChange={(e) => updateEvent(event.id, { platform: e.target.value })}
                                                        className="text-sm font-semibold text-text-primary bg-transparent outline-none cursor-pointer capitalize"
                                                    >
                                                        <option value="instagram">Instagram</option>
                                                        <option value="tiktok">TikTok</option>
                                                        <option value="youtube">YouTube</option>
                                                        <option value="facebook">Facebook</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Link Input */}
                                            <input
                                                type="text"
                                                placeholder="Live Content Link"
                                                value={event.link || ''}
                                                onChange={(e) => updateEvent(event.id, { link: e.target.value })}
                                                className="text-xs text-text-secondary bg-surface-hover/50 px-2 py-1 rounded border border-border-subtle focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full transition-all placeholder:text-text-disabled"
                                            />

                                            {/* Additional Links */}
                                            <textarea
                                                placeholder="Additional/Cross-post Links"
                                                value={event.additionalLinks || ''}
                                                onChange={(e) => updateEvent(event.id, { additionalLinks: e.target.value })}
                                                className="text-xs text-text-secondary bg-surface-hover/50 px-2 py-1 rounded border border-border-subtle focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none w-full transition-all placeholder:text-text-disabled min-h-[40px] resize-y mt-1"
                                            />

                                            {/* App Shown Checkbox */}
                                            <label className="flex items-center gap-2 mt-1 cursor-pointer w-fit select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={event.appShown || false}
                                                    onChange={(e) => updateEvent(event.id, { appShown: e.target.checked })}
                                                    className="w-3.5 h-3.5 rounded border-border-secondary text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                                                />
                                                <span className="text-xs text-text-secondary">App Shown in Video</span>
                                            </label>
                                        </div>

                                        {/* Status Toggle Controls */}
                                        <div className="flex gap-1.5 bg-surface border border-border-subtle rounded-md p-1 shrink-0">
                                            <button
                                                onClick={() => handleUpdateStatus(event.id, 'posted')}
                                                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${event.status === 'posted' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-text-tertiary hover:bg-surface-hover hover:text-text-primary'} `}
                                                title="Mark as Posted"
                                            >
                                                Posted
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(event.id, 'missed')}
                                                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${event.status === 'missed' ? 'bg-red-50 text-red-700 shadow-sm' : 'text-text-tertiary hover:bg-surface-hover hover:text-text-primary'} `}
                                                title="Mark as Missed"
                                            >
                                                Missed
                                            </button>
                                            <div className="w-px bg-border-subtle mx-0.5"></div>
                                            <button
                                                onClick={() => deleteEvent(event.id)}
                                                className="px-1.5 py-0.5 rounded text-text-tertiary hover:bg-red-50 hover:text-red-600 transition-colors"
                                                title="Delete Post"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Additional Metadata Fields */}
                                    <div className="pt-2 border-t border-border-subtle/50 mt-2">
                                        {/* Content Tags */}
                                        <div>
                                            <label className="block text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-1">
                                                Content Tags
                                            </label>
                                            <select
                                                value={event.contentTags || ''}
                                                onChange={(e) => updateEvent(event.id, { contentTags: e.target.value })}
                                                className="w-full text-xs text-text-primary bg-surface border border-border-subtle rounded px-2 py-1.5 focus:border-indigo-500 outline-none"
                                            >
                                                <option value="">Select Tag...</option>
                                                {[
                                                    'Wrong saying', 'Custom AI', 'Whiteboard', 'Story time: directions',
                                                    'Story time: doctor', 'Video call', 'Other', 'AI Tutor: Trivia',
                                                    'Story time: Tea', 'Duolingo', '2025 vs 2026', 'AI Tutor: Abuela',
                                                    'AI Tutor', 'Story time: Makeup', 'Story time', 'Relatable',
                                                    'Carousel', 'Teacher'
                                                ].map(tag => (
                                                    <option key={tag} value={tag}>{tag}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Post Button */}
                    <button
                        onClick={() => handleMarkDate('scheduled')}
                        className="w-full py-2 border border-dashed border-border hover:border-indigo-300 rounded-lg text-xs font-medium text-text-secondary hover:text-indigo-600 hover:bg-indigo-50/50 transition-all flex items-center justify-center gap-2"
                    >
                        + Add Post
                    </button>

                    {/* Date-Level Feedback */}
                    <div className="pt-4 mt-2 border-t border-border-subtle">
                        <label className="block text-[10px] font-semibold text-text-tertiary uppercase tracking-wider mb-2">
                            Internal Feedback (Date: {format(selectedDate, 'MMM d')})
                        </label>
                        <textarea
                            placeholder={`Feedback for ${format(selectedDate, 'MMM d')}...`}
                            value={dayFeedbacks.find(f => f.creatorId === creator.id && f.date === format(selectedDate, 'yyyy-MM-dd'))?.feedback || ''}
                            onChange={(e) => updateDayFeedback(creator.id, format(selectedDate, 'yyyy-MM-dd'), e.target.value)}
                            className="w-full text-xs text-text-primary bg-surface border border-border-subtle rounded px-3 py-2 focus:border-indigo-500 outline-none min-h-[60px] resize-y"
                        />
                    </div>

                    {selectedDateEvents.length === 0 && (
                        <div className="text-center pb-2">
                            <p className="text-[10px] text-text-tertiary">No events yet. Add one above.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

