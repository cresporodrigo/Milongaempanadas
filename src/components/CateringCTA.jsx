import { Link } from 'react-router-dom'

const CateringCTA = () => {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden" style={{ backgroundColor: '#E09A7A' }}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <div className="text-center md:text-left max-w-xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-heading tracking-wide">
              Need Catering?
            </h2>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              From corporate events to private parties, bring the authentic taste of Milonga empanadas to your next gathering.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <Link
              to="/catering"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              style={{ color: '#E09A7A' }}
            >
              Order Catering
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CateringCTA
