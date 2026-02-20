import { useState } from 'react';
import { getAssetPath } from '../config'

export default function Catering() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: 'Corporate Event',
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Anti-spam honeypot check
    if (honeypot) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/fashionvalley@milongaempanadas.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          guests: formData.guests,
          eventDate: formData.eventDate,
          details: formData.details,
          _subject: `Catering Request from ${formData.fullName}`,
          _template: 'table'
        })
      })

      if (response.ok) {
        setSubmitted(true);
        setIsLoading(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          eventType: 'Corporate Event',
          guests: '',
          eventDate: '',
          details: '',
        });
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

  const services = [
    {
      image: getAssetPath('images/features/corporate-events.png'),
      title: 'Corporate Events',
      description: 'Professional catering solutions for your business gatherings and conferences'
    },
    {
      image: getAssetPath('images/features/private-parties.png'),
      title: 'Private Parties',
      description: 'Memorable celebrations with customized empanada selections'
    },
    {
      image: getAssetPath('images/features/custom-menus.png'),
      title: 'Custom Menus',
      description: 'Tailored dining experiences designed for your specific needs'
    }
  ];

  const eventTypes = [
    'Corporate Event',
    'Private Party',
    'Wedding',
    'Birthday Party',
    'Anniversary',
    'Other'
  ];

  return (
    <section id="catering" className="relative section-padding overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute w-full h-full"
          style={{
            backgroundImage: `url(${getAssetPath('images/backgrounds/hero-empanadas.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">
            Catering Services
          </h2>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-2xl font-heading font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Order Catering CTA */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12 text-center">
          <h3 className="heading-md text-primary-dark mb-4">
            Order Your Catering
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Place your catering order directly through our EZcater page — fast, easy, and hassle-free.
          </p>
          <a
            href="https://www.ezcater.com/catering/milonga-empanadas-3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-12 rounded-lg text-xl transition-colors"
          >
            Order Now
          </a>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 font-heading text-lg">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Custom Request Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h3 className="heading-md text-primary-dark text-center mb-4">
            Need Something Special?
          </h3>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            If you have a custom request or need a personalized catering experience, fill out the form below and we'll get back to you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot anti-spam */}
            <input
              type="text"
              name="_gotcha"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="john@example.com"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="50"
                />
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  lang="en-US"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>
            </div>

            {/* Event Details */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Details *
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="Tell us about your event, menu preferences, dietary restrictions, and any other special requirements..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  error ? 'bg-red-600 hover:bg-red-700 text-white' : submitted ? 'bg-green-600 text-white' : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                }`}
              >
                {isLoading ? 'Sending...' : submitted ? '✓ Request Sent!' : error ? 'Error — Try Again' : 'Send Request'}
              </button>
              {error && (
                <p className="text-red-500 text-sm text-center mt-2">Something went wrong. Please try again later.</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
