import React from 'react'
import { getAssetPath } from '../config'

const LocationCard = ({ name, address, hours, image, mapsUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Location Image */}
      <div className="h-64 overflow-hidden">
        <img
          src={image}
          alt={`${name} location`}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Location Details */}
      <div className="p-8 space-y-4">
        <h3 className="text-2xl font-heading font-bold text-primary-dark">
          {name}
        </h3>

        {/* Address */}
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <p className="text-gray-700">{address}</p>
        </div>

        {/* Hours */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            <h4 className="font-semibold text-primary-dark">Hours:</h4>
          </div>
          <div className="pl-9 space-y-1 text-gray-600">
            {hours.map((hour, index) => (
              <p key={index} className="text-sm">{hour}</p>
            ))}
          </div>
        </div>

        {/* Get Directions Button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center btn-primary mt-6"
        >
          Get Directions
        </a>
      </div>
    </div>
  )
}

const Locations = () => {
  const locations = [
    {
      name: 'San Marcos',
      address: '51 N City Dr Suite 128E, San Marcos, CA 92078',
      hours: [
        'Mon–Thu: 12pm – 6pm',
        'Fri: 12pm – 8pm',
        'Sat: 12pm – 6pm',
        'Sun: Closed'
      ],
      image: getAssetPath('images/backgrounds/indoor.jpg'),
      mapsUrl: 'https://maps.google.com/?q=51+N+City+Dr+Suite+128E+San+Marcos+CA+92078'
    },
    {
      name: 'Fashion Valley',
      address: '7007 Friars Rd, San Diego, CA 92108',
      hours: [
        'Mon–Sat: 10am – 9pm',
        'Sun: 11am – 7pm'
      ],
      image: getAssetPath('images/locations/fashion-valley.jpg'),
      mapsUrl: 'https://maps.google.com/?q=7007+Friars+Rd+San+Diego+CA+92108'
    }
  ]

  return (
    <section id="locations" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-primary-dark mb-4">
            Locations
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Visit us at one of our locations in San Diego
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {locations.map((location, index) => (
            <LocationCard key={index} {...location} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Locations
