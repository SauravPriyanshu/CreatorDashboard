import { createContext, useContext, useState, useMemo } from 'react';
import { MOCK_CREATORS, PIPELINE_DATA, MOCK_CALENDAR_EVENTS } from './mockData';

const CreatorsContext = createContext();

export function CreatorsProvider({ children }) {
    const [creators, setCreators] = useState(MOCK_CREATORS);
    const [pipeline] = useState(PIPELINE_DATA);
    const [filters, setFilters] = useState({
        search: '',
        status: [],
        platformCommitment: [],
        country: [],
        language: [],
        course: [],
        contentTags: [], // New
        minViews: '', // New
        maxViews: '', // New
        dateStart: '', // New
        dateEnd: '', // New
        email: '', // New
    });

    const activeCreators = useMemo(() => {
        return creators.filter(c => c.status !== 'Archived');
    }, [creators]);

    const archivedCreators = useMemo(() => {
        return creators.filter(c => c.status === 'Archived');
    }, [creators]);

    // Helper to parse "1.2K", "1M"
    const parseViews = (val) => {
        if (!val) return 0;
        const str = val.toString().toUpperCase().replace(/,/g, '');
        if (str.includes('M')) return parseFloat(str) * 1000000;
        if (str.includes('K')) return parseFloat(str) * 1000;
        return parseFloat(str) || 0;
    };

    const filteredCreators = useMemo(() => {
        return activeCreators.filter(creator => {
            // Search
            const searchMatch = !filters.search ||
                creator.username.toLowerCase().includes(filters.search.toLowerCase()) ||
                creator.name.toLowerCase().includes(filters.search.toLowerCase());

            // Status
            const statusMatch = filters.status.length === 0 || filters.status.includes(creator.status);

            // Platform Commitment
            const commitmentMatch = filters.platformCommitment.length === 0 ||
                filters.platformCommitment.includes(creator.platformCommitment);

            // Country
            const countryMatch = filters.country.length === 0 || filters.country.includes(creator.country);

            // Language
            const languageMatch = filters.language.length === 0 || filters.language.includes(creator.language);

            // Course
            const courseMatch = filters.course.length === 0 ||
                (creator.courses && creator.courses.some(c => filters.course.includes(c)));

            // Content Tags (Check against creator.tags where category='topic' or just value match)
            // Assuming creators have tags array with { category, value }
            const contentTagsMatch = filters.contentTags.length === 0 ||
                (creator.tags && creator.tags.some(t => filters.contentTags.includes(t.value)));

            // View Range
            const views = parseViews(creator.stats?.totalViews);
            const minViewsMatch = !filters.minViews || views >= Number(filters.minViews);
            const maxViewsMatch = !filters.maxViews || views <= Number(filters.maxViews);

            // Date Range (Contract Start)
            const dateMatch = (!filters.dateStart || new Date(creator.contractStart) >= new Date(filters.dateStart)) &&
                (!filters.dateEnd || new Date(creator.contractStart) <= new Date(filters.dateEnd));

            // Email
            const emailMatch = !filters.email ||
                (creator.email && creator.email.toLowerCase().includes(filters.email.toLowerCase())) ||
                (creator.payment?.email && creator.payment.email.toLowerCase().includes(filters.email.toLowerCase()));

            return searchMatch && statusMatch && commitmentMatch && countryMatch &&
                languageMatch && courseMatch && contentTagsMatch &&
                minViewsMatch && maxViewsMatch && dateMatch && emailMatch;
        });
    }, [activeCreators, filters]);

    const updateCreator = (id, updates) => {
        setCreators(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
    };

    const archiveCreator = (id) => {
        updateCreator(id, { status: 'archived' });
    };

    const getCreatorById = (id) => creators.find(c => c.id === id);

    const [calendarEvents, setCalendarEvents] = useState(MOCK_CALENDAR_EVENTS);

    // ... existing filters state ...

    // ... existing useMemos ...

    const addEvent = (event) => {
        setCalendarEvents(prev => [...prev, { ...event, id: `e${Date.now()}` }]);
    };

    const updateEvent = (id, updates) => {
        setCalendarEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    };

    const deleteEvent = (id) => {
        setCalendarEvents(prev => prev.filter(e => e.id !== id));
    };

    const addNote = (creatorId, noteContent) => {
        setCreators(prev => prev.map(c => {
            if (c.id === creatorId) {
                const newNote = {
                    id: `n${Date.now()}`,
                    author: 'Admin User', // Hardcoded for now
                    date: new Date().toISOString(),
                    content: noteContent,
                    type: 'manual'
                };
                return { ...c, notes: [newNote, ...(c.notes || [])] };
            }
            return c;
        }));
    };

    const addCreator = (creatorData) => {
        const newCreator = {
            id: `c${Date.now()}`,
            status: 'Active',
            stats: { totalViews: '0', engagement: '0%', avgViews: '0' },
            notes: [],
            tags: [], // Default empty tags
            courses: [],
            platforms: [],
            payment: { status: 'Pending', bonusEligibility: false, bonusSlabs: [] },
            ...creatorData,
            platformCommitment: creatorData.platformCommitment || 'None',
        };
        setCreators(prev => [newCreator, ...prev]);
        // Also add logic to pipeline? No, direct to creators list as requested "simulating existing one".
    };

    const [dayFeedbacks, setDayFeedbacks] = useState([]); // New state for day-level feedback

    const updateDayFeedback = (creatorId, date, feedback) => {
        setDayFeedbacks(prev => {
            const existingIndex = prev.findIndex(f => f.creatorId === creatorId && f.date === date);
            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = { ...updated[existingIndex], feedback };
                return updated;
            } else {
                return [...prev, { id: `df${Date.now()}`, creatorId, date, feedback }];
            }
        });
    };

    const value = {
        creators,
        calendarEvents,
        dayFeedbacks, // New
        addEvent,
        updateEvent,
        deleteEvent,
        addNote,
        addCreator,
        updateDayFeedback, // New


        activeCreators,
        archivedCreators,
        filteredCreators,
        pipeline,
        filters,
        setFilters,
        updateCreator,
        archiveCreator,
        getCreatorById,
    };

    return (
        <CreatorsContext.Provider value={value}>
            {children}
        </CreatorsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCreators() {
    const context = useContext(CreatorsContext);
    if (!context) {
        throw new Error('useCreators must be used within a CreatorsProvider');
    }
    return context;
}
