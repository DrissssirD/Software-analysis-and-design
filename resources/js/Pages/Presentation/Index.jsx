import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Monitor, Lock, Database, Layout, Code, Users, MessageSquare, Search, Gauge, Lightbulb, Award, HelpCircle } from 'lucide-react';

const slides = [
  {
    type: "title",
    title: "SkillBridge Job Portal",
    subtitle: "Connecting Talent with Opportunity",
    description: "Team Project Presentation 2024"
  },
  {
    type: "team",
    title: "Meet Our Team",
    team: [
      { role: "Project Manager", name: "[Team Member 1]", responsibilities: "Project coordination, timeline management" },
      { role: "Frontend Developer", name: "[Team Member 2]", responsibilities: "UI implementation, React components" },
      { role: "UI/UX Designer", name: "[Team Member 3]", responsibilities: "User interface design, user experience" },
      { role: "Backend Developer", name: "[Team Member 4]", responsibilities: "Server logic, API development" },
      { role: "Database Engineer", name: "[Team Member 5]", responsibilities: "Database design, optimization" },
      { role: "Security Specialist", name: "[Team Member 6]", responsibilities: "Security implementation, testing" }
    ]
  },
  {
    type: "overview",
    title: "Project Overview",
    points: [
      "Modern job portal platform",
      "Seamless company-candidate matching",
      "Real-time communication",
      "Secure data handling",
      "Responsive design",
      "Intuitive user experience"
    ],
    icon: Monitor
  },
  {
    type: "features",
    title: "Key Features",
    features: [
      { name: "Dual User Types", desc: "Separate interfaces for companies and job seekers" },
      { name: "Smart Job Matching", desc: "Advanced filtering and search capabilities" },
      { name: "Real-time Chat", desc: "Instant messaging between parties" },
      { name: "File Management", desc: "Secure resume and document handling" },
      { name: "Profile Management", desc: "Detailed user profiles and preferences" },
      { name: "Application Tracking", desc: "Complete application lifecycle management" }
    ]
  },
  {
    type: "tech-stack",
    title: "Technology Stack",
    sections: [
      {
        title: "Frontend",
        items: ["React 18", "Inertia.js", "Tailwind CSS", "Lucide Icons"]
      },
      {
        title: "Backend",
        items: ["Laravel 10", "MySQL", "Redis", "REST API"]
      }
    ],
    icon: Code
  },
  {
    type: "security",
    title: "Security Implementation",
    features: [
      "Multi-factor Authentication",
      "Role-based Access Control",
      "CSRF Protection",
      "Secure File Handling",
      "Data Encryption",
      "Input Validation"
    ],
    icon: Lock
  },
  {
    type: "database",
    title: "Database Architecture",
    schema: [
      { table: "Users", relations: ["One-to-One with Profiles"] },
      { table: "Company Profiles", relations: ["One-to-Many with Jobs"] },
      { table: "Job Posts", relations: ["Many-to-Many with Applications"] },
      { table: "Applications", relations: ["Many-to-One with Users"] },
      { table: "Messages", relations: ["Many-to-One with Conversations"] }
    ],
    icon: Database
  },
  {
    type: "frontend",
    title: "Frontend Architecture",
    components: [
      "Reusable UI Components",
      "State Management",
      "Form Validation",
      "Real-time Updates",
      "Responsive Layouts"
    ],
    icon: Layout
  },
  {
    type: "backend",
    title: "Backend Architecture",
    features: [
      "MVC Pattern",
      "Service Layer",
      "Repository Pattern",
      "Event Driven",
      "Queue Management"
    ]
  },
  {
    type: "messaging",
    title: "Messaging System",
    features: [
      "Real-time Chat",
      "File Sharing",
      "Read Receipts",
      "Typing Indicators",
      "Message History"
    ],
    icon: MessageSquare
  },
  {
    type: "job-management",
    title: "Job Management",
    sections: [
      {
        title: "Company Features",
        items: ["Post Jobs", "Track Applications", "Candidate Search"]
      },
      {
        title: "Job Seeker Features",
        items: ["Apply to Jobs", "Track Applications", "Save Searches"]
      }
    ]
  },
  {
    type: "search",
    title: "Search & Filter System",
    features: [
      "Advanced Filtering",
      "Saved Searches",
      "Real-time Results",
      "Location-based Search",
      "Skill Matching"
    ],
    icon: Search
  },
  {
    type: "performance",
    title: "Performance Optimization",
    metrics: [
      "Page Load Time < 2s",
      "Time to Interactive < 3s",
      "First Contentful Paint < 1s",
      "Cache Implementation",
      "Code Splitting"
    ],
    icon: Gauge
  },
  {
    type: "user-experience",
    title: "User Experience",
    features: [
      "Intuitive Navigation",
      "Clear Call-to-Actions",
      "Responsive Design",
      "Error Handling",
      "Loading States"
    ]
  },
  {
    type: "security-measures",
    title: "Security Measures",
    measures: [
      "SSL/TLS Encryption",
      "Password Hashing",
      "File Validation",
      "Rate Limiting",
      "Session Management"
    ]
  },
  {
    type: "testing",
    title: "Testing Strategy",
    levels: [
      "Unit Testing",
      "Integration Testing",
      "End-to-End Testing",
      "Security Testing",
      "Performance Testing"
    ]
  },
  {
    type: "deployment",
    title: "Deployment Process",
    steps: [
      "Version Control",
      "CI/CD Pipeline",
      "Environment Config",
      "Database Migration",
      "Monitoring Setup"
    ]
  },
  {
    type: "challenges",
    title: "Challenges & Solutions",
    items: [
      { challenge: "Real-time Updates", solution: "WebSocket Implementation" },
      { challenge: "File Security", solution: "Encrypted Storage" },
      { challenge: "Search Performance", solution: "Elastic Search" },
      { challenge: "User Authentication", solution: "JWT + OAuth" }
    ],
    icon: Lightbulb
  },
  {
    type: "achievements",
    title: "Key Achievements",
    points: [
      "Secure Authentication",
      "Real-time Messaging",
      "Optimized Search",
      "Mobile Responsiveness",
      "Fast Load Times"
    ],
    icon: Award
  },
  {
    type: "metrics",
    title: "Project Metrics",
    stats: [
      { label: "Controllers", value: "25+" },
      { label: "Components", value: "50+" },
      { label: "API Endpoints", value: "30+" },
      { label: "Test Cases", value: "100+" }
    ]
  },
  {
    type: "lessons",
    title: "Lessons Learned",
    lessons: [
      "Early Planning Importance",
      "Regular Communication",
      "Security First Approach",
      "Continuous Testing",
      "Documentation Value"
    ]
  },
  {
    type: "future",
    title: "Future Enhancements",
    features: [
      "AI Job Matching",
      "Video Interviews",
      "Skills Assessment",
      "Mobile App",
      "Analytics Dashboard"
    ]
  },
  {
    type: "demo",
    title: "Live Demonstration",
    sections: [
      "User Registration",
      "Job Posting",
      "Application Process",
      "Messaging System",
      "Search Function"
    ]
  },
  {
    type: "team-roles",
    title: "Individual Contributions",
    contributions: slides[1].team.map(member => ({
      name: member.name,
      role: member.role,
      key_contributions: ["Feature 1", "Feature 2"]
    }))
  },
  {
    type: "questions",
    title: "Questions?",
    contact: "team@skillbridge.com",
    icon: HelpCircle
  }
];

