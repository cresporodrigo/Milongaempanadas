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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xvgoeyzo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          guests: formData.guests,
          eventDate: formData.eventDate,
          details: formData.details,
          _to: 'fashionvalley@milongaempanadas.com'
        })
      })

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          eventType: 'Corporate Event',
          guests: '',
          eventDate: '',
          details: '',
        });
        setTimeout(() => setSubmitted(false), 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
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
    <section id="catering" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-primary-dark mb-4">
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

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-12">
          <h3 className="heading-md text-primary-dark text-center mb-8">
            Request a Catering Quote
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
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
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {submitted ? 'Request Sent!' : 'Send Catering Request'}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-cyan-50 rounded-lg p-8 md:p-12">
          <h3 className="heading-md text-primary-dark text-center mb-8">
            Direct Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-cyan-600 p-4 rounded-full mb-4 text-2xl">
                ✉️
              </div>
              <h4 className="text-lg font-heading font-semibold text-gray-800 mb-2">Email</h4>
              <a href="mailto:fashionvalley@milongaempanadas.com" className="text-cyan-600 hover:text-cyan-700">
                fashionvalley@milongaempanadas.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-cyan-600 p-4 rounded-full mb-4 text-2xl">
                📱
              </div>
              <h4 className="text-lg font-heading font-semibold text-gray-800 mb-2">Phone</h4>
              <a href="tel:+15551234567" className="text-cyan-600 hover:text-cyan-700">
                +1 (555) 123-4567
              </a>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-cyan-600 p-4 rounded-full mb-4 text-2xl">
                📍
              </div>
              <h4 className="text-lg font-heading font-semibold text-gray-800 mb-2">Location</h4>
              <p className="text-gray-600">
                123 Empanada Street<br />
                Buenos Aires, Argentina
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
