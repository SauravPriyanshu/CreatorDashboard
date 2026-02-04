export const MOCK_CREATORS = [
    {
        id: 'c1',
        username: '@sarah_designs',
        name: 'Sarah Jenkins',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
        gender: 'female',
        status: 'Active', // Strict: Active / Paused / Completed / Archived
        country: 'US', // Strict: US, UK, Australia, Canada, New Zealand
        language: 'English', // Strict: English, Spanish
        courses: ['UI/UX Design'],
        platforms: ['instagram', 'tiktok'],
        platformCommitment: 'Tiktok+IG', // Strict tag
        commitment: {
            videosPerMonth: 8,
            postedThisMonth: 5,
        },
        payment: {
            status: 'Pending', // Pending / Paid / On hold
            amount: 1200,
            currency: 'USD',
            cycle: 'Monthly', // Monthly / bi-weekly
            method: 'Wise', // PayPal/ Wise/ Payoneer/ Other
            email: 'sarah.pay@wise.com',
            bonusEligibility: true,
            bonuses: 150,
            bonusSlabs: [
                { views: 500000, payout: 100 },
                { views: 1000000, payout: 250 }
            ]
        },
        stats: {
            totalViews: '1.2M',
            engagement: '4.5%',
            avgViews: '45K'
        },
        email: 'sarah@creator.com',
        appLoginEmail: 'sarah.app@gmail.com',
        premiumStart: '2025-01-01',
        premiumExpiry: '2026-12-31',
        contractStart: '2025-01-01',
        tags: [
            { category: 'platform', value: 'Instagram' },
            { category: 'platform', value: 'TikTok' },
            { category: 'course', value: 'UI/UX Design' },
            { category: 'language', value: 'English' },
            { category: 'topic', value: 'Education' },
            { category: 'topic', value: 'Design' }
        ],
        notes: [
            {
                id: 'n1',
                author: 'Admin User',
                date: '2026-02-01T14:30:00',
                content: 'Creator is consistently delivering high engagement on TikTok. Need to discuss potential bonus structure for next month.'
            },
            {
                id: 'n2',
                author: 'Sarah J.',
                date: '2026-01-28T10:15:00',
                content: 'Contract renewal sent. Pending signature.'
            }
        ],
        generalFeedback: 'Has excellent visual aesthetics but consistent posting schedule needs improvement.'
    },
    {
        id: 'c2',
        username: '@tech_guru_mike',
        name: 'Mike Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
        gender: 'male',
        status: 'Active',
        country: 'Canada',
        language: 'English',
        courses: ['Intro to Tech'],
        platforms: ['youtube', 'tiktok'],
        platformCommitment: 'Tiktok+YT',
        commitment: {
            videosPerMonth: 4,
            postedThisMonth: 4,
        },
        payment: {
            status: 'Paid',
            amount: 2500,
            currency: 'USD',
            cycle: 'Monthly',
            method: 'PayPal',
            email: 'mike@paypal.com',
            bonusEligibility: false,
        },
        stats: {
            totalViews: '850K',
            engagement: '3.2%',
            avgViews: '120K'
        },
        email: 'mike@techguru.com',
        appLoginEmail: 'mike.c@gmail.com',
        premiumStart: '2024-11-01',
        premiumExpiry: '2025-11-01',
        contractStart: '2024-11-15',
        tags: [
            { category: 'platform', value: 'YouTube' },
            { category: 'platform', value: 'TikTok' },
            { category: 'course', value: 'Intro to Tech' },
            { category: 'language', value: 'English' },
            { category: 'topic', value: 'Tech' },
            { category: 'topic', value: 'Review' }
        ]
    },
    {
        id: 'c3',
        username: '@la_cocina_maria',
        name: 'Maria Gonzalez',
        avatar: '', // Testing default avatar logic
        gender: 'female',
        status: 'Paused',
        country: 'US',
        language: 'Spanish',
        courses: ['Cooking Basics'],
        platforms: ['instagram', 'facebook'],
        platformCommitment: 'Tiktok+IG+FB',
        commitment: {
            videosPerMonth: 12,
            postedThisMonth: 2,
        },
        payment: {
            status: 'Pending',
            amount: 800,
            currency: 'USD',
            cycle: 'bi-weekly',
            method: 'PayPal',
            email: 'maria@paypal.com',
            bonusEligibility: true,
            bonusSlabs: [
                { views: 100000, payout: 50 }
            ]
        },
        stats: {
            totalViews: '200K',
            engagement: '1.8%',
            avgViews: '5K'
        },
        email: 'maria@cocina.com',
        appLoginEmail: 'maria.g@gmail.com',
        premiumStart: '2025-02-01',
        premiumExpiry: '2026-02-01',
        contractStart: '2025-02-01',
        tags: [
            { category: 'platform', value: 'Instagram' },
            { category: 'platform', value: 'Facebook' },
            { category: 'course', value: 'Cooking Basics' },
            { category: 'language', value: 'Spanish' },
            { category: 'topic', value: 'Food' },
            { category: 'topic', value: 'Lifestyle' }
        ]
    },
    {
        id: 'c5',
        username: '@abuela_tips',
        name: 'Rosa Diaz',
        avatar: '', // Testing default avatar logic
        gender: 'female',
        status: 'Active',
        country: 'US', // Spain not in list
        language: 'Spanish',
        courses: ['Spanish 101'],
        platforms: ['tiktok', 'instagram', 'facebook'],
        platformCommitment: 'Tiktok+IG+FB',
        commitment: {
            videosPerMonth: 15,
            postedThisMonth: 18,
        },
        payment: {
            status: 'Paid',
            amount: 3000,
            currency: 'USD',
            cycle: 'Monthly',
            method: 'Payoneer',
            email: 'rosa@payoneer.com',
            bonusEligibility: true,
            bonusSlabs: [
                { views: 1000000, payout: 500 }
            ]
        },
        stats: {
            totalViews: '15M',
            engagement: '12%',
            avgViews: '500K'
        },
        email: 'rosa@abuela.com',
        appLoginEmail: 'rosa.d@gmail.com',
        premiumStart: '2024-01-01',
        premiumExpiry: '2025-12-31',
        contractStart: '2024-01-20',
        tags: [
            { category: 'platform', value: 'TikTok' },
            { category: 'platform', value: 'Instagram' },
            { category: 'platform', value: 'Facebook' },
            { category: 'course', value: 'Spanish 101' },
            { category: 'language', value: 'Spanish' },
            { category: 'topic', value: 'Comedy' },
            { category: 'topic', value: 'Family' }
        ]
    },
];

export const MOCK_CALENDAR_EVENTS = [
    {
        id: 'e1',
        creatorId: 'c1',
        date: '2026-02-03', // Today-ish
        platform: 'instagram',
        status: 'posted',
        link: 'https://instagram.com/p/12345',
        type: 'reel'
    },
    {
        id: 'e2',
        creatorId: 'c1',
        date: '2026-02-05',
        platform: 'tiktok',
        status: 'scheduled',
        link: '',
        type: 'video'
    }
];

export const PIPELINE_DATA = [
    { id: 'p1', name: 'John Doe', stage: 'contacted', platform: 'YouTube', email: 'john@example.com' },
    { id: 'p2', name: 'Jane Smith', stage: 'negotiation', platform: 'Instagram', email: 'jane@example.com' },
];
