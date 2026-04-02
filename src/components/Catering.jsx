import { useState, useEffect, useRef } from 'react';
import { getAssetPath } from '../config';

/* ─── Reveal-on-scroll wrapper ─── */
const Reveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >{children}</div>
  );
};

/* ─── Check icon ─── */
const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#00A8E1] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

/* ─── Subtle background pattern ─── */
const bgPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

/* ─── Static data ─── */
const plans = [
  {
    name: 'The Quick Bite',
    price: '$17',
    features: [
      '2 empanadas per person (mix & match any flavors).',
      '1 fresh side per person.',
      'Delivered ready-to-eat in our branded boxes.',
      'Perfect for quick office lunches, casual meetings, or small gatherings.',
    ],
  },
  {
    name: 'The Argentina Classic',
    price: '$22',
    popular: true,
    features: [
      '3 empanadas per person (mix & match any flavors).',
      '1 fresh side per person.',
      'Delivered & set up on disposable platters.',
      'Ideal for birthdays, family celebrations, team events, or corporate lunches.',
    ],
  },
  {
    name: 'The Full Experience',
    price: '$28',
    features: [
      '3 empanadas per person (mix & match any flavors).',
      '1 fresh side per person.',
      '1 sweet bite per person (Chocotorta).',
      'Delivered & set up — perfect for weddings, large parties, or any special occasion.',
    ],
  },
];

const flavors = [
  { name: 'Criolla', desc: 'Steak · Onion · Olives · Boiled egg', img: 'images/flavors/criolla.jpg' },
  { name: 'Ham & Cheese', desc: 'Honey baked ham · Mozzarella · Olive oil · Fresh thyme', img: 'images/flavors/ham-and-cheese.jpg' },
  { name: 'Chicken', desc: 'Braised chicken · Caramelized onions · Roasted bell peppers · Fine herbs', img: 'images/flavors/chicken.jpg' },
  { name: 'Cheese & Onion', desc: 'Caramelized onion · Chives · Mozzarella · Provolone', img: 'images/flavors/cheese-and-onion.jpg' },
  { name: 'Spinach Ricotta', desc: 'Ricotta · Nutmeg · Parmesan · Touch of Mozzarella', img: 'images/flavors/spinach-ricotta.jpg' },
  { name: 'Caprese', desc: 'Seasonal tomatoes · Basil pesto · Mozzarella', img: 'images/flavors/caprese.jpg' },
];

