import React from 'react'

const AboutUs = () => {
  return (
    <section id="about" className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="heading-lg text-primary-dark mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-body text-gray-700">
              <p>
                We were born in 2021, during the midst of the pandemic,
                when our founder decided to bring the authentic flavors of Argentina
                to the heart of San Diego. What started as a small operation at local
                farmers markets has grown into a beloved destination for empanada lovers.
              </p>
              <p>
                We believe in doing things the right way - the traditional way. Every
                empanada is handmade from scratch daily using only the freshest ingredients.
                Our recipes have been passed down through generations, ensuring that each
                bite transports you straight to the streets of Buenos Aires.
              </p>
              <p>
                From our signature beef empanadas to our innovative vegetarian options,
                we take pride in offering a diverse menu that honors Argentine culinary
                traditions while embracing local Californian flavors. Our commitment to
                quality and authenticity is what sets us apart.
              </p>
              <p className="font-semibold text-teal-600">
                Join us in celebrating the art of handmade empanadas, one delicious
                bite at a time.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/images/logos/empanada-icon.png"
                alt="Empanada icon"
                className="absolute top-8 right-8 w-20 h-20 z-10 animate-bounce opacity-90"
              />
              <img
                src="/images/backgrounds/indoor.jpg"
                alt="Milonga Empanadas restaurant interior"
                className="w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-500 opacity-20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-teal-300 opacity-20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs
