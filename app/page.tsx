'use client';
/**
 * INSTRUCTIONS FOR NEXT.JS:
 * 1. Create a file `app/page.tsx` (make sure it ends in .tsx)
 * 2. Paste this entire code.
 */

import React, { useState } from 'react';

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

interface SocialLink {
  label: string;
  url: string;
}

interface Profile {
  name: string;
  role: string;
  bio: string; // Short bio for hero
  about: string; // Long bio for "About Me" section
  avatar: string; // URL to profile image
  social: SocialLink[];
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  imageUrl: string; // Image for the project card
  projectUrl: string; // External link for the project
}

interface Experience {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string;
  imageUrl: string; // NEW: Image URL for the company/job
}

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  // Updated fields for external linking
  imageUrl: string; // Image for the certificate card (e.g., badge)
  certificateUrl: string; // External link to verification page
  fullCertificateUrl: string; // New field for zoomable image (e.g., /public/cert.jpg)
}

interface ResumeData {
  profile: Profile;
  skills: string[];
  experience: Experience[];
  projects: Project[];
  certificates: Certificate[];
}

// ==========================================
// 2. CONFIGURATION (EDITABLE DETAILS)
// ==========================================
const RESUME_DATA: ResumeData = {
  profile: {
    name: "Kevin",
    // MODIFIED: Updated role text per your request
    role: "Artificial intelligence is the future, and the future is here", 
    bio: "Role: Web Design, Frontend Developer", // Kept original bio
    about: "I have knowledge in building a website, especially in the frontend. I also have small knowledge in backend with a guide of AI. I'm good at computers when it comes to typing. I got a lot of work experience that is not related to my course. I thrive in collaborative environments and enjoy working with people with good sense of humor",
    avatar: "kev.jpg", // REPLACE THIS WITH YOUR IMAGE URL
    social: [
      { label: "GitHub", url: "https://github.com/ultrakevin143" },
      { label: "Facebook", url: "https://www.facebook.com/osaka.kun.90" }
    ]
  },
  skills: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Node.js",],
  experience: [
    {
      id: "job-1",
      role: "Head Waiter",
      company: "Virtucio Caterers",
      date: "2023 - Present",
      description: "Leading the Team on how to interact with the Clients Properly",
      imageUrl: "virt.jpg" // Placeholder for company image
    },
  ],
  projects: [
    {
      id: "fcfs-sim",
      title: "FCFS Scheduler",
      category: "System Tool",
      description: "A process scheduling visualizer demonstrating First-Come-First-Serve algorithms with real-time Gantt charts.",
      tech: ["React", "Tailwind"],
      imageUrl: "fcfs.jpg", // Replace with project image
      projectUrl: "https://fcfs-nine.vercel.app/" // Replace with live link
    },
    {
      id: "ecommerce",
      title: "ShopAnalytics",
      category: "Web Application",
      description: "Ecommerce computer parts products",
      tech: ["React.js"],
      imageUrl: "shop.jpg", // Replace with project image
      projectUrl: "https://lazappyv3.vercel.app/" // Replace with live link
    }
  ],
  certificates: [
    {
      name: "Creative Web Design",
      issuer: "Tesda",
      date: "June 8 2024",
      imageUrl: "cert.jpg ", // Replace with badge image
      certificateUrl: "cert.jpg",
      fullCertificateUrl: "cert.jpg" // IMPORTANT: Replace with path to your high-res image
    },
    {
      name: "Cookery NCII",
      issuer: "Tesda",
      date: "March 03, 2024",
      imageUrl: "nc.jpg", // Replace with badge image
      certificateUrl: "nc.jpg",
      fullCertificateUrl: "nc.jpg" // IMPORTANT: Replace with path to your high-res image
    }
  ]
};

// ==========================================
// 3. ICONS (PURE SVG - NO LIBRARY REQUIRED)
// ==========================================
interface IconProps {
  className?: string;
}

