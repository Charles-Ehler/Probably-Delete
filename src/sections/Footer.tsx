import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0E0F11] py-[6vh] px-6 lg:px-[6vw] z-[90]"
    >
      {/* Divider */}
      <div className="absolute top-0 left-[6vw] right-[6vw] h-px bg-[#F4F2EE]/10" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left - Copyright */}
        <div>
          <p className="font-body text-[13px] text-[#A7ABB4]">
            © 2026 Charles Ehler
          </p>
          <p className="font-body text-[12px] text-[#6E727A] mt-1">
            Learning Experience Manager
          </p>
        </div>

        {/* Right - Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection('selected-work')}
            className="font-body text-[13px] text-[#A7ABB4] hover:text-[#F4F2EE] transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('principles')}
            className="font-body text-[13px] text-[#A7ABB4] hover:text-[#F4F2EE] transition-colors"
          >
            Approach
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="font-body text-[13px] text-[#A7ABB4] hover:text-[#F4F2EE] transition-colors"
          >
            Skills
          </button>
          <a
            href="#"
            className="font-body text-[13px] text-[#A7ABB4] hover:text-[#F4F2EE] transition-colors"
          >
            Privacy
          </a>
        </div>
      </div>

      {/* Location */}
      <div className="mt-8 pt-6 border-t border-[#F4F2EE]/5">
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#6E727A]">
          Overland Park, Kansas, United States
        </p>
      </div>
    </footer>
  );
};

export default Footer;
