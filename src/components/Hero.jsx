import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { getAssetPath } from '../config'

const Hero = ({ openLocationModal }) => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background as fallback */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500"></div>
        <div
          className="absolute w-full h-full"
          style={{
            top: '-10%',
            left: 0,
            right: 0,
            height: '120%',
            backgroundImage: `url(${getAssetPath('images/backgrounds/order-online-bg.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            transform: `translateY(${scrollY * 0.3}px)`,
            willChange: 'transform',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/40 to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 fade-in pt-20">
        {/* ARTISANAL Logo with Scale Animation */}
        <div className="mb-6 animate-fade-in-scale">
          <img
            src={getAssetPath('images/backgrounds/artisanal.png')}
            alt="Artisanal"
            className="w-48 md:w-72 lg:w-80 h-auto mx-auto drop-shadow-2xl"
            style={{
              filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
            }}
          />
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-shadow tracking-wide">
          ALWAYS FROM SCRATCH
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white mb-6 text-shadow max-w-2xl mx-auto">
          Authentic Argentine Empanadas Made Fresh Daily
        </p>
        <button
          onClick={openLocationModal}
          className="btn-primary text-base md:text-lg cursor-pointer"
        >
          Order Now
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <Link to="about" smooth={true} duration={500} className="cursor-pointer">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </Link>
      </div>
    </section>
  )
}

export default Hero
