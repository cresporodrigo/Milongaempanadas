import { getAssetPath } from '../config'

const Menu = ({ openLocationModal }) => {
  return (
    <section id="menu" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-lg text-primary-dark mb-3 tracking-wider">
            MENU
          </h2>
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

          {/* Order Now CTA */}
          <div className="text-center">
            <button
              onClick={openLocationModal}
              className="px-12 py-4 bg-[#10b5cb] text-white font-bold text-xl rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Menu
