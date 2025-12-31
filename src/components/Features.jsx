const Features = () => {
  const features = [
    {
      image: '/images/features/horario.jpg',
      title: 'Opening Hours',
      description: 'Visit us during our convenient hours. We\'re open daily to serve you the freshest empanadas. Perfect for lunch, dinner, or a quick snack on the go.'
    },
    {
      image: '/images/features/local.jpg',
      title: 'Our Location',
      description: 'Find us in San Marcos and Fashion Valley. Our welcoming atmosphere and friendly staff make every visit special. Come experience authentic Argentine hospitality.'
    },
    {
      image: '/images/features/delivery.jpg',
      title: 'Delivery & Pickup',
      description: 'Order online for fast delivery or convenient pickup. Enjoy our handmade empanadas in the comfort of your home or office. Fresh and hot, every time.'
    }
  ]

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group"
            >
              {/* Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-heading font-bold text-white">
                  {feature.title}
                </h3>
              </div>

              {/* Description */}
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
