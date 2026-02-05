import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    number: '01',
    title: 'Define',
    description: 'Map the real workflow. Identify the critical moments where training makes the biggest impact.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Build the smallest viable curriculum. Prototype early and iterate based on real feedback.',
  },
  {
    number: '03',
    title: 'Deliver',
    description: 'Launch with support loops. Report, refine, and continuously improve the experience.',
  },
];

const Principles = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Phase 1: Entrance (0% - 30%)
      scrollTl.fromTo(headlineRef.current,
        { y: '-12vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      cardsRef.current.forEach((card, index) => {
        if (card) {
          scrollTl.fromTo(card,
            { y: '40vh', opacity: 0, scale: 0.98 },
            { y: 0, opacity: 1, scale: 1, ease: 'none' },
            0.05 + index * 0.03
          );
        }
      });

      // Phase 3: Exit (70% - 100%)
      scrollTl.fromTo(headlineRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-6vh', ease: 'power2.in' },
        0.7
      );

      cardsRef.current.forEach((card) => {
        if (card) {
          scrollTl.fromTo(card,
            { opacity: 1, y: 0 },
            { opacity: 0, y: '-8vh', ease: 'power2.in' },
            0.7
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="section-pinned bg-[#F4F2EE] z-50"
    >
      {/* Headline Block */}
      <div
        ref={headlineRef}
        className="absolute left-[7vw] top-[12vh] w-[86vw] lg:w-[40vw]"
      >
        <h2 className="font-display font-semibold text-[clamp(32px,3.6vw,48px)] text-[#0E0F11] mb-4">
          How I work
        </h2>
        <p className="font-body text-[15px] leading-[1.7] text-[#6E727A]">
          A repeatable system that keeps projects fast, clear, and measurable.
        </p>
      </div>

      {/* Principle Cards */}
      <div className="absolute left-[7vw] right-[7vw] top-[46vh] flex flex-col lg:flex-row gap-4 lg:gap-[3vw]">
        {principles.map((principle, index) => (
          <div
            key={principle.number}
            ref={el => { cardsRef.current[index] = el; }}
            className="flex-1 bg-white border border-[#0E0F11]/10 rounded-xl p-6 lg:p-8 card-shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Number */}
            <span className="font-display font-bold text-[48px] lg:text-[64px] text-[#2F5CFF] leading-none block mb-4">
              {principle.number}
            </span>

            {/* Title */}
            <h3 className="font-display font-semibold text-[20px] lg:text-[24px] text-[#0E0F11] mb-3">
              {principle.title}
            </h3>

            {/* Description */}
            <p className="font-body text-[14px] leading-[1.7] text-[#6E727A]">
              {principle.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Principles;
