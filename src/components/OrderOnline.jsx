import { useState, useEffect } from 'react'
import { getAssetPath } from '../config'

const OrderOnline = ({ openLocationModal }) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="order" className="relative section-padding overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
          style={{
            backgroundImage: `url(${getAssetPath('images/backgrounds/order-online-bg.jpg')})`,
            transform: `translateY(${(scrollY - 1000) * 0.3}px)`,
            willChange: 'transform',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-teal-800/20 to-black/10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="heading-lg text-white mb-4 text-shadow">
            Order Online
          </h2>
          <p className="text-xl md:text-2xl text-white mb-8 text-shadow">
            You can order online for delivery or pickup, the best empanadas in town
          </p>
          <button
            onClick={openLocationModal}
            className="inline-block px-12 py-4 bg-white text-teal-600 font-bold text-lg rounded-lg
                     hover:bg-cream hover:shadow-teal-300/50 transition-all duration-300 transform hover:scale-105
                     shadow-2xl hover:shadow-3xl"
          >
            ORDER NOW
          </button>
          <div className="pt-8 flex justify-center items-center space-x-8 flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <span className="font-medium text-shadow">Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/>
              </svg>
              <span className="font-medium text-shadow">Fresh Ingredients</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
              </svg>
              <span className="font-medium text-shadow">Handmade Daily</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderOnline
