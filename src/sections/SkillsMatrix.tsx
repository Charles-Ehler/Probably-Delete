import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Strategy & Design',
    skills: [
      'Instructional Design',
      'Curriculum Mapping',
      'Blended Learning',
      'Microlearning',
      'Assessment Design',
      'Storyboarding',
      'QA Standards',
      'Change Management',
    ],
  },
  {
    title: 'Development & Media',
    skills: [
      'Articulate Storyline',
      'Rise 360',
      'Camtasia',
      'Video Production',
      'Job Aids',
      'Facilitator Guides',
      '360° Content',
      'Accessibility',
    ],
  },
  {
    title: 'Systems & Ops',
    skills: [
      'LMS Administration',
      'Reporting & Dashboards',
      'Train‑the‑Trainer',
      'Project Management',
      'Stakeholder Alignment',
      'Rollout Planning',
      'Governance',
      'Continuous Improvement',
    ],
  },
];

const tools = [
  'Articulate Storyline',
  'Rise 360',
  'Camtasia',
  'LMS Administration',
  'Excel/Sheets',
  'Monday/Jira',
  'Video Production',
  '360° Interactive',
];

const SkillsMatrix = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Columns animation
      columnsRef.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

      // Tools animation
      gsap.fromTo(toolsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: toolsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative bg-[#F4F2EE] py-[10vh] px-6 lg:px-[6vw] z-[70]"
    >
      {/* Header */}
      <h2
        ref={headerRef}
        className="font-display font-semibold text-[clamp(32px,3.6vw,48px)] text-[#0E0F11] text-center mb-12 lg:mb-16"
      >
        Capabilities
      </h2>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
        {skillCategories.map((category, index) => (
          <div
            key={category.title}
            ref={el => { columnsRef.current[index] = el; }}
          >
            {/* Column Header */}
            <h3 className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#6E727A] mb-6">
              {category.title}
            </h3>

            {/* Skills List */}
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span key={skill} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tools Section */}
      <div ref={toolsRef} className="pt-8 border-t border-[#0E0F11]/10">
        <h3 className="font-mono text-[12px] uppercase tracking-[0.12em] text-[#6E727A] mb-6 text-center">
          Tools
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 bg-[#0E0F11] text-white rounded-full font-body text-[13px] font-medium"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;