export default function Catering() {
  /* ── form state ── */
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', pack: 'The Argentina Classic', guests: '', details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectPlan = (planName) => {
    setFormData((prev) => ({ ...prev, pack: planName }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('https://formsubmit.co/ajax/hola@milongaempanadas.com', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          pack: formData.pack,
          guests: formData.guests,
          details: formData.details,
          _subject: `Catering — ${formData.pack} — ${formData.fullName}`,
          _template: 'table',
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setIsLoading(false);
        setFormData({ fullName: '', email: '', phone: '', pack: 'The Argentina Classic', guests: '', details: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setError('Something went wrong. Please try again.');
        setIsLoading(false);
        setTimeout(() => setError(''), 5000);
      }
    } catch {
      setError('Network error. Please check your connection.');
      setIsLoading(false);
      setTimeout(() => setError(''), 5000);
    }
  };

  /* ═══════════════════════ RENDER ═══════════════════════ */
  return (
    <div className="bg-[#0a0a0a] text-white -mt-16 md:-mt-20">

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative h-screen flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img
            src={getAssetPath('images/backgrounds/hero-empanadas.jpg')}
            alt="Milonga Empanadas catering — premium Argentine finger food for events in San Diego"
            className="w-full h-full object-cover opacity-50"
            style={{ filter: 'grayscale(20%)' }}
            fetchPriority="high"
            width="1920"
            height="1080"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-5xl">
            <Reveal>
              <span className="text-[#00A8E1] font-black uppercase text-xs tracking-[0.5em] mb-4 block">
                Events &amp; Celebrations
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-7xl md:text-[11rem] leading-[0.75] font-display mb-8 tracking-tighter text-white uppercase">
                CATE<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>RING.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-xl md:text-3xl italic font-heading max-w-xl text-zinc-300 mb-12">
                Bringing the soul of Argentina to San Diego. Premium finger food designed to impress.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="bg-[#00A8E1] text-white px-10 py-5 font-black uppercase text-base
                             transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1
                             hover:shadow-[8px_8px_0px_#ffffff] inline-block tracking-tight"
                >
                  Get a Quote
                </a>
                <a
                  href="#flavors"
                  className="border border-white/30 text-white px-10 py-5 font-black uppercase text-base
                             transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1
                             hover:shadow-[8px_8px_0px_#ffffff] hover:bg-white hover:text-black inline-block tracking-tight"
                >
                  See Menu
                </a>
                <a
                  href="https://www.ezcater.com/catering/milonga-empanadas-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Order Milonga Empanadas catering on EZCater"
                  className="bg-white text-black px-10 py-5 font-black uppercase text-base
                             transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1
                             hover:shadow-[8px_8px_0px_#ffffff] hover:bg-[#00A8E1] hover:text-white inline-block tracking-tight"
                >
                  Order Now on EZCater
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════ CATERING PACKS ══════════════════ */}
      <section id="plans" className="py-16 md:py-20 bg-zinc-950" style={{ backgroundImage: bgPattern, scrollMarginTop: '80px' }}>
        <div className="container mx-auto px-6 mb-10 md:mb-14">
          <Reveal>
            <h2 className="text-4xl md:text-7xl font-display mb-4 tracking-tight">
              Catering <span className="text-[#00A8E1]">Packs.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="italic font-heading text-xl md:text-2xl text-zinc-400">
              Select the experience that best fits your event.
            </p>
          </Reveal>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 150} className="h-full">
              <div
                className={`bg-zinc-900/50 p-10 md:p-12 rounded-[2rem] flex flex-col h-full
                           transition-all duration-500 hover:scale-[1.02] relative
                           ${plan.popular
                             ? 'border-2 border-[#00A8E1] hover:bg-[#00A8E1]/5'
                             : 'border border-[#00A8E1]/20 hover:border-[#00A8E1] hover:bg-[#00A8E1]/5'
                           }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00A8E1] text-black font-black uppercase text-[10px] px-6 py-2 rounded-full tracking-widest whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <span className="font-display text-2xl md:text-3xl mb-2 uppercase tracking-tight">{plan.name}</span>

                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-xs font-bold text-zinc-500 uppercase">From</span>
                  <span className="text-4xl font-black text-[#00A8E1]">{plan.price}</span>
                  <span className="text-zinc-500 font-bold uppercase text-[10px]">P/P</span>
                </div>

                <ul className="space-y-5 flex-grow text-zinc-400 text-sm leading-relaxed">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex gap-3">
                      <CheckIcon />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════ SELECTION OF FLAVORS ══════════════════ */}
      <section id="flavors" className="py-16 md:py-20 bg-black" style={{ scrollMarginTop: '80px' }}>
        <div className="container mx-auto px-6 mb-10 md:mb-14 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-display mb-4 uppercase tracking-tighter">
              Magic <span className="text-[#00A8E1]">Flavors.</span>
            </h2>
          </Reveal>
          <div className="w-24 h-1 bg-[#00A8E1] mx-auto" />
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {flavors.map((f, i) => (
            <Reveal key={f.name} delay={i * 100}>
              <div className="bg-[#18181b] border border-white/5 rounded-[2.5rem] overflow-hidden group
                             transition-all duration-400 hover:border-[#00A8E1]">
                <div className="h-64 overflow-hidden">
                  <img
                    src={getAssetPath(f.img)}
                    alt={`${f.name} empanada — ${f.desc}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    width="400"
                    height="256"
                  />
                </div>
                <div className="p-8 text-center">
                  <h4 className="text-xl font-black mb-2 uppercase tracking-tighter italic">{f.name}</h4>
                  <p className="text-zinc-500 text-sm">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Dessert & Extras */}
        <div className="container mx-auto px-6 mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Reveal>
            <div className="bg-zinc-900/50 p-10 rounded-[2rem] border border-zinc-800 text-center h-full">
              <h3 className="italic font-heading text-3xl mb-6 text-[#00A8E1]">Dessert</h3>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={getAssetPath('images/instagram/post6.jpg')}
                  alt="Chocotorta — Argentine chocolate dulce de leche dessert"
                  className="w-24 h-24 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  width="96"
                  height="96"
                />
                <h4 className="font-black uppercase italic text-sm">Chocotorta</h4>
                <p className="text-zinc-500 text-sm">Dulce de leche cream mixed with coffee-soaked cookies.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-zinc-900/50 p-10 rounded-[2rem] border border-zinc-800 flex flex-col justify-center text-center h-full">
              <h3 className="italic font-heading text-3xl mb-4 text-[#00A8E1]">Sides</h3>
              <p className="text-zinc-500 text-sm uppercase font-black tracking-widest mb-2">Fresh Seasonal Sides</p>
              <p className="text-zinc-600 text-xs italic">Crafted to complement every bite.</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="bg-zinc-900/50 p-10 rounded-[2rem] border border-zinc-800 flex flex-col justify-center text-center h-full">
              <h3 className="italic font-heading text-3xl mb-4 text-[#00A8E1]">Salads</h3>
              <p className="text-zinc-500 text-sm uppercase font-black tracking-widest mb-2">Artisanal Salads</p>
              <p className="text-zinc-600 text-xs italic">Fresh locally sourced ingredients.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════ CONTACT / BOOKING FORM ══════════════════ */}
      <section id="contact" className="py-16 md:py-20 bg-zinc-950" style={{ scrollMarginTop: '80px' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 bg-zinc-900 rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-2xl">

            {/* ── Left blue panel ── */}
            <div className="bg-[#00A8E1] p-10 md:p-16 lg:p-20 text-black flex flex-col justify-between">
              <div>
                <Reveal>
                  <h2 className="text-4xl md:text-5xl font-display leading-none mb-8 uppercase tracking-tight">
                    Let&apos;s<br />Talk.
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p className="text-black/80 font-medium text-base md:text-lg mb-12">
                    From intimate gatherings to massive weddings in San Diego. Tell us what you have in mind and we&apos;ll bring the flavor.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={200}>
                <div className="space-y-5 font-black uppercase text-xs tracking-[0.15em]">
                  <p className="flex items-center gap-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    (619) 985-7592
                  </p>
                  <p className="flex items-center gap-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    hola@milongaempanadas.com
                  </p>
                  <p className="flex items-center gap-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    San Diego, California
                  </p>
                </div>
              </Reveal>
            </div>

            {/* ── Right dark form panel ── */}
            <div className="p-8 md:p-16 lg:p-20">
              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                {/* honeypot */}
                <input type="text" name="_gotcha" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                  <div>
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Name</label>
                    <input
                      type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                      className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-[#00A8E1] transition text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Email</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-[#00A8E1] transition text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
                  <div>
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Pack Selection</label>
                    <select
                      name="pack" value={formData.pack} onChange={handleChange}
                      className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-[#00A8E1] transition text-zinc-400 font-bold uppercase text-[11px] [&>option]:text-gray-900"
                    >
                      <option value="The Quick Bite">The Quick Bite</option>
                      <option value="The Argentina Classic">The Argentina Classic</option>
                      <option value="The Full Experience">The Full Experience</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Guests</label>
                    <input
                      type="number" name="guests" value={formData.guests} onChange={handleChange} required min="1"
                      className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-[#00A8E1] transition text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Phone</label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-[#00A8E1] transition text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 block">Message</label>
                  <textarea
                    name="details" value={formData.details} onChange={handleChange} rows="3"
                    placeholder="Tell us about your event..."
                    className="w-full bg-transparent border-b border-zinc-800 py-3 outline-none focus:border-[#00A8E1] transition text-white resize-none placeholder-zinc-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-5 md:py-6 font-black uppercase text-lg tracking-tight
                             transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                             ${submitted
                               ? 'bg-green-500 text-white'
                               : error
                                 ? 'bg-red-500 text-white'
                                 : 'bg-[#00A8E1] text-white hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#ffffff]'
                             }`}
                >
                  {isLoading ? 'Sending...' : submitted ? '✓ Request Sent!' : error ? 'Error — Retry' : 'Send Request'}
                </button>

                {submitted && (
                  <div className="p-4 md:p-6 bg-[#00A8E1]/10 text-[#00A8E1] text-center font-black uppercase text-xs rounded-2xl border border-[#00A8E1]">
                    Received! We&apos;ll be in touch soon.
                  </div>
                )}
                {error && <p className="text-red-500 text-sm text-center font-semibold">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
