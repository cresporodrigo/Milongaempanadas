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

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('data-original', metaDesc.content)
      metaDesc.content = 'Premium Argentine empanada catering for corporate events, weddings & parties in San Diego. Mess-free finger food — no utensils, no cleanup. From $17/person. Get a quote today.'
    }

    // Update canonical URL for /catering
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('data-original', canonical.href)
      canonical.href = 'https://milongaempanadas.com/catering'
    }

    // Update Open Graph tags for /catering (Google Ads landing page quality)
    const ogTags = {
      'og:title': 'Catering — Milonga Empanadas | Premium Argentine Catering San Diego',
      'og:description': 'Mess-free empanada catering from $17/person. Perfect for corporate offices, weddings & events. Handcrafted daily, delivered fresh.',
      'og:url': 'https://milongaempanadas.com/catering',
    }
    const ogOriginals = {}
    Object.entries(ogTags).forEach(([prop, content]) => {
      const el = document.querySelector(`meta[property="${prop}"]`)
      if (el) {
        ogOriginals[prop] = el.content
        el.content = content
      }
    })

    // Inject catering-specific Schema.org (CateringService + offers)
    const cateringSchema = document.createElement('script')
    cateringSchema.type = 'application/ld+json'
    cateringSchema.id = 'catering-schema'
    cateringSchema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      'serviceType': 'Catering',
      'name': 'Milonga Empanadas Catering',
      'description': 'Premium Argentine empanada catering for corporate events, weddings, and parties in San Diego. Mess-free finger food delivered and set up.',
      'provider': {
        '@type': 'Restaurant',
        'name': 'Milonga Empanadas',
        'url': 'https://milongaempanadas.com'
      },
      'areaServed': {
        '@type': 'City',
        'name': 'San Diego',
        'addressRegion': 'CA'
      },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Catering Packs',
        'itemListElement': [
          {
            '@type': 'Offer',
            'name': 'The Quick Bite',
            'price': '17',
            'priceCurrency': 'USD',
            'description': '2 empanadas + 1 side per person. Perfect for quick office lunches.'
          },
          {
            '@type': 'Offer',
            'name': 'The Argentina Classic',
            'price': '22',
            'priceCurrency': 'USD',
            'description': '3 empanadas + 1 side per person. Ideal for celebrations and corporate events.'
          },
          {
            '@type': 'Offer',
            'name': 'The Full Experience',
            'price': '28',
            'priceCurrency': 'USD',
            'description': '3 empanadas + 1 side + chocotorta per person. Perfect for weddings and large events.'
          }
        ]
      }
    })
    document.head.appendChild(cateringSchema)

    return () => {
      // Restore meta description
      if (metaDesc && metaDesc.getAttribute('data-original')) {
        metaDesc.content = metaDesc.getAttribute('data-original')
        metaDesc.removeAttribute('data-original')
      }
      // Restore canonical
      if (canonical && canonical.getAttribute('data-original')) {
        canonical.href = canonical.getAttribute('data-original')
        canonical.removeAttribute('data-original')
      }
      // Restore OG tags
      Object.entries(ogOriginals).forEach(([prop, content]) => {
        const el = document.querySelector(`meta[property="${prop}"]`)
        if (el) el.content = content
      })
      // Remove catering schema
      const schemaEl = document.getElementById('catering-schema')
      if (schemaEl) schemaEl.remove()
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
