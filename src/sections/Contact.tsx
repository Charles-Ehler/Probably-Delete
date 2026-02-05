import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Calendar, Send, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current,
        { opacity: 0, x: '-6vw' },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(formRef.current,
        { opacity: 0, x: '6vw' },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-[#0E0F11] py-[12vh] px-6 lg:px-[6vw] z-[80]"
    >
      {/* Decorative Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#F4F2EE]/8" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column - Text */}
        <div ref={leftRef}>
          <h2 className="font-display font-semibold text-[clamp(32px,3.6vw,48px)] text-[#F4F2EE] mb-6">
            Let's build something useful.
          </h2>
          
          <p className="font-body text-[15px] leading-[1.7] text-[#A7ABB4] mb-10 max-w-[45ch]">
            If you need learning that scales—clear, measurable, and aligned to operations—send a note. 
            I typically reply within 1–2 business days.
          </p>

          {/* Contact Links */}
          <div className="space-y-4">
            <a
              href="mailto:charles@email.com"
              className="flex items-center gap-3 text-[#F4F2EE] hover:text-[#2F5CFF] transition-colors group"
            >
              <Mail size={18} className="text-[#6E727A] group-hover:text-[#2F5CFF]" />
              <span className="font-body text-[14px]">charles@email.com</span>
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a
              href="https://www.linkedin.com/in/charles-ehler/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#F4F2EE] hover:text-[#2F5CFF] transition-colors group"
            >
              <Linkedin size={18} className="text-[#6E727A] group-hover:text-[#2F5CFF]" />
              <span className="font-body text-[14px]">linkedin.com/in/charles-ehler</span>
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[#F4F2EE] hover:text-[#2F5CFF] transition-colors group"
            >
              <Calendar size={18} className="text-[#6E727A] group-hover:text-[#2F5CFF]" />
              <span className="font-body text-[14px]">Schedule a call (Calendly)</span>
              <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Right Column - Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {submitted ? (
            <div className="bg-[#2F5CFF]/10 border border-[#2F5CFF]/30 rounded-xl p-8 text-center">
              <div className="w-12 h-12 bg-[#2F5CFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={20} className="text-white" />
              </div>
              <h3 className="font-display font-semibold text-[20px] text-[#F4F2EE] mb-2">
                Message sent!
              </h3>
              <p className="font-body text-[14px] text-[#A7ABB4]">
                Thanks for reaching out. I'll get back to you soon.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#6E727A] block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-[#F4F2EE]/20 py-3 text-[#F4F2EE] font-body text-[15px] placeholder:text-[#6E727A]/50 focus:outline-none focus:border-[#2F5CFF] transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#6E727A] block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-[#F4F2EE]/20 py-3 text-[#F4F2EE] font-body text-[15px] placeholder:text-[#6E727A]/50 focus:outline-none focus:border-[#2F5CFF] transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#6E727A] block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-[#F4F2EE]/20 py-3 text-[#F4F2EE] font-body text-[15px] placeholder:text-[#6E727A]/50 focus:outline-none focus:border-[#2F5CFF] transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send message
                    <Send size={16} />
                  </span>
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
