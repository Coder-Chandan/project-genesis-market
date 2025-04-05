
export interface Project {
  id: string;
  title: string;
  category: string;
  price: number;
  author: string;
  rating: number;
  sales: number;
  image: string;
  description: string;
  features: string[];
  isFeatured: boolean;
  dateAdded: string;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Student Attendance System",
    category: "AI & Machine Learning",
    price: 199.99,
    author: "Alex Johnson",
    rating: 4.8,
    sales: 74,
    image: "https://source.unsplash.com/random/600x400/?ai",
    description: "A facial recognition system that automates student attendance tracking in educational institutions, complete with admin dashboard, reports, and mobile app integration.",
    features: [
      "Facial recognition API",
      "Real-time attendance tracking",
      "Admin dashboard",
      "Report generation",
      "Mobile app with cross-platform support",
      "Cloud database integration"
    ],
    isFeatured: true,
    dateAdded: "2023-10-15"
  },
  {
    id: "2",
    title: "Smart Inventory Management System",
    category: "Web Development",
    price: 149.99,
    author: "Sarah Williams",
    rating: 4.5,
    sales: 102,
    image: "https://source.unsplash.com/random/600x400/?inventory",
    description: "A comprehensive inventory management system with barcode scanning, real-time updates, and analytics for small to medium businesses.",
    features: [
      "Barcode/QR code integration",
      "Real-time stock updates",
      "Supplier management",
      "Purchase order automation",
      "Sales analytics dashboard",
      "Multiple user roles"
    ],
    isFeatured: true,
    dateAdded: "2023-09-22"
  },
  {
    id: "3",
    title: "Blockchain-based Voting System",
    category: "Blockchain",
    price: 299.99,
    author: "Michael Chen",
    rating: 4.9,
    sales: 56,
    image: "https://source.unsplash.com/random/600x400/?blockchain",
    description: "A secure and transparent voting system built on blockchain technology, ensuring tamper-proof elections and real-time result verification.",
    features: [
      "Ethereum smart contracts",
      "Biometric voter verification",
      "Real-time vote counting",
      "Audit trail",
      "Mobile and web interfaces",
      "Administrator controls"
    ],
    isFeatured: true,
    dateAdded: "2023-11-05"
  },
  {
    id: "4",
    title: "Health Monitoring IoT Solution",
    category: "IoT Projects",
    price: 249.99,
    author: "Emily Rodriguez",
    rating: 4.7,
    sales: 89,
    image: "https://source.unsplash.com/random/600x400/?health,iot",
    description: "An IoT-based health monitoring system that tracks vital signs and alerts caregivers about potential health issues in real-time.",
    features: [
      "Multiple health sensors",
      "Real-time monitoring",
      "Mobile alerts",
      "Cloud data storage",
      "Doctor/caregiver dashboard",
      "Historical data analysis"
    ],
    isFeatured: false,
    dateAdded: "2023-08-10"
  },
  {
    id: "5",
    title: "E-commerce Platform with AR",
    category: "Web Development",
    price: 199.99,
    author: "Daniel Park",
    rating: 4.6,
    sales: 122,
    image: "https://source.unsplash.com/random/600x400/?ecommerce",
    description: "A fully-featured e-commerce platform with augmented reality capabilities allowing customers to visualize products in their own space before purchasing.",
    features: [
      "AR product visualization",
      "Secure payment gateway",
      "Inventory management",
      "Customer reviews system",
      "Admin dashboard",
      "Analytics and reporting"
    ],
    isFeatured: true,
    dateAdded: "2023-09-18"
  },
  {
    id: "6",
    title: "Urban Transportation Optimization",
    category: "Data Science",
    price: 179.99,
    author: "Lisa Nelson",
    rating: 4.4,
    sales: 65,
    image: "https://source.unsplash.com/random/600x400/?transportation",
    description: "A data science project that optimizes urban transportation routes and schedules using machine learning algorithms and real-time traffic data.",
    features: [
      "Machine learning algorithms",
      "Traffic pattern analysis",
      "Route optimization",
      "Predictive modeling",
      "Interactive visualizations",
      "API integration with map services"
    ],
    isFeatured: false,
    dateAdded: "2023-10-28"
  },
  {
    id: "7",
    title: "Language Learning Mobile App",
    category: "Mobile Apps",
    price: 129.99,
    author: "Kevin Martinez",
    rating: 4.7,
    sales: 210,
    image: "https://source.unsplash.com/random/600x400/?language,app",
    description: "A comprehensive language learning application that uses AI to adapt to individual learning styles, featuring speech recognition and gamification elements.",
    features: [
      "Speech recognition",
      "Adaptive learning",
      "Gamification elements",
      "Progress tracking",
      "Offline access",
      "Multiple language support"
    ],
    isFeatured: true,
    dateAdded: "2023-07-15"
  },
  {
    id: "8",
    title: "Predictive Maintenance System",
    category: "IoT Projects",
    price: 259.99,
    author: "Robert Thompson",
    rating: 4.8,
    sales: 78,
    image: "https://source.unsplash.com/random/600x400/?maintenance,industrial",
    description: "An IoT system that predicts equipment failures before they occur, using sensors, machine learning, and real-time analytics to reduce downtime and maintenance costs.",
    features: [
      "Sensor integration",
      "Predictive algorithms",
      "Real-time monitoring",
      "Alert system",
      "Maintenance scheduling",
      "Analytics dashboard"
    ],
    isFeatured: false,
    dateAdded: "2023-11-12"
  }
];

export const featuredProjects = projects.filter(project => project.isFeatured);

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id);
};

export const getProjectsByCategory = (category: string) => {
  return projects.filter(project => project.category.toLowerCase() === category.toLowerCase());
};

export const getCategories = () => {
  const categories = new Set(projects.map(project => project.category));
  return Array.from(categories);
};
