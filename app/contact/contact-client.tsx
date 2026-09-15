'use client';

import { useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { Footer, Navbar, ScrollReveal } from '@/components/site';

export default function ContactClient() {
  const [sent, setSent] = useState(false);
  const [enquiryType, setEnquiryType] = useState('');

  return (
    <>
      <Navbar />
      <main>
        <section className="shell section">
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
                <button
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-white border border-[#E6E1DA] hover:border-[#b39062] hover:bg-[#faf8f5] text-[#112239] text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group cursor-pointer mt-8 sm:mt-12"
                  onClick={() => setSent(true)}
                  type="button"
                >
                  <MessageCircle size={16} className="text-[#25D366] transition-transform duration-300 group-hover:scale-110" />
                  <span>WhatsApp us</span>
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={2}>
              <div className="bg-white border border-[#E6E1DA] p-5 sm:p-7 md:p-10 shadow-lg shadow-black/5 transition-shadow duration-300 hover:shadow-xl">
                <p className="serif text-3xl text-[#112239]">How can we help?</p>
                {sent ? (
                  <div className="py-20 text-center animate-hero-fade">
                    <CheckCircle2 className="mx-auto" color="#b39062" size={48} />
                    <p className="serif text-3xl mt-4 text-[#112239]">Thank you.</p>
                    <p className="text-[#657080] mt-2">Your fictional demo enquiry has been received.</p>
                  </div>
                ) : (
                  <form
                    className="mt-7 grid gap-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        required
                        className="w-full bg-white border border-[#E6E1DA] h-[48px] px-4 py-3 text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors"
                        placeholder="Your name"
                      />
                      <input
                        required
                        type="email"
                        className="w-full bg-white border border-[#E6E1DA] h-[48px] px-4 py-3 text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors"
                        placeholder="Email address"
                      />
                    </div>
                    <input
                      className="w-full bg-white border border-[#E6E1DA] h-[48px] px-4 py-3 text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors"
                      placeholder="Phone number"
                    />
                    <div className="relative">
                      <select
                        className={`w-full appearance-none bg-white border border-[#E6E1DA] h-[48px] px-4 pr-11 py-3 text-sm focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors cursor-pointer ${
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
                      className="w-full bg-white border border-[#E6E1DA] px-4 py-3 text-sm text-[#112239] placeholder:text-[#8a959f] focus:outline-none focus:border-[#b39062] focus:ring-1 focus:ring-[#b39062] transition-colors h-36 resize-none"
                      placeholder="Tell us a little about your plans"
                    />
                    <button className="btn w-full group mt-2" type="submit">
                      <span>Send enquiry</span>
                      <Send size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <p className="text-[11px] text-[#657080] text-center">
                      This form is a UI demonstration and does not submit personal data.
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