const Icons = {
  Github: ({ className }: IconProps) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
  ),
  External: ({ className }: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
  ),
  Terminal: ({ className }: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 17l6-6-6-6M12 19h8" /></svg>
  ),
  Chart: ({ className }: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 13h18M5 17l-2 2M17 17l2 2" /></svg>
  ),
  Award: ({ className }: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
  ),
  User: ({ className }: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
  ),
  Briefcase: ({ className }: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
  ),
  X: ({ className }: IconProps) => (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
  )
};

// ==========================================
// 4. ZOOM MODAL COMPONENT
// ==========================================

interface ZoomModalProps {
    imageUrl: string;
    onClose: () => void;
}

const ZoomModal = ({ imageUrl, onClose }: ZoomModalProps) => {
  if (!imageUrl) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-5xl max-h-[95vh] overflow-hidden rounded-xl shadow-2xl shadow-emerald-900/50"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
      >
        <img 
          src={imageUrl} 
          alt="Zoomed Certificate" 
          className="w-full h-full object-contain"
          // Fallback if full image fails
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = "https://placehold.co/1200x800/1e293b/d1d5db?text=Certificate+Image+Unavailable";
            target.className = "w-full h-full object-contain p-20";
          }}
        />
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-3 text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors z-10"
          title="Close"
        >
          <Icons.X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};


