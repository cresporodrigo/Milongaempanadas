import { useState } from 'react'

const LocationModal = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Location configuration with coordinates
  const locations = [
    {
      name: 'San Marcos',
      address: '51 N City Dr Suite 128E, San Marcos, CA 92078',
      lat: 33.1434,
      lng: -117.1661,
      squareUrl: 'https://www.doordash.com/es/store/milonga-empanadas-san-marcos-24901827/82015957/?srsltid=AfmBOooOWvEH1YpdM1EFzVkAmg5NHyaovmD05IzhUkjUGcENfwsthkLp'
    },
    {
      name: 'Fashion Valley',
      address: '7007 Friars Rd, San Diego, CA 92108',
      lat: 32.7677,
      lng: -117.1664,
      squareUrl: 'https://order.online/business/milonga-empanadas-15941855'
    }
  ]

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Find the nearest location
  const findNearestLocation = async (userAddress) => {
    try {
      setIsLoading(true)
      setError('')

      // Use Nominatim for geocoding (free)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(userAddress)}`
      )

      if (!response.ok) {
        throw new Error('Error searching for address')
      }

      const data = await response.json()

      if (data.length === 0) {
        setError('Address not found. Please try another one.')
        setIsLoading(false)
        return
      }

      const userLat = parseFloat(data[0].lat)
      const userLng = parseFloat(data[0].lon)

      // Calculate distances to all locations
      const locationsWithDistance = locations.map(location => ({
        ...location,
        distance: calculateDistance(userLat, userLng, location.lat, location.lng)
      }))

      // Find the nearest one
      const nearest = locationsWithDistance.reduce((prev, current) =>
        prev.distance < current.distance ? prev : current
      )

      // Redirect to the nearest location's ordering page
      window.location.href = nearest.squareUrl

    } catch (err) {
      setError('There was an error processing your location. Please try again.')
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!address.trim()) {
      setError('Please enter your address')
      return
    }
    findNearestLocation(address)
  }

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Your browser does not support geolocation')
      return
    }

    setIsLoading(true)
    setError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords

        // Calculate distances
        const locationsWithDistance = locations.map(location => ({
          ...location,
          distance: calculateDistance(latitude, longitude, location.lat, location.lng)
        }))

        // Find the nearest one
        const nearest = locationsWithDistance.reduce((prev, current) =>
          prev.distance < current.distance ? prev : current
        )

        // Redirect
        window.location.href = nearest.squareUrl
      },
      (error) => {
        setError('Could not get your location. Please enter your address manually.')
        setIsLoading(false)
      }
    )
  }

  const handleSelectLocation = (location) => {
    window.location.href = location.squareUrl
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-heading font-bold text-primary-dark mb-2">
            Where are you located?
          </h2>
          <p className="text-gray-600">
            We'll direct you to the nearest location to place your order
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 123 Main St, San Diego, CA"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Order Now'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Use My Location Button */}
        <button
          onClick={handleUseMyLocation}
          disabled={isLoading}
          className="w-full py-3 px-4 border-2 border-teal-500 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Use my current location</span>
        </button>

        {/* Manual Selection */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-3 text-center">Or choose your location directly:</p>
          <div className="space-y-2">
            {locations.map((location) => (
              <button
                key={location.name}
                onClick={() => handleSelectLocation(location)}
                className="w-full p-3 text-left border border-gray-200 rounded-lg hover:border-teal-500 hover:bg-teal-50 transition-all"
              >
                <p className="font-semibold text-primary-dark">{location.name}</p>
                <p className="text-sm text-gray-600">{location.address}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationModal
