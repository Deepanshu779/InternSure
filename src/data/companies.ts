export type Company = {
    id: string;
    name: string;
    slug: string;
    description: string;
    website: string;
    location: string;
    trustScore: number;
    internshipScore: number;
    verified: boolean;
    tags: string[];
};

export type StudentExperience = {
    id: string;
    companyId: string;
    role: string;
    duration: string;
    year: number;
    rating: number;
    projectRating: number;
    mentorshipRating: number;
    stipendRating: number;
    communicationRating: number;
    title: string;
    description: string;
    verified: boolean;
    demo: boolean;
};

export const studentExperiences: StudentExperience[] = [
    {
        id: "experience-1",
        companyId: "1",
        role: "Software Engineering Intern",
        duration: "8 weeks",
        year: 2026,
        rating: 4.5,
        projectRating: 5,
        mentorshipRating: 4,
        stipendRating: 5,
        communicationRating: 4,
        title: "Good exposure to real development work",
        description:
            "Demo experience showing how a student review will appear on InternSure. This is sample content and is not a real student review.",
        verified: false,
        demo: true,
    },
    {
        id: "experience-2",
        companyId: "1",
        role: "Web Development Intern",
        duration: "10 weeks",
        year: 2026,
        rating: 4,
        projectRating: 4,
        mentorshipRating: 4,
        stipendRating: 4,
        communicationRating: 4,
        title: "Useful internship for beginners",
        description:
            "Demo experience showing the future student experience format. Real submissions will be verified before contributing to company insights.",
        verified: false,
        demo: true,
    },
];

export const companies: Company[] = [
    {
        id: "1",
        name: "TechNova Labs",
        slug: "technova-labs",
        description:
            "A software development company focused on web applications and developer tools.",
        website: "https://example.com",
        location: "Bengaluru, India",
        trustScore: 91,
        internshipScore: 87,
        verified: true,
        tags: ["Software", "Web Development", "Engineering"],
    },
    {
        id: "2",
        name: "DataSphere",
        slug: "datasphere",
        description:
            "A technology company working on data platforms, analytics, and machine learning solutions.",
        website: "https://example.com",
        location: "Hyderabad, India",
        trustScore: 88,
        internshipScore: 84,
        verified: true,
        tags: ["Data", "AI/ML", "Analytics"],
    },
    {
        id: "3",
        name: "CloudPeak Systems",
        slug: "cloudpeak-systems",
        description:
            "A cloud technology company building infrastructure and developer-focused solutions.",
        website: "https://example.com",
        location: "Pune, India",
        trustScore: 82,
        internshipScore: 79,
        verified: true,
        tags: ["Cloud", "DevOps", "Engineering"],
    },
];