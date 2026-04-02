import { getAssetPath } from '../config'

const AboutUs = () => {
  return (
    <section id="about" className="section-padding bg-cream" style={{ scrollMarginTop: '80px' }}>
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="heading-lg text-primary-dark mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-body text-gray-700">
              <p>
                Born during the pandemic in 2021, Chef Matías Bienati set out
                to bring authentic Argentine street food to San Diego — done right.
                What started at local farmers markets near Fashion Valley has become
                the city's go-to for handcrafted gourmet empanadas.
              </p>
              <p>
                Every empanada is made from scratch daily with fresh, locally sourced
                ingredients. No shortcuts, no frozen dough — just generations-old recipes
                with artisanal technique. The result? Premium fast-casual finger food that
                needs no plates, no utensils, and zero cleanup.
              </p>
              <p>
                From our signature beef empanadas to healthy vegetarian options,
                each recipe honours Argentine traditions while embracing California's
                freshest flavours. Perfect for grab-and-go lunch, corporate catering,
                or luxury wedding reception finger food.
              </p>
              <p className="font-semibold text-teal-600">
                Handcrafted. Mess-free. Unforgettable — one bite at a time.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={getAssetPath('images/logos/empanada-icon.png')}
                alt="Empanada icon"
                className="absolute top-8 right-8 w-20 h-20 z-10 animate-bounce opacity-90"
                loading="lazy"
                width="80"
                height="80"
              />
              <img
                src={getAssetPath('images/backgrounds/our-story.jpg')}
                alt="Chef Matías Bienati handcrafting Argentine empanadas at Milonga, San Diego"
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
                width="600"
                height="500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
