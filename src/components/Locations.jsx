import React, { useState, useEffect } from 'react'
import { getAssetPath } from '../config'

// Get current time in Pacific Time (San Diego)
const getPacificTime = () => {
  const now = new Date()
  // Convert to Pacific Time using Intl API
  const options = { timeZone: 'America/Los_Angeles', hour12: false, weekday: 'short', hour: 'numeric', minute: 'numeric' }
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now)

  const weekdayStr = parts.find(p => p.type === 'weekday').value
  const hour = parseInt(parts.find(p => p.type === 'hour').value, 10)
  const minute = parseInt(parts.find(p => p.type === 'minute').value, 10)

  const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  return { day: dayMap[weekdayStr], hours: hour, minutes: minute }
}

// Get current open/closed status and next event
const getLocationStatus = (hours) => {
  const pt = getPacificTime()
  const day = pt.day // 0=Sun, 1=Mon...
  const currentMinutes = pt.hours * 60 + pt.minutes

  // Parse hours array into structured schedule
  const schedule = {}
  hours.forEach(h => {
    const match = h.match(/^([\w–]+):\s*(.+)$/)
    if (!match) return
    const [, days, time] = match

    if (time.trim().toLowerCase() === 'closed') {
      const dayNames = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
      const dayList = days.split('–').map(d => d.trim())
      if (dayList.length === 1) {
        const dayNum = dayNames[dayList[0]]
        if (dayNum !== undefined) schedule[dayNum] = null
      }
      return
    }

    const timeMatch = time.match(/(\d+)(am|pm)\s*–\s*(\d+)(am|pm)/)
    if (!timeMatch) return
    let openH = parseInt(timeMatch[1])
    const openP = timeMatch[2]
    let closeH = parseInt(timeMatch[3])
    const closeP = timeMatch[4]
    if (openP === 'pm' && openH !== 12) openH += 12
    if (openP === 'am' && openH === 12) openH = 0
    if (closeP === 'pm' && closeH !== 12) closeH += 12
    if (closeP === 'am' && closeH === 12) closeH = 0

    const dayNames = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
    const dayList = days.split('–').map(d => d.trim())
    if (dayList.length === 2) {
      const start = dayNames[dayList[0]]
      const end = dayNames[dayList[1]]
      if (start !== undefined && end !== undefined) {
        for (let i = start; i <= end; i++) {
          schedule[i] = { open: openH * 60, close: closeH * 60 }
        }
      }
    } else {
      const dayNum = dayNames[dayList[0]]
      if (dayNum !== undefined) schedule[dayNum] = { open: openH * 60, close: closeH * 60 }
    }
  })

  const todaySchedule = schedule[day]

  if (!todaySchedule) {
    // Find next open day
    for (let i = 1; i <= 7; i++) {
      const nextDay = (day + i) % 7
      if (schedule[nextDay]) {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const openHour = Math.floor(schedule[nextDay].open / 60)
        const openMinute = schedule[nextDay].open % 60
        const period = openHour >= 12 ? 'pm' : 'am'
        const displayHour = openHour > 12 ? openHour - 12 : openHour === 0 ? 12 : openHour
        return {
          isOpen: false,
          message: `Opens ${dayNames[nextDay]} at ${displayHour}${openMinute ? ':' + String(openMinute).padStart(2, '0') : ''}${period}`,
          minutesLeft: null
        }
      }
    }
    return { isOpen: false, message: 'Closed', minutesLeft: null }
  }

  if (currentMinutes >= todaySchedule.open && currentMinutes < todaySchedule.close) {
    const minutesLeft = todaySchedule.close - currentMinutes
    let message = 'Open Now'
    if (minutesLeft <= 60) {
      message = `Closing in ${minutesLeft} min`
    }
    return { isOpen: true, message, minutesLeft }
  }

  if (currentMinutes < todaySchedule.open) {
    const minsUntilOpen = todaySchedule.open - currentMinutes
    const hours = Math.floor(minsUntilOpen / 60)
    const mins = minsUntilOpen % 60
    return {
      isOpen: false,
      message: `Opens in ${hours > 0 ? hours + 'h ' : ''}${mins}min`,
      minutesLeft: null
    }
  }

  // Past closing time, find next open
  for (let i = 1; i <= 7; i++) {
    const nextDay = (day + i) % 7
    if (schedule[nextDay]) {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const openHour = Math.floor(schedule[nextDay].open / 60)
      const period = openHour >= 12 ? 'pm' : 'am'
      const displayHour = openHour > 12 ? openHour - 12 : openHour === 0 ? 12 : openHour
      return {
        isOpen: false,
        message: `Opens ${dayNames[nextDay]} at ${displayHour}${period}`,
        minutesLeft: null
      }
    }
  }

  return { isOpen: false, message: 'Closed', minutesLeft: null }
}

const LocationCard = ({ name, address, hours, image, mapsUrl }) => {
  const [status, setStatus] = useState(() => getLocationStatus(hours))

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getLocationStatus(hours))
    }, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [hours])

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
      {/* Location Image with Status Badge */}
      <div className="h-64 overflow-hidden relative">
        <img
          src={image}
          alt={`${name} location`}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {/* Open/Closed Badge */}
        <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2 ${
          status.isOpen
            ? status.minutesLeft && status.minutesLeft <= 60
              ? 'bg-yellow-500 text-white animate-pulse'
              : 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          <span className={`w-2.5 h-2.5 rounded-full ${
            status.isOpen ? 'bg-white' : 'bg-white/60'
          }`}></span>
          <span>{status.message}</span>
        </div>
      </div>

      {/* Location Details */}
      <div className="p-8 space-y-4 flex-grow flex flex-col">
        <h3 className="text-2xl font-heading font-bold text-primary-dark">
          {name}
        </h3>

        {/* Address */}
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <p className="text-gray-700">{address}</p>
        </div>

        {/* Hours */}
        <div className="space-y-2 flex-grow">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
            </svg>
            <h4 className="font-semibold text-primary-dark">Hours:</h4>
          </div>
          <div className="pl-9 space-y-1 text-gray-600">
            {hours.map((hour, index) => (
              <p key={index} className="text-sm">{hour}</p>
            ))}
          </div>
        </div>

        {/* Get Directions Button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center btn-primary mt-auto"
        >
          Get Directions
        </a>
      </div>
    </div>
  )
}

const Locations = () => {
  const locations = [
    {
      name: 'Fashion Valley',
      address: '7007 Friars Rd, San Diego, CA 92108',
      hours: [
        'Mon–Sat: 10am – 9pm',
        'Sun: 11am – 7pm'
      ],
      image: getAssetPath('images/locations/fashion-valley.jpg'),
      mapsUrl: 'https://maps.app.goo.gl/uMbwx5aQwMWwbVJs5'
    },
    {
      name: 'San Marcos',
      address: '51 N City Dr Suite 128E, San Marcos, CA 92078',
      hours: [
        'Mon–Thu: 12pm – 6pm',
        'Fri: 12pm – 8pm',
        'Sat: 12pm – 6pm',
        'Sun: Closed'
      ],
      image: getAssetPath('images/backgrounds/indoor.jpg'),
      mapsUrl: 'https://maps.app.goo.gl/oYKZgno6zraAXW4eA'
    }
  ]

  return (
    <section id="locations" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="heading-lg text-primary-dark mb-3">
            Locations
          </h2>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Visit us at one of our locations in San Diego
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {locations.map((location, index) => (
            <LocationCard key={index} {...location} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Locations
