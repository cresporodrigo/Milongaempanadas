import { useState } from 'react';
import { getAssetPath } from '../config';

/* ─── reusable image cell ─── */
const ImgCell = ({ src, alt, className = '' }) => (
  <div className={`relative overflow-hidden rounded-2xl group ${className}`}>
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
      style={{ backgroundImage: `url(${getAssetPath(src)})` }}
    />
    {/* subtle vignette */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
);

export default function Catering() {
  /* ── form state (unchanged) ── */
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    eventType: 'Corporate Lunch',
    guests: '',
    eventDate: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/hola@milongaempanadas.com',
        {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.fullName,
            company: formData.companyName,
            email: formData.email,
            phone: formData.phone,
            eventType: formData.eventType,
            guests: formData.guests,
            eventDate: formData.eventDate,
            details: formData.details,
            _subject: `Catering Request from ${formData.fullName}${formData.companyName ? ` (${formData.companyName})` : ''}`,
            _template: 'table',
          }),
        }
      );
      if (response.ok) {
        setSubmitted(true);
        setIsLoading(false);
        setFormData({ fullName: '', companyName: '', email: '', phone: '', eventType: 'Corporate Lunch', guests: '', eventDate: '', details: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError('Something went wrong. Please try again.');
        setIsLoading(false);
        setTimeout(() => setError(''), 5000);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Network error. Please check your connection and try again.');
      setIsLoading(false);
      setTimeout(() => setError(''), 5000);
    }
  };

  const eventTypes = ['Corporate Lunch', 'Team Building Event', 'Office Happy Hour', 'Wedding Reception', 'Private Party', 'Birthday / Anniversary', 'Non-Profit / Fundraiser', 'Other'];

  /* ─────────────────────── RENDER ─────────────────────── */
  return (
    <div className="bg-[#F5F0EB] min-h-screen">

      {/* ══════════════════ 4 × 3 EDITORIAL GRID ══════════════════ */}
      <section className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[minmax(280px,1fr)] md:auto-rows-[minmax(340px,1fr)]">

          {/* ═══════════ ROW 1 — EL GANCHO Y LA HISTORIA ═══════════ */}

          {/* Cell 1 · Text — Hero's Secret Weapon */}
          <div className="bg-[#2C3E50] rounded-2xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            {/* decorative accent */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-[#E09A7A]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <span className="text-[#E09A7A] text-xs tracking-[0.35em] uppercase font-sans font-semibold mb-4 relative z-10">
              Premium Catering · San Diego
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-[2.7rem] font-display uppercase tracking-wider text-white leading-tight mb-5 relative z-10">
              Mess-Free<br />Gourmet Catering
            </h1>
            <p className="text-white/75 text-sm md:text-base leading-relaxed font-sans relative z-10">
              Skip the <em className="text-[#E09A7A] not-italic font-semibold">boring pizza trays</em>. Handcrafted Argentine empanadas — zero utensils, zero cleanup. Just grab, bite & impress. Your office, wedding, or event deserves better.
            </p>
          </div>

          {/* Cell 2 · Image — Hero shot empanadas */}
          <ImgCell
            src="images/backgrounds/hero-empanadas.jpg"
            alt="Empanadas artesanales calientes"
          />

          {/* Cell 3 · Text — Nuestra Historia */}
          <div className="bg-white rounded-2xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#E09A7A]/8 rounded-full translate-x-1/3 translate-y-1/3" />
            <span className="text-[#1BA9A9] text-xs tracking-[0.35em] uppercase font-sans font-semibold mb-4">
              Chef-Driven
            </span>
            <h2 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-[#2C3E50] leading-tight mb-4">
              Handcrafted<br />Daily
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans">
              Premium fast-casual. Every empanada made fresh by Chef <span className="font-semibold text-[#2C3E50]">Matías Bienati</span> near Fashion Valley, San Diego. Healthy ingredients, artisanal technique — no shortcuts.
            </p>
          </div>

          {/* ═══════════ ROW 2 — CORPORATE EFFICIENCY ═══════════ */}

          {/* Cell 4 · Image — Empanadas en oficina */}
          <ImgCell
            src="images/instagram/post1.jpg"
            alt="Empanadas artesanales Milonga"
          />

          {/* Cell 5 · Card — Corporate & Team Events (EZCater) */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-28 h-28 border-2 border-[#1BA9A9]/20 rounded-full" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border border-[#1BA9A9]/10 rounded-full" />
            <span className="text-[#1BA9A9] text-xs tracking-[0.35em] uppercase font-sans font-semibold mb-3 relative z-10">
              Office Lunch Catering
            </span>
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-white leading-tight mb-4 relative z-10">
              Feed the<br />Whole Team
            </h3>
            <p className="text-white/70 text-sm leading-relaxed font-sans mb-6 relative z-10">
              No plates. No utensils. No mess. Just order, unwrap & impress the whole office. Perfect finger food for meetings, team lunches & all-hands — delivered hot near Fashion Valley.
            </p>
            <a
              href="https://www.ezcater.com/catering/milonga-empanadas-3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 self-start bg-[#1BA9A9] hover:bg-[#138A8A] text-white font-bold py-3 px-7 rounded-xl text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#1BA9A9]/25 font-sans relative z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Order via EZCater
            </a>
          </div>

          {/* Cell 6 · Image — Close-up repulgue */}
          <ImgCell
            src="images/instagram/post2.jpg"
            alt="Close-up del repulgue artesanal"
          />

          {/* ═══════════ ROW 3 — CUSTOM EXPERIENCE ═══════════ */}

          {/* Cell 7 · Card — Milonga Experience */}
          <div className="bg-[#E09A7A] rounded-2xl p-8 md:p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2" />
            <span className="text-white/80 text-xs tracking-[0.35em] uppercase font-sans font-semibold mb-3 relative z-10">
              Weddings & Private Events
            </span>
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-white leading-tight mb-4 relative z-10">
              The Milonga<br />Experience
            </h3>
            <p className="text-white/85 text-sm leading-relaxed font-sans mb-6 relative z-10">
              Curated menus with fresh salads, artisan <span className="font-semibold">Chocotorta</span>, and optional on-site staff. Luxury finger food catering — beautifully plated, zero cleanup required.
            </p>
            <a
              href="#custom-request"
              className="inline-flex items-center gap-2.5 self-start bg-white text-[#E09A7A] hover:bg-[#2C3E50] hover:text-white font-bold py-3 px-7 rounded-xl text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg font-sans relative z-10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Inquire Now
            </a>
          </div>

          {/* Cell 8 · Image — Sides & Chocotorta */}
          <ImgCell
            src="images/instagram/post3.jpg"
            alt="Sides frescos y Chocotorta"
          />

          {/* Cell 9 · Text — Bespoke Flavor */}
          <div className="bg-white rounded-2xl p-8 md:p-10 flex flex-col justify-center">
            <span className="text-[#E09A7A] text-xs tracking-[0.35em] uppercase font-sans font-semibold mb-4">
              Fully Customizable
            </span>
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-[#2C3E50] leading-tight mb-4">
              Build Your<br />Perfect Menu
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed font-sans mb-4">
              Mix & match empanadas with fresh seasonal salads, artisan desserts & craft beverages. <span className="italic">Healthy options included</span> — from intimate dinners to 500+ guest celebrations.
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              {['Empanadas', 'Fresh Salads', 'Chocotorta', 'Craft Drinks', 'On-Site Staff'].map((tag) => (
                <span key={tag} className="text-xs font-sans font-medium bg-[#F5F0EB] text-[#2C3E50] px-3 py-1.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ═══════════ ROW 4 — EL CIERRE ═══════════ */}

          {/* Cell 10 · Image — Gente disfrutando */}
          <ImgCell
            src="images/instagram/post4.jpg"
            alt="Gente disfrutando empanadas"
          />

          {/* Cell 11 · Form CTA — Inquire Now */}
          <div id="custom-request" className="bg-[#2C3E50] rounded-2xl p-7 md:p-9 flex flex-col justify-center" style={{ scrollMarginTop: '100px' }}>
            <h3 className="text-xl md:text-2xl font-display uppercase tracking-wider text-white mb-1.5">
              Inquire Now
            </h3>
            <p className="text-white/60 text-xs font-sans mb-4">
              Your event, our flavor. ¡A bailar esas papilas gustativas!
            </p>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              <input type="text" name="_gotcha" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              <input
                type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#E09A7A] focus:ring-1 focus:ring-[#E09A7A]/30 transition-colors"
              />
              <input
                type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                placeholder="Company / Organization (optional)"
                className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#E09A7A] focus:ring-1 focus:ring-[#E09A7A]/30 transition-colors"
              />
              <input
                type="email" name="email" value={formData.email} onChange={handleChange} required
                placeholder="Work email"
                className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#E09A7A] focus:ring-1 focus:ring-[#E09A7A]/30 transition-colors"
              />
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                placeholder="Phone"
                className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#E09A7A] focus:ring-1 focus:ring-[#E09A7A]/30 transition-colors"
              />
              <select
                name="eventType" value={formData.eventType} onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-sans focus:outline-none focus:border-[#E09A7A] focus:ring-1 focus:ring-[#E09A7A]/30 transition-colors [&>option]:text-gray-900"
              >
                {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="number" name="guests" value={formData.guests} onChange={handleChange} required min="1"
                  placeholder="# Guests"
                  className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#E09A7A] focus:ring-1 focus:ring-[#E09A7A]/30 transition-colors"
                />
                <input
                  type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required
                  className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm font-sans focus:outline-none focus:border-[#E09A7A] focus:ring-1 focus:ring-[#E09A7A]/30 transition-colors [color-scheme:dark]"
                />
              </div>
              <textarea
                name="details" value={formData.details} onChange={handleChange} required rows="2"
                placeholder="Tell us about your event..."
                className="w-full px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm font-sans focus:outline-none focus:border-[#E09A7A] focus:ring-1 focus:ring-[#E09A7A]/30 transition-colors resize-none"
              />
              <button
                type="submit" disabled={isLoading}
                className={`w-full font-bold py-3 rounded-xl text-sm font-sans transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-lg ${
                  error ? 'bg-red-500 text-white' : submitted ? 'bg-green-500 text-white' : 'bg-[#E09A7A] hover:bg-[#d08868] text-white hover:shadow-[#E09A7A]/25'
                }`}
              >
                {isLoading ? 'Sending...' : submitted ? '✓ Sent!' : error ? 'Error — Retry' : 'Send Request'}
              </button>
              {error && <p className="text-red-400 text-xs text-center font-sans">Something went wrong. Try again.</p>}
            </form>
          </div>

          {/* Cell 12 · Text — 3 Steps to Victory */}
          <div className="bg-[#F5F0EB] rounded-2xl p-8 md:p-10 flex flex-col justify-center border border-[#e8ddd1]">
            <span className="text-[#1BA9A9] text-xs tracking-[0.35em] uppercase font-sans font-semibold mb-5">
              How it works
            </span>
            <h3 className="text-2xl md:text-3xl font-display uppercase tracking-wider text-[#2C3E50] leading-tight mb-7">
              3 Steps to<br />Victory
            </h3>

            <div className="space-y-5">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2C3E50] flex items-center justify-center">
                  <span className="text-white font-display text-lg">1</span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-[#2C3E50] text-sm">Tell Us Your Headcount</p>
                  <p className="font-sans text-gray-500 text-xs mt-0.5">10 or 500 — we scale to any size event.</p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#E09A7A] flex items-center justify-center">
                  <span className="text-white font-display text-lg">2</span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-[#2C3E50] text-sm">We Craft & Deliver Hot</p>
                  <p className="font-sans text-gray-500 text-xs mt-0.5">Handmade fresh that morning. Arrives ready to serve.</p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1BA9A9] flex items-center justify-center">
                  <span className="text-white font-display text-lg">3</span>
                </div>
                <div>
                  <p className="font-sans font-semibold text-[#2C3E50] text-sm">Zero Cleanup Required</p>
                  <p className="font-sans text-gray-500 text-xs mt-0.5">No plates, no utensils. You just take the credit.</p>
                </div>
              </div>
            </div>
          </div>

        </div>{/* end grid */}
      </section>

    </div>
  );
}
