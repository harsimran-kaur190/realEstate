'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  CheckCircle2,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { Footer, Navbar, ScrollReveal } from '@/components/site';

export default function ContactClient() {
  const [sent, setSent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  // Lock body scroll when mobile modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setModalOpen(true);
    }
  };

  const handleReset = () => {
    setSent(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setEnquiryType('');
    setModalOpen(false);
  };

  const FormFields = () => (
    <>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white border border-[#E6E1DA] h-[48px] px-4 py-3 text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors rounded-[2px]"
          placeholder="Your name"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white border border-[#E6E1DA] h-[48px] px-4 py-3 text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors rounded-[2px]"
          placeholder="Email address"
        />
      </div>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full bg-white border border-[#E6E1DA] h-[48px] px-4 py-3 text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors rounded-[2px]"
        placeholder="Phone number"
      />
      <div className="relative">
        <select
          className={`w-full appearance-none bg-white border border-[#E6E1DA] h-[48px] px-4 pr-11 py-3 text-sm focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors cursor-pointer rounded-[2px] ${
            enquiryType ? 'text-[#112239]' : 'text-[#8a959f]'
          }`}
          value={enquiryType}
          onChange={(e) => setEnquiryType(e.target.value)}
        >
          <option value="" disabled className="text-[#8a959f]">
            Enquiry type
          </option>
          <option value="Buying a property" className="text-[#112239]">Buying a property</option>
          <option value="Selling a property" className="text-[#112239]">Selling a property</option>
          <option value="Leasing" className="text-[#112239]">Leasing</option>
          <option value="Property management" className="text-[#112239]">Property management</option>
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8a959f]"
          strokeWidth={1.75}
        />
      </div>
      <textarea
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full bg-white border border-[#E6E1DA] px-4 py-3 text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors h-32 sm:h-36 resize-none rounded-[2px]"
        placeholder="Tell us a little about your plans"
      />
      <button className="btn w-full group mt-2 cursor-pointer" type="submit">
        <span>Send enquiry</span>
        <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
      <p className="text-[11px] text-[#657080] text-center">
        This form is a UI demonstration and does not submit personal data.
      </p>
    </>
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="shell py-12 md:py-20">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-start">
            <ScrollReveal>
              <div>
                <p className="eyebrow">Start a conversation</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-2 text-[#112239] break-words">
                  Make your next move remarkable.
                </h1>
                <p className="text-[#657080] leading-7 mt-4 sm:mt-6 max-w-md text-sm sm:text-base">
                  Whether you are buying, selling, leasing or investing, our advisors would be pleased to hear from you.
                </p>

                {/* Mobile Fast-Action Buttons (No Scrolling Needed) */}
                <div className="md:hidden mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="btn !py-3.5 !px-6 text-xs uppercase tracking-[0.14em] flex items-center justify-center gap-2 shadow-md cursor-pointer w-full"
                  >
                    <Send size={14} className="text-[#b39062]" />
                    <span>Send an enquiry</span>
                  </button>
                  <a
                    href="https://wa.me/97145550182?text=Hello%20Altiere%20Estates,%20I%20would%20like%20to%20enquire%20about%20a%20property."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white border border-[#E6E1DA] hover:border-[#b39062] hover:bg-[#faf8f5] text-[#112239] text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group cursor-pointer w-full rounded-xs"
                  >
                    <MessageCircle size={16} className="text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
                    <span>WhatsApp us</span>
                  </a>
                </div>

                <div className="mt-8 sm:mt-12 space-y-7 sm:space-y-10">
                  {[
                    [MapPin, 'Visit us', 'Al Saqr Business Tower, Sheikh Zayed Road, Dubai'],
                    [Phone, 'Call us', '+971 4 555 0182'],
                    [Mail, 'Email us', 'hello@altiere-estates.ae'],
                  ].map(([Icon, t, d]) => {
                    const I = Icon as typeof MapPin;
                    return (
                      <div className="flex gap-4 group cursor-pointer" key={String(t)}>
                        <div className="transition-transform duration-300 group-hover:scale-110">
                          <I color="#b39062" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[.13em] text-[#112239] font-medium">
                            {String(t)}
                          </p>
                          <p className="text-sm text-[#657080] mt-1 group-hover:text-[#b39062] transition-colors">
                            {String(d)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop WhatsApp Action */}
                <div className="hidden md:block mt-8 sm:mt-12">
                  <a
                    href="https://wa.me/97145550182?text=Hello%20Altiere%20Estates,%20I%20would%20like%20to%20enquire%20about%20a%20property."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white border border-[#E6E1DA] hover:border-[#b39062] hover:bg-[#faf8f5] text-[#112239] text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group cursor-pointer rounded-xs"
                  >
                    <MessageCircle size={16} className="text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
                    <span>WhatsApp us</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Desktop / Inline Form Card */}
            <ScrollReveal stagger={2}>
              <div className="bg-white border border-[#E6E1DA] p-6 sm:p-7 md:p-10 shadow-lg shadow-black/5 transition-shadow duration-300 hover:shadow-xl rounded-2xl">
                <p className="serif text-3xl text-[#112239]">How can we help?</p>
                {sent ? (
                  <div className="py-12 sm:py-20 text-center animate-hero-fade">
                    <div className="w-16 h-16 rounded-full bg-[#b39062]/10 text-[#b39062] grid place-items-center mx-auto mb-4">
                      <CheckCircle2 size={36} />
                    </div>
                    <p className="serif text-3xl text-[#112239]">Thank you.</p>
                    <p className="text-[#657080] mt-2 max-w-sm mx-auto text-sm leading-relaxed">
                      Your enquiry has been received. Our senior property advisor will reach out to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn !py-2.5 !px-5 text-xs mt-6 cursor-pointer"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form className="mt-7 grid gap-4" onSubmit={handleSubmit}>
                    <FormFields />
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Sticky Mobile Quick Action Bar (Bottom Pill) */}
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 md:hidden flex items-center gap-2 bg-[#112239]/95 backdrop-blur-md text-white px-3.5 py-2 rounded-full shadow-2xl border border-white/15 max-w-[calc(100vw-2rem)] animate-hero-fade">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1 text-xs uppercase tracking-[0.14em] font-semibold text-white hover:text-[#d6b98f] transition-colors cursor-pointer"
          >
            <Send size={13} className="text-[#b39062]" />
            <span>Enquire now</span>
          </button>
          <span className="w-px h-4 bg-white/20" />
          <a
            href="https://wa.me/97145550182?text=Hello%20Altiere%20Estates"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1 text-xs uppercase tracking-[0.14em] font-semibold text-white/90 hover:text-white transition-colors"
          >
            <MessageCircle size={14} className="text-[#25D366]" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile Slide-Up Modal Bottom Sheet */}
        {modalOpen &&
          typeof document !== 'undefined' &&
          createPortal(
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto animate-hero-fade"
              onClick={() => setModalOpen(false)}
            >
              <div
                className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 border-t sm:border border-[#E6E1DA] shadow-2xl relative max-h-[92vh] overflow-y-auto animate-card-entrance"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="absolute right-4 top-4 text-stone-400 hover:text-stone-700 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {sent ? (
                  <div className="py-10 text-center animate-hero-fade">
                    <div className="w-16 h-16 rounded-full bg-[#b39062]/10 text-[#b39062] grid place-items-center mx-auto mb-4">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="serif text-3xl text-[#112239]">Thank you.</h3>
                    <p className="text-[#657080] mt-2 text-sm leading-relaxed max-w-xs mx-auto">
                      Your enquiry has been received. Our senior property advisor will reach out to you shortly.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="btn !py-2.5 !px-6 text-xs cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 text-[#b39062]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b39062]" />
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Start a conversation</span>
                    </div>
                    <h3 className="serif text-2xl sm:text-3xl text-[#112239] font-medium">
                      How can we help?
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 mb-5">
                      Send a confidential enquiry directly to our private client advisory team.
                    </p>

                    <form className="grid gap-3.5" onSubmit={handleSubmit}>
                      <FormFields />
                    </form>
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}
      </main>
      <Footer />
    </>
  );
}

