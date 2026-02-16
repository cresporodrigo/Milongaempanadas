import { getAssetPath } from '../config'

const Hero = ({ openLocationModal }) => {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute w-full h-full bg-teal-600"
          style={{
            backgroundImage: `url(${getAssetPath('images/backgrounds/hero-empanadas.jpg')})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'scroll',
            willChange: 'auto',
            transform: 'translateZ(0)',
          }}
        />
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

        <button
          onClick={openLocationModal}
          className="btn-primary text-base md:text-lg cursor-pointer"
        >
          Order Now
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a href="#menu" className="cursor-pointer">
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
        </a>
      </div>
    </section>
  )
}

export default Hero
