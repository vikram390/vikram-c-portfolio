
import React from 'react';
import { Project, EducationItem, Certification, SkillCategory, ExperienceItem, Language } from './types';

export const USER_INFO = {
  name: "Vikram Chithaiya",
  role: "Aspiring Software / Backend Developer",
  email: "vikram287098@gmail.com",
  phone: "+91 6382287098",
  github: "https://github.com/vikram390",
  linkedin: "https://www.linkedin.com/in/vikramchithaiya",
  resume: "https://drive.google.com/file/d/1C-NpxXUxF9BZHyWJmBA3pHw7vKlEMKME/view?usp=drive_link",
  profilePhoto: "https://i.ibb.co/Gv8dSYsQ/Whats-App-Image-2025-09-30-at-12-00-54-d744245e.jpg"
};

export const PROJECTS: Project[] = [
  {
    id: "excel-db-system",
    title: "Excel-Based Data Management System",
    description: "A simple backend-oriented system that stores and manages user data using Excel as a lightweight database. Includes basic CRUD operations and structured data handling.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "Excel"],
    repoUrl: "https://github.com/vikram390/personal-data-collector"
  },
  {
    id: "portfolio-2024",
    title: "Portfolio Website",
    status: "Live & In Progress",
    description: "An interactive, 3D-animated personal portfolio designed and built within Google AI Studio. This project demonstrates AI-assisted development by integrating complex physics-based animations, a custom Three.js background, and a highly responsive React architecture.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    tags: ["React", "Three.js", "Framer Motion", "Google AI Studio"],
    repoUrl: "https://github.com/vikram390/vikram-c-portfolio"
  },
  {
    id: "ai-ats-analyzer",
    title: "AI ATS Score Analyzer",
    description: "A project that analyzes resumes using AI concepts to estimate ATS compatibility and provide scoring insights. Focuses on resume structure, keyword relevance, and formatting effectiveness.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
    tags: ["HTML", "CSS", "TypeScript", "AI-based logic"],
    repoUrl: "https://github.com/vikram390/AI-ATS-Score"
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "B.Tech in Information Technology (Currently 3rd Year)",
    institution: "SNS College of Technology",
    location: "Coimbatore",
    year: "2023 – 2027",
    icon: "GraduationCap"
  },
  {
    degree: "12th Standard",
    institution: "Government Higher Secondary School Kuniyamuthur",
    location: "Coimbatore",
    year: "2022 – 2023",
    result: "Above 80%",
    icon: "School"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Backend Development Intern",
    company: "FutureTech Solutions",
    location: "Remote",
    period: "June 2024 – Present",
    responsibilities: [
      "Collaborating on building scalable REST APIs using Node.js and PostgreSQL.",
      "Optimizing backend performance by implementing efficient caching strategies.",
      "Integrating third-party services for authentication and payment processing."
    ]
  },
  {
    title: "Frontend Contributor",
    company: "Open Source Community",
    location: "Remote",
    period: "Jan 2024 – May 2024",
    responsibilities: [
      "Enhanced user experience for open-source dashboards using React and Tailwind CSS.",
      "Wrote clean, modular code following industry-standard design patterns.",
      "Fixed UI bugs and improved accessibility across multiple community projects."
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Cybersecurity and Privacy",
    provider: "NPTEL",
    badge: "Certified"
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Programming",
    skills: [
      { name: "C", level: 90 },
      { name: "Java", level: 85 },
      { name: "Python", level: 80 }
    ]
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 85 }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "MongoDB", level: 80 }
    ]
  },
  {
    category: "Core Concepts",
    skills: [
      { name: "OOP", level: 90 },
      { name: "DBMS", level: 85 }
    ]
  },
  {
    category: "Tools & Services",
    skills: [
      { name: "Firebase", level: 80 },
      { name: "API Integration", level: 85 }
    ]
  },
  {
    category: "Additional",
    skills: [
      { name: "Web Automation", level: 75 },
      { name: "AI-assisted Dev", level: 90 }
    ]
  }
];

export const LANGUAGES: Language[] = [
  { name: "Tamil", level: "Fluent (Mother Tongue)", proficiency: 100 },
  { name: "English", level: "Fluent", proficiency: 90 },
  { name: "Hindi", level: "Basic", proficiency: 20 },
  { name: "Japanese", level: "N5 Level", proficiency: 20 }
];
