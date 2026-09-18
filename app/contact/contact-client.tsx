'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Footer, Navbar, ScrollReveal } from '@/components/site';

/*
 * Contact — a private conversation.
 *
 * Editorial split: the introduction runs as a two-column header like the
 * other interior pages; beneath it the ways to reach the practice read as a
 * hairline ledger on the left while the enquiry form sits on the right,
 * un-boxed, with labelled fields. On mobile the ledger follows the form and
 * the intro carries two quick actions that jump to the form or open WhatsApp.
 */

const WHATSAPP_HREF =
  'https://wa.me/97145550182?text=Hello%20Altiere%20Estates,%20I%20would%20like%20to%20enquire%20about%20a%20property.';

const ENQUIRY_TYPES = ['Buying a property', 'Selling a property', 'Leasing', 'Property management'];

export default function ContactClient() {
  const [sent, setSent] = useState(false);
  const [enquiryType, setEnquiryType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const handleReset = () => {
    setSent(false);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setEnquiryType('');
  };

  return (
    <>
      <Navbar />
      <main>
        {/* Introduction */}
        <section className="ct-intro" aria-labelledby="contact-heading">
          <div className="shell ct-intro__grid">
            <div className="ct-intro__lead">
              <p className="eyebrow animate-hero-reveal">Start a conversation</p>
              <h1 id="contact-heading" className="ct-intro__title animate-hero-reveal delay-1">
                Make your next move <em>remarkable.</em>
              </h1>
            </div>
            <div className="ct-intro__aside animate-hero-reveal delay-2">
              <p className="ct-intro__copy">
                Whether you are buying, selling, leasing or caring for a property you already own,
                we would be pleased to hear from you.
              </p>
              <div className="ct-intro__actions">
                <a href="#enquiry" className="btn ct-intro__btn">
                  <span>Send an enquiry</span>
                  <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                </a>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary ct-intro__btn"
                >
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Ledger + form */}
        <section className="shell ct-body" aria-label="Contact details and enquiry form">
          <div className="ct-body__grid">
            <ScrollReveal className="ct-details">
              <div className="ct-details__inner">
                <p className="eyebrow">Reach us</p>
                <dl className="ct-ledger">
                  <div className="ct-ledger__row">
                    <dt>Visit</dt>
                    <dd>
                      Al Saqr Business Tower
                      <br />
                      Sheikh Zayed Road, Dubai
                    </dd>
                  </div>
                  <div className="ct-ledger__row">
                    <dt>Call</dt>
                    <dd>
                      <a href="tel:+97145550182" className="ct-ledger__link">
                        +971 4 555 0182
                      </a>
                    </dd>
                  </div>
                  <div className="ct-ledger__row">
                    <dt>Email</dt>
                    <dd>
                      <a href="mailto:hello@altiere-estates.ae" className="ct-ledger__link">
                        hello@altiere-estates.ae
                      </a>
                    </dd>
                  </div>
                  <div className="ct-ledger__row">
                    <dt>WhatsApp</dt>
                    <dd>
                      <a
                        href={WHATSAPP_HREF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ct-ledger__link"
                      >
                        Message the advisory team
                      </a>
                    </dd>
                  </div>
                </dl>
                <p className="ct-details__note">
                  Every conversation is handled privately and at your pace.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal stagger={1} className="ct-form">
              <div id="enquiry" className="ct-form__inner">
                <p className="eyebrow">Enquiry</p>
                <h2 className="ct-form__title">How can we help?</h2>

                {sent ? (
                  <div className="form-success" role="status">
                    <span className="form-success__icon" aria-hidden="true">
                      <CheckCircle2 size={22} strokeWidth={1.5} />
                    </span>
                    <p className="form-success__eyebrow">Enquiry received</p>
                    <h3 className="form-success__title">
                      Thank you{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}.
                    </h3>
                    <p className="form-success__copy">
                      Your enquiry has been received. A member of our advisory team will be in
                      touch shortly.
                    </p>
                    <button type="button" onClick={handleReset} className="btn-secondary form-success__action">
                      <span>Send another enquiry</span>
                    </button>
                  </div>
                ) : (
                  <form className="form" onSubmit={handleSubmit}>
                    <div className="form__row">
                      <div className="form__field">
                        <label htmlFor="contact-name" className="form__label">
                          Name
                        </label>
                        <input
                          id="contact-name"
                          required
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="field"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="form__field">
                        <label htmlFor="contact-email" className="form__label">
                          Email
                        </label>
                        <input
                          id="contact-email"
                          required
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="field"
                          placeholder="Email address"
                        />
                      </div>
                    </div>

                    <div className="form__row">
                      <div className="form__field">
                        <label htmlFor="contact-phone" className="form__label">
                          Phone <span className="form__optional">Optional</span>
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          autoComplete="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="field"
                          placeholder="Phone number"
                        />
                      </div>
                      <div className="form__field">
                        <label htmlFor="contact-type" className="form__label">
                          Enquiry type
                        </label>
                        <span className="form__select">
                          <select
                            id="contact-type"
                            className={`field ${enquiryType ? '' : 'field--placeholder'}`}
                            value={enquiryType}
                            onChange={(e) => setEnquiryType(e.target.value)}
                          >
                            <option value="">Select an enquiry type</option>
                            {ENQUIRY_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </span>
                      </div>
                    </div>

                    <div className="form__field">
                      <label htmlFor="contact-message" className="form__label">
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="field field--area"
                        placeholder="Tell us a little about your plans"
                      />
                    </div>

                    <div className="form__foot">
                      <button className="btn form__submit" type="submit">
                        <span>Send enquiry</span>
                        <ArrowRight size={13} strokeWidth={1.75} aria-hidden="true" />
                      </button>
                      <p className="form__note">
                        This form is a UI demonstration and does not submit personal data.
                      </p>
                    </div>
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
