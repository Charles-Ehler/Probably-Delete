import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  {
    value: '30–50%',
    label: 'Faster time-to-competency',
  },
  {
    value: '3–5×',
    label: 'More consistent rollout quality',
  },
  {
    value: 'High',
    label: 'Stakeholder satisfaction',
  },
];

const Proof = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Quote animation
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Metrics animation
      metricsRef.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(ref,
            { opacity: 0, y: 24 },
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proof"
      className="relative bg-[#F4F2EE] py-[10vh] px-6 lg:px-[6vw] z-[60]"
    >
      {/* Quote Block */}
      <div ref={quoteRef} className="relative mb-16 lg:mb-20">
        {/* Quote Icon Background */}
        <Quote
          size={120}
          className="absolute -top-8 -left-4 text-[#2F5CFF]/5"
          strokeWidth={1}
        />

        <blockquote className="relative max-w-[62vw] lg:max-w-[50vw]">
          <p className="font-display font-medium text-[clamp(20px,2.4vw,32px)] leading-[1.4] text-[#0E0F11] mb-6">
            "Charles turns ambiguous requirements into training that actually gets used—fast, clean, and aligned to operations."
          </p>
          <footer className="font-body text-[14px] text-[#6E727A]">
            — Field Leader, Multi‑Unit Operations
          </footer>
        </blockquote>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-[6vw]">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            ref={el => { metricsRef.current[index] = el; }}
            className="text-left"
          >
            <span className="font-display font-bold text-[clamp(36px,4vw,56px)] text-[#2F5CFF] leading-none block mb-3">
              {metric.value}
            </span>
            <span className="font-body text-[14px] text-[#6E727A]">
              {metric.label}
            </span>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <p className="font-body text-[12px] text-[#6E727A]/70 mt-12 max-w-[60ch]">
        * Results are representative examples based on past program outcomes. 
        Actual impact varies by organization, context, and implementation.
      </p>
    </section>
  );
};

export default Proof;
