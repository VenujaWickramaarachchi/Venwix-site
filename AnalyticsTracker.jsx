import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ReactGA from 'react-ga4'

// Initialize GA4 with your ID
ReactGA.initialize('G-W7P1DVM3NC')

const AnalyticsTracker = () => {
  const location = useLocation()

  useEffect(() => {
    // Send a pageview event every time the URL changes
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    })
  }, [location])

  return null
}

export default AnalyticsTracker
