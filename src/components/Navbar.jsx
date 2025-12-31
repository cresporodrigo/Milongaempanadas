import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { getAssetPath } from '../config'

const Navbar = ({ openLocationModal }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { name: 'ABOUT US', to: 'about' },
    { name: 'MENU', to: 'menu' },
    { name: 'LOCATIONS', to: 'locations' },
    { name: 'CONTACT', to: 'contact' }
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white shadow-md'
            : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Hamburger Menu Button - Mobile Only */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-teal-50 transition-colors text-teal-600"
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo - Center on mobile, Left on desktop */}
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="cursor-pointer lg:relative absolute left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 lg:order-1"
            >
              <img
                src={getAssetPath('images/logos/logo-main.png')}
                alt="Milonga Empanadas Logo"
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Menu - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6 lg:order-2 lg:ml-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="text-gray-700 hover:text-teal-600 font-medium transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={openLocationModal}
                className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all"
              >
                ORDER NOW
              </button>
            </div>

            {/* Empty space for symmetry - Mobile only */}
            <div className="w-12 lg:hidden"></div>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          ></div>

          {/* Menu Panel */}
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl transform transition-transform duration-300 translate-x-0">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <img
                src={getAssetPath('images/logos/logo-main.png')}
                alt="Milonga Empanadas Logo"
                className="h-12 w-auto"
              />
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
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
          </div>

          {/* Menu Items */}
          <div className="p-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={-80}
                onClick={closeMenu}
                className="block py-4 px-4 text-lg font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all cursor-pointer"
              >
                {link.name}
              </Link>
            ))}

            {/* ORDER NOW Button */}
            <button
              onClick={() => {
                closeMenu()
                openLocationModal()
              }}
              className="w-full py-4 px-4 text-lg font-bold bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 rounded-lg transition-all"
            >
              ORDER NOW
            </button>
          </div>

          {/* Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/milongaempanadas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors text-teal-600"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com/milongaempanadas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors text-teal-600"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/milongaempanadas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors text-teal-600"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
