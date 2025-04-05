
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  {
    id: "web-development",
    name: "Web Development",
    description: "Innovative web applications built with modern technologies like React, Angular, and Node.js.",
    icon: "https://source.unsplash.com/random/600x400/?web",
    count: 42
  },
  {
    id: "mobile-apps",
    name: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android devices.",
    icon: "https://source.unsplash.com/random/600x400/?mobile",
    count: 35
  },
  {
    id: "ai-machine-learning",
    name: "AI & Machine Learning",
    description: "Innovative solutions powered by artificial intelligence and machine learning algorithms.",
    icon: "https://source.unsplash.com/random/600x400/?ai",
    count: 28
  },
  {
    id: "iot-projects",
    name: "IoT Projects",
    description: "Internet of Things solutions connecting devices and systems for real-world applications.",
    icon: "https://source.unsplash.com/random/600x400/?iot",
    count: 24
  },
  {
    id: "blockchain",
    name: "Blockchain",
    description: "Decentralized applications and systems built on blockchain technology.",
    icon: "https://source.unsplash.com/random/600x400/?blockchain",
    count: 18
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Projects that analyze large datasets to derive insights and predict trends.",
    icon: "https://source.unsplash.com/random/600x400/?data",
    count: 31
  }
];

export const getCategoryById = (id: string) => {
  return categories.find(category => category.id === id);
};