// ==========================================
// 5. MAIN COMPONENT
// ==========================================
export default function Portfolio() {
  const [activeView, setActiveView] = useState<'home'>('home');
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const goHome = () => {
    setActiveView('home');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-y-auto">
      
      {/* --- HEADER --- */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            onClick={goHome} 
            className="text-xl font-bold tracking-tighter text-slate-100 hover:text-emerald-400 cursor-pointer transition-colors"
          >
            {RESUME_DATA.profile.name}
            <span className="text-emerald-500">.</span>
          </div>
          <div className="flex gap-4">
            {RESUME_DATA.profile.social.map((link) => (
              <a 
                key={link.label} 
                href={link.url}
                className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <ResumeView setZoomImage={setZoomImage} />
      </main>

      {/* Zoom Modal Overlay */}
      {zoomImage && <ZoomModal imageUrl={zoomImage} onClose={() => setZoomImage(null)} />}

    </div>
  );
}

// ==========================================
// 6. RESUME VIEW (LANDING PAGE)
// ==========================================

interface ResumeViewProps {
  setZoomImage: (url: string | null) => void;
}

const ResumeView = ({ setZoomImage }: ResumeViewProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-20">
      
      {/* HERO SECTION WITH IMAGE */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for hire
          </div>
          {/* MODIFIED: Added custom text shadow style */}
          <h1 
            className="text-4xl md:text-6xl font-bold text-slate-100 tracking-tight leading-tight"
            style={{ textShadow: '0 0 10px rgba(16, 150, 109, 0.5), 0 0 20px rgba(53, 224, 173, 0.2)' }}
          >
            {RESUME_DATA.profile.role}
          </h1>
          {/* Using bio as the secondary descriptive text */}
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            {RESUME_DATA.profile.bio}
          </p>
        </div>
        
        {/* Profile Image Section */}
        <div className="relative shrink-0 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl">
            {/* NOTE: Use a square aspect ratio image for best results.
                If using local file: src="/images/my-photo.jpg" 
            */}
            <img 
              src={RESUME_DATA.profile.avatar} 
              alt={RESUME_DATA.profile.name}
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
            />
          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
          <Icons.User className="w-5 h-5 text-emerald-500" />
          About Me
        </h2>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 leading-relaxed text-slate-300">
          {RESUME_DATA.profile.about}
        </div>
      </section>

      {/* WORK EXPERIENCE SECTION (UPDATED with image card) */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-2">
          <Icons.Briefcase className="w-5 h-5 text-emerald-500" />
          Work Experience
        </h2>
        <div className="relative border-l border-slate-800 ml-3 space-y-12">
          {RESUME_DATA.experience.map((exp) => (
            <div key={exp.id} className="relative pl-12">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Experience Details (Spans 2 columns on medium screens) */}
                <div className="md:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-100">{exp.role}</h3>
                    <span className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                      {exp.date}
                    </span>
                  </div>
                  <h4 className="text-lg text-emerald-500/80 mb-4">{exp.company}</h4>
                  <p className="text-slate-400 leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                </div>
                
                {/* Image Card (Spans 1 column on medium screens) */}
                <div className="md:col-span-1">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={exp.imageUrl} 
                      alt={`Workplace image for ${exp.company}`}
                      className="w-full h-auto object-cover"
                      // Fallback if image fails to load
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src = "https://placehold.co/400x250/1e293b/d1d5db?text=Company+Image+Unavailable";
                        target.className = "w-full h-auto object-contain p-4";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
          <Icons.Terminal className="w-5 h-5 text-emerald-500" />
          Technical Arsenal
        </h2>
        <div className="flex flex-wrap gap-3">
          {RESUME_DATA.skills.map((skill) => (
            <span 
              key={skill} 
              className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 text-sm font-medium hover:border-emerald-500/50 hover:text-emerald-400 transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION (Updated for external link with image) */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-2">
          <Icons.Github className="w-5 h-5 text-emerald-500" />
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESUME_DATA.projects.map((project) => (
            <a 
              key={project.id} 
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5 hover:scale-[1.02]"
            >
              {/* Project Image */}
              <div className="w-full h-48 overflow-hidden bg-slate-950/50">
                <img 
                  src={project.imageUrl}
                  alt={`Preview of ${project.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  // Fallback if image fails to load
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = "https://placehold.co/600x400/1e293b/d1d5db?text=Image+Unavailable";
                    target.className = "w-full h-full object-contain p-8"; // Adjust padding for placeholder text
                  }}
                />
              </div>

              {/* Project Details */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <Icons.External className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono text-emerald-500/80 bg-emerald-500/5 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CERTIFICATES SECTION (Updated for modal zoom and mobile responsiveness) */}
      <section>
        <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
          <Icons.Award className="w-5 h-5 text-emerald-500" />
          Certifications
        </h2>
        {/* FIX: Changed grid-cols-2 to grid-cols-1 for better mobile width, and adjusted gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
          {RESUME_DATA.certificates.map((cert, idx) => (
            <div 
              key={idx} 
              onClick={() => setZoomImage(cert.fullCertificateUrl)}
              className="group flex items-start p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:bg-slate-900 hover:border-emerald-500/30 transition-all shadow-md cursor-pointer"
            >
              {/* Certificate Image/Badge */}
              <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden mr-4 border border-slate-700 mt-1">
                <img 
                  src={cert.imageUrl}
                  alt={`Badge for ${cert.name}`}
                  className="w-full h-full object-cover"
                  // Fallback
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src = "https://placehold.co/100x100/1e293b/d1d5db?text=C";
                    target.className = "w-full h-full object-contain p-3";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors truncate">{cert.name}</h4>
                <p className="text-sm text-slate-400 truncate mb-1 sm:mb-0">{cert.issuer}</p>
              </div>
              
              {/* FIX: Ensure date and link stack vertically for small width, prevents overflow */}
              <div className="ml-4 flex flex-col items-end gap-1 shrink-0">
                <span className="text-[10px] font-mono text-emerald-500 border border-emerald-500/20 px-2 py-1 rounded bg-emerald-500/5 whitespace-nowrap">
                  {cert.date}
                </span>
                {/* External link button (Clicking this is the only way to navigate away) */}
                <a 
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevent card click from triggering modal
                  className="p-1 rounded-full hover:bg-slate-800 self-end"
                >
                  <Icons.External className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

// ==========================================
// 7. REMOVED PROJECT DETAIL VIEW
// ==========================================
// The ProjectDetailView component and its types have been removed as projects now link externally.