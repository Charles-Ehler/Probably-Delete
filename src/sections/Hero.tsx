import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Download, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.fromTo(portraitRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 }
      )
      .fromTo(ruleRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.6, transformOrigin: 'top' },
        0.2
      )
      .fromTo(eyebrowRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.35
      )
      .fromTo(headlineRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.45
      )
      .fromTo(subheadRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.55
      )
      .fromTo(ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.7
      )
      .fromTo(scrollHintRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        0.9
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([eyebrowRef.current, headlineRef.current, subheadRef.current, ctaRef.current], {
              opacity: 1, y: 0
            });
            gsap.set(contentRef.current, { x: 0, opacity: 1 });
            gsap.set(portraitRef.current, { scale: 1, x: 0 });
            gsap.set(scrollHintRef.current, { opacity: 1 });
          }
        }
      });

      // Phase 3: Exit (70% - 100%)
      scrollTl.fromTo([eyebrowRef.current, headlineRef.current, subheadRef.current],
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-6vh', stagger: 0.05, ease: 'power2.in' },
        0.7
      )
      .fromTo(ctaRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-4vh', ease: 'power2.in' },
        0.75
      )
      .fromTo(contentRef.current,
        { x: 0 },
        { x: '10vw', ease: 'power2.in' },
        0.7
      )
      .fromTo(portraitRef.current,
        { scale: 1, x: 0 },
        { scale: 1.06, x: '-6vw', ease: 'power2.in' },
        0.7
      )
      .fromTo(scrollHintRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = () => {
    document.getElementById('selected-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#F4F2EE] z-10"
    >
      {/* Left Portrait Panel */}
      <div
        ref={portraitRef}
        className="absolute left-0 top-0 w-full lg:w-[52vw] h-full"
      >
        <img
          src="/hero_portrait.jpg"
          alt="Charles Ehler"
          className="w-full h-full object-cover image-mono-cobalt"
        />
        {/* Gradient overlay for text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F2EE] via-transparent to-transparent lg:hidden" />
      </div>

      {/* Vertical Rule */}
      <div
        ref={ruleRef}
        className="hidden lg:block absolute left-[52vw] top-[10vh] w-px h-[80vh] bg-[#0E0F11]/14"
      />

      {/* Right Content Panel */}
      <div
        ref={contentRef}
        className="absolute left-0 lg:left-[52vw] top-auto bottom-0 lg:top-0 w-full lg:w-[48vw] h-auto lg:h-full flex items-end lg:items-center pb-8 lg:pb-0 px-6 lg:px-0"
      >
        <div className="lg:pl-[6vw] max-w-full lg:max-w-[34vw]">
          {/* Eyebrow */}
          <span ref={eyebrowRef} className="eyebrow block mb-4 lg:mb-6">
            Learning Experience Manager
          </span>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="font-display font-bold text-[clamp(36px,4.5vw,64px)] leading-[0.95] tracking-[-0.02em] text-[#0E0F11] mb-4 lg:mb-6"
          >
            Learning systems that scale.
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadRef}
            className="font-body text-[15px] lg:text-[16px] leading-[1.6] text-[#6E727A] mb-6 lg:mb-8 max-w-[90%] lg:max-w-full"
          >
            I design training programs, operational playbooks, and leadership enablement 
            that actually get adopted—across restaurants, teams, and time zones.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <button onClick={scrollToWork} className="btn-primary group">
              <span>View case studies</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="/resume.pdf"
              download
              className="btn-secondary group"
            >
              <span>Download resume</span>
              <Download size={16} className="ml-2 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute left-1/2 bottom-[6vh] -translate-x-1/2 flex flex-col items-center gap-2 hidden lg:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6E727A]">
          Scroll
        </span>
        <ChevronDown size={18} className="text-[#6E727A] animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
