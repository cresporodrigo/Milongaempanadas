import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import OrderOnline from './components/OrderOnline'
import Menu from './components/Menu'
import Locations from './components/Locations'
import InstagramFeed from './components/InstagramFeed'
import Footer from './components/Footer'
import LocationModal from './components/LocationModal'

function App() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const openLocationModal = () => setIsLocationModalOpen(true)
  const closeLocationModal = () => setIsLocationModalOpen(false)

  return (
    <div className="min-h-screen">
      <Navbar openLocationModal={openLocationModal} />
      <Hero openLocationModal={openLocationModal} />
      <AboutUs />
      <OrderOnline openLocationModal={openLocationModal} />
      <Menu openLocationModal={openLocationModal} />
      <Locations />
      <InstagramFeed />
      <Footer openLocationModal={openLocationModal} />
      <LocationModal isOpen={isLocationModalOpen} onClose={closeLocationModal} />
    </div>
  )
}

export default App
