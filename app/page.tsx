'use client';
/**
 * INSTRUCTIONS FOR NEXT.JS:
 * 1. Create a file `app/page.tsx` (make sure it ends in .tsx)
 * 2. Paste this entire code.
 * 3. IMPORTANT: Put a file named 'bgm.mp3' in your 'public' folder.
 */

import React, { useState, useEffect, useRef } from 'react';

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

type Theme = 'dark' | 'light';

// ==========================================
// 2. CONFIGURATION (EDITABLE DETAILS)
// ==========================================
const RESUME_DATA: ResumeData = {
  profile: {
    name: "My Online CV",
    role: "Hi, I'm Kevin Mercado, Welcome to my webpage.", 
    bio: "Role: Web Design, Frontend Developer",
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
      tech: ["Next.js", "Tailwind"],
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
  // Theme Toggle Icons
  Sun: ({ className }: IconProps) => (<svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>),
  Moon: ({ className }: IconProps) => (<svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>),
  // NEW: Audio Icons
  Volume2: ({ className }: IconProps) => (<svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>),
  VolumeX: ({ className }: IconProps) => (<svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>),

  // Content Icons
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
    theme: Theme;
}

const ZoomModal = ({ imageUrl, onClose, theme }: ZoomModalProps) => {
  if (!imageUrl) return null;

  const modalBg = theme === 'dark' ? 'bg-slate-950/90' : 'bg-white/90';
  const closeBtnBg = theme === 'dark' ? 'bg-black/50 text-white hover:bg-black/80' : 'bg-slate-800/80 text-white hover:bg-slate-900';

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-300 ${modalBg}`}
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
          className={`absolute top-4 right-4 p-3 rounded-full transition-colors z-10 ${closeBtnBg}`}
          title="Close"
        >
          <Icons.X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};


// ==========================================
// 5. MAIN COMPONENT (THEME MANAGER)
// ==========================================
export default function Portfolio() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  // NEW: Audio state and ref
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Apply theme class to document element
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // NEW: Audio toggle handler
  const toggleAudio = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    }
  };

  const goHome = () => {
    // In a single-page resume, going home just closes modals/resets views.
  };
  
  // Dynamic theme variables for overall styling and gradient
  const mainClass = theme === 'dark' 
    ? 'bg-slate-950 text-slate-300 selection:bg-emerald-500/30 selection:text-emerald-200' 
    : 'bg-white text-slate-800 selection:bg-teal-200 selection:text-teal-900';

  const gradientStyle = {
    // Radial gradient for a subtle, modern background effect
    backgroundImage: theme === 'dark' 
      ? 'radial-gradient(at 0% 0%, #020617 0%, #1e293b 40%, #0f172a 100%)' // Slate/Dark Blue
      : 'radial-gradient(at 0% 0%, #f1f5f9 0%, #ffffff 40%, #e2e8f0 100%)', // Soft White/Light Slate
  };

  return (
    <div 
        className={`min-h-screen font-sans overflow-y-auto relative ${mainClass}`}
        style={gradientStyle}
    >
      {/* NEW: Background Audio Element */}
      <audio ref={audioRef} loop src="bgm1.mp3" />

      {/* --- HEADER --- */}
      <nav 
        className={`sticky top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-slate-950/90 border-slate-800' 
            : 'bg-white/90 border-slate-200'
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            onClick={goHome} 
            className={`text-xl font-bold tracking-tighter cursor-pointer transition-colors ${
              theme === 'dark' ? 'text-slate-100 hover:text-emerald-400' : 'text-slate-900 hover:text-teal-600'
            }`}
          >
            {RESUME_DATA.profile.name}
            <span className={theme === 'dark' ? 'text-emerald-500' : 'text-teal-500'}>.</span>
          </div>
          <div className="flex items-center gap-4">
            {RESUME_DATA.profile.social.map((link) => (
              <a 
                key={link.label} 
                href={link.url}
                className={`text-sm font-medium transition-colors ${
                  theme === 'dark' ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                {link.label}
              </a>
            ))}
            
            {/* NEW: Audio Toggle Button */}
            <button
                onClick={toggleAudio}
                className={`p-2 rounded-full transition-colors ${
                    theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-200'
                } ${isPlaying ? (theme === 'dark' ? 'text-emerald-400' : 'text-teal-600') : ''}`}
                title={isPlaying ? "Pause Music" : "Play Music"}
            >
                {isPlaying ? <Icons.Volume2 className="w-5 h-5" /> : <Icons.VolumeX className="w-5 h-5" />}
            </button>

            {/* Theme Toggle Button */}
            <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${
                    theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-200'
                }`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark' ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-8 pb-12 px-6">
        <ResumeView setZoomImage={setZoomImage} theme={theme} />
      </main>

      {/* Zoom Modal Overlay */}
      {zoomImage && <ZoomModal imageUrl={zoomImage} onClose={() => setZoomImage(null)} theme={theme} />}

    </div>
  );
}

// ==========================================
// 6. RESUME VIEW (LANDING PAGE)
// ==========================================

interface ResumeViewProps {
  setZoomImage: (url: string | null) => void;
  theme: Theme;
}

// Utility function to map dynamic classes explicitly for Tailwind compilation
const getDynamicClasses = (theme: Theme) => {
  if (theme === 'dark') {
    return {
      accentHover: 'hover:border-emerald-500/50 hover:text-emerald-400',
      groupTextHover: 'group-hover:text-emerald-400',
      groupIconHover: 'group-hover:text-emerald-400',
      imageGlow: 'from-emerald-200 to-emerald-900',
      badge: 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20',
      timelineDot: 'bg-emerald-500',
      companyText: 'text-emerald-500/80',
      navDot: 'text-emerald-500',
      glowDot: 'bg-emerald-400',
      glowDotBg: 'bg-emerald-500'
    };
  } else {
    return {
      accentHover: 'hover:border-teal-400/50 hover:text-teal-600',
      groupTextHover: 'group-hover:text-teal-600',
      groupIconHover: 'group-hover:text-teal-600',
      imageGlow: 'from-teal-200 to-teal-900',
      badge: 'text-teal-600 bg-teal-100 border border-teal-300',
      timelineDot: 'bg-teal-500',
      companyText: 'text-teal-600/80',
      navDot: 'text-teal-500',
      glowDot: 'bg-teal-400',
      glowDotBg: 'bg-teal-500'
    };
  }
};


const ResumeView = ({ setZoomImage, theme }: ResumeViewProps) => {
  const accentColor = theme === 'dark' ? 'emerald' : 'teal';
  const baseText = theme === 'dark' ? 'text-slate-100' : 'text-slate-900';
  const cardBg = theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-md';
  const cardHover = theme === 'dark' ? 'hover:shadow-2xl hover:shadow-emerald-500/5' : 'hover:shadow-lg hover:shadow-teal-200';
  const iconColor = theme === 'dark' ? 'text-emerald-500' : 'text-teal-600';
  const badgeClasses = theme === 'dark' ? `text-${accentColor}-400 bg-${accentColor}-500/10 border border-${accentColor}-500/20` : `text-${accentColor}-600 bg-${accentColor}-100 border border-${accentColor}-300`;

  // Get fixed hover classes and colors
  const dynamicClasses = getDynamicClasses(theme);

  const heroH1Style = theme === 'dark'
    ? { textShadow: '0 0 10px rgba(16, 185, 129, 0.5), 0 0 20px rgba(16, 185, 129, 0.2)' }
    : { textShadow: '0 0 10px rgba(13, 148, 136, 0.4), 0 0 20px rgba(13, 148, 136, 0.1)' };

  return (
    <div className="max-w-4xl mx-auto space-y-20">
      
      {/* HERO SECTION WITH IMAGE */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex-1 space-y-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${dynamicClasses.badge}`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dynamicClasses.glowDot}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${dynamicClasses.glowDotBg}`}></span>
            </span>
            Available for hire
          </div>
          {/* MODIFIED: Applied dynamic text shadow style */}
          <h1 
            className={`text-4xl md:text-6xl font-bold ${baseText} tracking-tight leading-tight transition-colors duration-300`}
            style={heroH1Style}
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
          {/* Dynamic Glow Effect (FIXED) */}
          <div className={`absolute -inset-1 bg-gradient-to-r ${dynamicClasses.imageGlow} rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000`}></div>
          <div className={`relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 ${theme === 'dark' ? 'border-slate-900' : 'border-white'} shadow-2xl`}>
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
        <h2 className={`text-2xl font-bold ${baseText} mb-6 flex items-center gap-2 transition-colors duration-300`}>
          <Icons.User className={`w-5 h-5 ${iconColor}`} />
          About Me
        </h2>
        <div className={`${cardBg} rounded-xl p-8 leading-relaxed ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
          {RESUME_DATA.profile.about}
        </div>
      </section>

      {/* WORK EXPERIENCE SECTION (UPDATED with image card) */}
      <section>
        <h2 className={`text-2xl font-bold ${baseText} mb-8 flex items-center gap-2 transition-colors duration-300`}>
          <Icons.Briefcase className={`w-5 h-5 ${iconColor}`} />
          Work Experience
        </h2>
        <div className={`relative border-l ${theme === 'dark' ? 'border-slate-800' : 'border-slate-300'} ml-3 space-y-12`}>
          {RESUME_DATA.experience.map((exp) => (
            <div key={exp.id} className="relative pl-12">
              {/* Timeline Dot (FIXED) */}
              <div className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${dynamicClasses.timelineDot} shadow-[0_0_10px_rgba(16,185,129,0.5)]`}></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Experience Details (Spans 2 columns on medium screens) */}
                <div className="md:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className={`text-xl font-bold ${baseText}`}>{exp.role}</h3>
                    {/* Fixed badge classes */}
                    <span className={`text-sm font-mono ${dynamicClasses.badge} w-fit mt-2 sm:mt-0 px-3 py-1 rounded-full`}>
                      {exp.date}
                    </span>
                  </div>
                  {/* Fixed text color */}
                  <h4 className={`text-lg ${dynamicClasses.companyText} mb-4`}>{exp.company}</h4>
                  <p className="text-slate-400 leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>
                </div>
                
                {/* Image Card (Spans 1 column on medium screens) */}
                <div className="md:col-span-1">
                  <div className={`${cardBg.split(' ')[0]} border ${theme === 'dark' ? 'border-slate-800' : 'border-slate-300'} rounded-xl overflow-hidden shadow-lg`}>
                    <img 
                      src={exp.imageUrl} 
                      alt={`Workplace image for ${exp.company}`}
                      className="w-full h-auto object-cover"
                      // Fallback if image fails to load
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src = "https://placehold.co/400x250/1e293b/d1d5db?text=Image+Unavailable";
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
        <h2 className={`text-2xl font-bold ${baseText} mb-6 flex items-center gap-2 transition-colors duration-300`}>
          <Icons.Terminal className={`w-5 h-5 ${iconColor}`} />
          Technical Arsenal
        </h2>
        <div className="flex flex-wrap gap-3">
          {RESUME_DATA.skills.map((skill) => (
            <span 
              key={skill} 
              className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors cursor-default 
                ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'}
                ${dynamicClasses.accentHover}` // FIXED: Used explicit hover class
              }
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION (Updated for external link with image) */}
      <section>
        <h2 className={`text-2xl font-bold ${baseText} mb-8 flex items-center gap-2 transition-colors duration-300`}>
          <Icons.Github className={`w-5 h-5 ${iconColor}`} />
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESUME_DATA.projects.map((project) => (
            <a 
              key={project.id} 
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative border rounded-xl overflow-hidden transition-all duration-300 ${cardBg} ${cardHover} hover:scale-[1.02]`}
            >
              {/* Project Image */}
              <div className={`w-full h-48 overflow-hidden ${theme === 'dark' ? 'bg-slate-950/50' : 'bg-slate-100'}`}>
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
                    <h3 className={`text-xl font-bold ${baseText} ${dynamicClasses.groupTextHover} transition-colors`}> {/* FIXED: Used explicit hover class */}
                      {project.title}
                    </h3>
                    <Icons.External className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'} ${dynamicClasses.groupIconHover} transition-colors shrink-0`} /> {/* FIXED: Used explicit hover class */}
                </div>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(t => (
                    <span key={t} className={`text-xs font-mono ${dynamicClasses.badge} px-2 py-1 rounded`}> {/* Fixed badge */}
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
        <h2 className={`text-2xl font-bold ${baseText} mb-6 flex items-center gap-2 transition-colors duration-300`}>
          <Icons.Award className={`w-5 h-5 ${iconColor}`} />
          Certifications
        </h2>
        {/* FIX: Changed grid-cols-2 to grid-cols-1 for better mobile width, and adjusted gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"> 
          {RESUME_DATA.certificates.map((cert, idx) => (
            <div 
              key={idx} 
              onClick={() => setZoomImage(cert.fullCertificateUrl)}
              className={`group flex items-start p-4 border rounded-xl transition-all shadow-md cursor-pointer 
                ${cardBg} ${cardHover}`}
            >
              {/* Certificate Image/Badge */}
              <div className={`w-12 h-12 shrink-0 rounded-full overflow-hidden mr-4 border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'} mt-1`}>
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
                <h4 className={`font-bold ${baseText} ${dynamicClasses.groupTextHover} transition-colors truncate`}>{cert.name}</h4> {/* FIXED: Used explicit hover class */}
                <p className="text-sm text-slate-400 truncate mb-1 sm:mb-0">{cert.issuer}</p>
              </div>
              
              {/* FIX: Ensure date and link stack vertically for small width, prevents overflow */}
              <div className="ml-4 flex flex-col items-end gap-1 shrink-0">
                {/* Fixed badge */}
                <span className={`text-[10px] font-mono ${dynamicClasses.badge} px-2 py-1 rounded whitespace-nowrap`}>
                  {cert.date}
                </span>
                {/* External link button (Clicking this is the only way to navigate away) */}
                <a 
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevent card click from triggering modal
                  className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-200'} self-end`}
                >
                  <Icons.External className={`w-4 h-4 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'} ${dynamicClasses.groupIconHover} transition-colors`} /> {/* FIXED: Used explicit hover class */}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};