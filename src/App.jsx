import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Menu from './components/Menu'
import Locations from './components/Locations'
import Catering from './components/Catering'
import CateringCTA from './components/CateringCTA'
import InstagramFeed from './components/InstagramFeed'
import Footer from './components/Footer'
import LocationModal from './components/LocationModal'

// Scroll to top when navigating to a new route (but respect hash anchors)
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const prevPathRef = React.useRef(pathname)

  useEffect(() => {
    const pathnameChanged = prevPathRef.current !== pathname
    prevPathRef.current = pathname

    if (hash) {
      // Retry until the target element exists (route may still be mounting)
      let attempts = 0
      const tryScroll = () => {
        const el = document.querySelector(hash)
        if (el) {
          const navHeight = 90 // navbar height + breathing room
          const top = el.getBoundingClientRect().top + window.scrollY - navHeight
          window.scrollTo({ top, behavior: 'smooth' })
        } else if (attempts < 10) {
          attempts++
          setTimeout(tryScroll, 80)
        }
      }
      if (pathnameChanged) {
        // Coming from another page — go to top first, then scroll to section
        window.scrollTo({ top: 0, behavior: 'instant' })
        setTimeout(tryScroll, 50)
      } else {
        // Same page, just hash changed — scroll directly
        tryScroll()
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
  }, [pathname, hash])
  return null
}

function HomePage({ openLocationModal }) {
  useEffect(() => {
    document.title = 'Milonga Empanadas — Premium Handcrafted Argentine Catering & Empanadas in San Diego'
  }, [])

  return (
    <>
      <Hero openLocationModal={openLocationModal} />
      <Menu openLocationModal={openLocationModal} />
      <CateringCTA />
      <Locations />
      <AboutUs />
      <InstagramFeed />
    </>
  )
}

function CateringPage() {
  useEffect(() => {
    document.title = 'Catering — Milonga Empanadas | Mess-Free Argentine Catering in San Diego'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('data-original', metaDesc.content)
      metaDesc.content = 'Premium Argentine empanada catering for corporate events, weddings & parties in San Diego. Mess-free finger food — no utensils, no cleanup. Get a quote today.'
    }
    return () => {
      if (metaDesc && metaDesc.getAttribute('data-original')) {
        metaDesc.content = metaDesc.getAttribute('data-original')
        metaDesc.removeAttribute('data-original')
      }
    }
  }, [])

  return <Catering />
}

function App() {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const openLocationModal = () => setIsLocationModalOpen(true)
  const closeLocationModal = () => setIsLocationModalOpen(false)

  return (
    <>
      <ScrollToTop />
      <Navbar openLocationModal={openLocationModal} />
      <Routes>
        <Route path="/" element={<HomePage openLocationModal={openLocationModal} />} />
        <Route path="/catering" element={<CateringPage />} />
      </Routes>
      <Footer openLocationModal={openLocationModal} />
      <LocationModal isOpen={isLocationModalOpen} onClose={closeLocationModal} />
    </>
  )
}

export default App
