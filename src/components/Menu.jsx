import { getAssetPath } from '../config'

const Menu = ({ openLocationModal }) => {
  return (
    <section id="menu" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-lg text-primary-dark mb-3 tracking-wider">
            MENU
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Explore our delicious selection of handmade empanadas, crafted with authentic Argentine recipes
          </p>
        </div>

        {/* Menu Image */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-8 hover:shadow-3xl transition-shadow duration-300">
            <img
              src={getAssetPath('images/backgrounds/menu.jpg')}
              alt="Milonga Empanadas Menu"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={openLocationModal}
              className="btn-primary text-lg"
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu
