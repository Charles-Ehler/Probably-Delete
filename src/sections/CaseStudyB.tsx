import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, FileText, Video, BookOpen, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CaseStudyB = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Phase 1: Entrance (0% - 30%)
      scrollTl.fromTo(imageCardRef.current,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      )
      .fromTo(ruleRef.current,
        { scaleY: 0 },
        { scaleY: 1, transformOrigin: 'top', ease: 'none' },
        0
      )
      .fromTo(textBlockRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      )
      .fromTo(bulletsRef.current?.children || [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
        0.15
      );

      // Phase 3: Exit (70% - 100%)
      scrollTl.fromTo(imageCardRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '6vh', ease: 'power2.in' },
        0.7
      )
      .fromTo(textBlockRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      )
      .fromTo(ruleRef.current,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'top', ease: 'power2.in' },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const artifacts = [
    { label: 'Job aid template', icon: FileText },
    { label: 'Facilitator guide', icon: BookOpen },
    { label: 'Training video', icon: Video },
    { label: 'Adoption report', icon: BarChart3 },
  ];

  return (
    <section
      ref={sectionRef}
      id="case-study-b"
      className="section-pinned bg-[#F4F2EE] z-40"
    >
      {/* Left Image Card */}
      <div
        ref={imageCardRef}
        className="hidden lg:block absolute left-[7vw] top-[16vh] w-[41vw] h-[68vh] bg-white rounded-xl overflow-hidden card-shadow"
      >
        <img
          src="/case_b_image.jpg"
          alt="Training materials and job aids"
          className="w-full h-full object-cover image-mono-cobalt"
        />
      </div>

      {/* Vertical Rule */}
      <div
        ref={ruleRef}
        className="hidden lg:block absolute left-[50vw] top-[12vh] w-px h-[76vh] bg-[#0E0F11]/14"
      />

      {/* Right Text Area */}
      <div
        ref={textBlockRef}
        className="absolute left-[7vw] lg:left-[54vw] top-[14vh] w-[86vw] lg:w-[38vw]"
      >
        {/* Eyebrow */}
        <span className="eyebrow block mb-4">Case Study</span>

        {/* Title */}
        <h2 className="font-display font-semibold text-[clamp(28px,3.2vw,44px)] text-[#0E0F11] mb-6">
          System Rollout Training
        </h2>

        {/* Body */}
        <p className="font-body text-[15px] leading-[1.7] text-[#6E727A] mb-6">
          A new inventory system changed daily workflows. We built a rollout kit: 
          quick videos, printable job aids, and live support sessions—so teams 
          stayed confident during go-live.
        </p>

        {/* Bullets */}
        <ul ref={bulletsRef} className="space-y-3 mb-8">
          {[
            'Role-based learning paths',
            'Live facilitator guides',
            'Adoption reporting for field leaders'
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#2F5CFF]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={12} className="text-[#2F5CFF]" />
              </div>
              <span className="font-body text-[14px] text-[#0E0F11]">{item}</span>
            </li>
          ))}
        </ul>

        {/* Artifacts */}
        <div className="mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#6E727A] block mb-3">
            Artifacts
          </span>
          <div className="flex flex-wrap gap-2">
            {artifacts.map((artifact) => (
              <button
                key={artifact.label}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-[#0E0F11]/10 rounded-lg hover:border-[#2F5CFF]/30 hover:bg-[#2F5CFF]/5 transition-all group"
              >
                <artifact.icon size={14} className="text-[#6E727A] group-hover:text-[#2F5CFF]" />
                <span className="font-body text-[12px] text-[#0E0F11]">{artifact.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button className="flex items-center gap-2 font-body text-[14px] font-medium text-[#2F5CFF] link-underline group">
          <span>View full case study</span>
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};

export default CaseStudyB;
