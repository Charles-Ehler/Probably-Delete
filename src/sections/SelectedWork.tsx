import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tags: string[];
  results: string[];
  role: string;
  tools: string[];
}

const projects: Project[] = [
  {
    title: 'Blended Leadership Enablement',
    description: 'Leaders needed practical, repeatable training to run shifts and coach teams.',
    tags: ['Leadership Development', 'Blended Learning', 'Enablement'],
    results: ['Improved leader consistency across locations', 'Faster readiness for new leaders'],
    role: 'Program lead and designer',
    tools: ['Rise 360', 'Storyline', 'LMS', 'Video']
  },
  {
    title: 'Restaurant System Rollout Training',
    description: 'New systems launched fast, and teams needed clear, simple workflows.',
    tags: ['Change Management', 'Operations', 'Training Strategy'],
    results: ['Higher adoption', 'Fewer field escalations'],
    role: 'End-to-end enablement partner',
    tools: ['Job aids', 'LMS', 'Live training', 'Video']
  },
  {
    title: 'Inventory System Implementation Training',
    description: 'Inventory process changed, and restaurants needed structured training and support.',
    tags: ['Operational Enablement', 'Implementation', 'Live Training'],
    results: ['Smoother go-live', 'Reduced training friction'],
    role: 'Training lead, facilitator, builder',
    tools: ['LMS', 'Live sessions', 'Guides', 'Reporting']
  },
  {
    title: 'Train-the-Trainer Program',
    description: 'In-store trainers needed standards, coaching tools, and consistency.',
    tags: ['Program Design', 'Coaching', 'Standards'],
    results: ['Stronger trainer bench', 'More consistent onboarding'],
    role: 'Program designer and owner',
    tools: ['LMS', 'Facilitator materials', 'Assessments']
  },
  {
    title: 'LMS Administration and Reporting',
    description: 'Leaders needed visibility into completion and readiness.',
    tags: ['LMS', 'Reporting', 'Governance'],
    results: ['Faster insights', 'Clearer compliance tracking'],
    role: 'LMS admin and reporting owner',
    tools: ['LMS reports', 'Excel/Sheets', 'Dashboards']
  },
  {
    title: 'Video-Based Microlearning Library',
    description: 'Frontline teams needed short, usable training for high-frequency tasks.',
    tags: ['Microlearning', 'Video', 'Performance Support'],
    results: ['Faster skill pickup', 'Reduced variation'],
    role: 'Content creator and editor',
    tools: ['Camtasia', 'Video', 'Job aids', 'LMS']
  }
];

const SelectedWork = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Project cards animation
      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.08,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToCaseStudy = (index: number) => {
    const caseStudyIds = ['case-study-a', 'case-study-b'];
    const targetId = index < 2 ? caseStudyIds[index] : 'principles';
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="relative bg-[#F4F2EE] py-[10vh] px-6 lg:px-[6vw] z-20"
    >
      {/* Header */}
      <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
        <h2 className="font-display font-semibold text-[clamp(32px,3.6vw,48px)] text-[#0E0F11] mb-4 lg:mb-0">
          Selected work
        </h2>
        <p className="font-body text-[15px] text-[#6E727A] max-w-[40ch]">
          A few recent programs—designed for clarity, built for scale.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={el => { projectRefs.current[index] = el; }}
            className="group relative bg-white border border-[#0E0F11]/10 rounded-xl p-6 card-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            onClick={() => scrollToCaseStudy(index)}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#6E727A] bg-[#F4F2EE] px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="font-display font-semibold text-[20px] text-[#0E0F11] mb-2 group-hover:text-[#2F5CFF] transition-colors">
              {project.title}
            </h3>

            {/* Description */}
            <p className="font-body text-[14px] text-[#6E727A] leading-[1.6] mb-4">
              {project.description}
            </p>

            {/* Results */}
            <div className="mb-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#2F5CFF] block mb-2">
                Results
              </span>
              <ul className="space-y-1">
                {project.results.map((result, i) => (
                  <li key={i} className="font-body text-[13px] text-[#0E0F11]/80 flex items-start gap-2">
                    <span className="text-[#2F5CFF] mt-1">•</span>
                    {result}
                  </li>
                ))}
              </ul>
            </div>

            {/* Role & Tools */}
            <div className="pt-4 border-t border-[#0E0F11]/8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#6E727A] block mb-1">
                    Role
                  </span>
                  <span className="font-body text-[13px] text-[#0E0F11]">
                    {project.role}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#2F5CFF] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-body text-[13px] font-medium">View</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
