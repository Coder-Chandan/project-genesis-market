export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  author: string;
  rating: number;
  sales: number;
  image_url?: string;
  is_featured: boolean;
  date_added: string;
  ui_price?: number;
  code_price?: number;
  documentation_price?: number;
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
    image_url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&h=400&q=80",
    description: "A facial recognition system that automates student attendance tracking in educational institutions, complete with admin dashboard, reports, and mobile app integration.",
    is_featured: true,
    date_added: "2023-10-15",
    ui_price: 49.99,
    code_price: 149.99,
    documentation_price: 29.99
  },
  {
    id: "2",
    title: "Smart Inventory Management System",
    category: "Web Development",
    price: 149.99,
    author: "Sarah Williams",
    rating: 4.5,
    sales: 102,
    image_url: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&h=400&q=80",
    description: "A comprehensive inventory management system with barcode scanning, real-time updates, and analytics for small to medium businesses.",
    is_featured: true,
    date_added: "2023-09-22",
    ui_price: 39.99,
    code_price: 99.99,
    documentation_price: 19.99
  },
  {
    id: "3",
    title: "Blockchain-based Voting System",
    category: "Blockchain",
    price: 299.99,
    author: "Michael Chen",
    rating: 4.9,
    sales: 56,
    image_url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&h=400&q=80",
    description: "A secure and transparent voting system built on blockchain technology, ensuring tamper-proof elections and real-time result verification.",
    is_featured: true,
    date_added: "2023-11-05",
    ui_price: 59.99,
    code_price: 199.99,
    documentation_price: 39.99
  },
  {
    id: "4",
    title: "Health Monitoring IoT Solution",
    category: "IoT Projects",
    price: 249.99,
    author: "Emily Rodriguez",
    rating: 4.7,
    sales: 89,
    image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80",
    description: "An IoT-based health monitoring system that tracks vital signs and alerts caregivers about potential health issues in real-time.",
    is_featured: true,
    date_added: "2023-08-10",
    ui_price: 49.99,
    code_price: 179.99,
    documentation_price: 29.99
  },
  {
    id: "5",
    title: "E-commerce Platform with AR",
    category: "Web Development",
    price: 199.99,
    author: "Daniel Park",
    rating: 4.6,
    sales: 122,
    image_url: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=600&h=400&q=80",
    description: "A fully-featured e-commerce platform with augmented reality capabilities allowing customers to visualize products in their own space before purchasing.",
    is_featured: true,
    date_added: "2023-09-18",
    ui_price: 49.99,
    code_price: 149.99,
    documentation_price: 29.99
  },
  {
    id: "6",
    title: "Urban Transportation Optimization",
    category: "Data Science",
    price: 179.99,
    author: "Lisa Nelson",
    rating: 4.4,
    sales: 65,
    image_url: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&h=400&q=80",
    description: "A data science project that optimizes urban transportation routes and schedules using machine learning algorithms and real-time traffic data.",
    is_featured: false,
    date_added: "2023-10-28",
    ui_price: 39.99,
    code_price: 99.99,
    documentation_price: 19.99
  },
  {
    id: "7",
    title: "Language Learning Mobile App",
    category: "Mobile Apps",
    price: 129.99,
    author: "Kevin Martinez",
    rating: 4.7,
    sales: 210,
    image_url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&h=400&q=80",
    description: "A comprehensive language learning application that uses AI to adapt to individual learning styles, featuring speech recognition and gamification elements.",
    is_featured: true,
    date_added: "2023-07-15",
    ui_price: 39.99,
    code_price: 89.99,
    documentation_price: 19.99
  },
  {
    id: "8",
    title: "Predictive Maintenance System",
    category: "IoT Projects",
    price: 259.99,
    author: "Robert Thompson",
    rating: 4.8,
    sales: 78,
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&h=400&q=80",
    description: "An IoT system that predicts equipment failures before they occur, using sensors, machine learning, and real-time analytics to reduce downtime and maintenance costs.",
    is_featured: false,
    date_added: "2023-11-12",
    ui_price: 59.99,
    code_price: 199.99,
    documentation_price: 39.99
  }
];

export const getProjects = () => {
  return Promise.resolve(projects);
};

export const getProjectById = (id: string) => {
  const project = projects.find(p => p.id === id);
  return Promise.resolve(project);
};

export const getFeaturedProjects = (limit = 4) => {
  const featured = projects.filter(p => p.is_featured).slice(0, limit);
  return Promise.resolve(featured);
};

export const getRelatedProjects = (category: string, currentId: string, limit = 4) => {
  const related = projects
    .filter(p => p.category === category && p.id !== currentId)
    .slice(0, limit);
  return Promise.resolve(related);
};
export const getCategories = () => {
  const categories = new Set(projects.map(project => project.category));
  return Array.from(categories);
};