const SlideContent = ({ slide }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [slide]);

  const fadeIn = "transition-opacity duration-500 " + (isVisible ? "opacity-100" : "opacity-0");

  switch (slide.type) {
    case "title":
      return (
        <div className={`flex flex-col items-center justify-center h-full ${fadeIn}`}>
          <h1 className="text-5xl font-bold text-blue-600 mb-6">{slide.title}</h1>
          <h2 className="text-3xl text-gray-600 mb-4">{slide.subtitle}</h2>
          <p className="text-xl text-gray-500">{slide.description}</p>
        </div>
      );

    case "team":
      return (
        <div className={`grid grid-cols-2 gap-6 ${fadeIn}`}>
          {slide.team.map((member, idx) => (
            <div key={idx} className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-blue-600">{member.role}</h3>
              <p className="text-gray-700">{member.name}</p>
              <p className="text-sm text-gray-500">{member.responsibilities}</p>
            </div>
          ))}
        </div>
      );

    // Add more case handlers for other slide types...

    default:
      return (
        <div className={fadeIn}>
          {slide.icon && <slide.icon className="w-12 h-12 text-blue-600 mb-6" />}
          <ul className="list-disc pl-6 space-y-4">
            {slide.points?.map((point, idx) => (
              <li key={idx} className="text-gray-700">{point}</li>
            ))}
          </ul>
        </div>
      );
  }
};

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = (direction) => {
    setCurrentSlide(prev => {
      const next = prev + direction;
      return Math.max(0, Math.min(next, slides.length - 1));
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight") navigate(1);
    if (e.key === "ArrowLeft") navigate(-1);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="p-8 min-h-96 relative">
          <SlideContent slide={slides[currentSlide]} />
        </div>

        <div className="bg-gray-50 p-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            disabled={currentSlide === 0}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600 ml-4">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
          
          <button
            onClick={() => navigate(1)}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 disabled:opacity-50 disabled:hover:text-gray-600 transition-colors"
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Presentation;