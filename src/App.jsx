import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Menu from './components/Menu'
import Locations from './components/Locations'
import Catering from './components/Catering'
import InstagramFeed from './components/InstagramFeed'
import Footer from './components/Footer'
import LocationModal from './components/LocationModal'

function App() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const openLocationModal = () => setIsLocationModalOpen(true)
  const closeLocationModal = () => setIsLocationModalOpen(false)

  return (
    <>
      <Navbar openLocationModal={openLocationModal} />
      <Hero openLocationModal={openLocationModal} />
      <Menu openLocationModal={openLocationModal} />
      <Locations />
      <Catering />
      <AboutUs />
      <InstagramFeed />
      <Footer openLocationModal={openLocationModal} />
      <LocationModal isOpen={isLocationModalOpen} onClose={closeLocationModal} />
    </>
  )
}

export default App
