'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PopupModal } from 'react-calendly'
import ReactGA from 'react-ga4'

import MinimalHero from './components/ui/hero-minimalism'
import StorySections from './components/ui/story-sections'

// --- Shared Utilities ---
const scrollToSection = (e, targetId, callback) => {
  e.preventDefault()
  const id = targetId.replace('#', '')
  const element = document.getElementById(id)

  if (element) {
    let yOffset = -100

    if (id === 'about' || id === 'process' || id === 'projects') {
      yOffset += window.innerHeight
    }

    const y = element.getBoundingClientRect().top + window.scrollY + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  if (callback) callback()
}

// --- HubSpot Form Component ---
const HubSpotForm = ({ region, portalId, formId }) => {
  useEffect(() => {
    const existingScript = document.getElementById('hs-script-loader')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://js.hsforms.net/forms/v2.js'
      script.id = 'hs-script-loader'
      document.body.appendChild(script)
      script.addEventListener('load', () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: region,
            portalId: portalId,
            formId: formId,
            target: '#hubspotForm',
          })
        }
      })
    } else if (window.hbspt) {
      window.hbspt.forms.create({
        region: region,
        portalId: portalId,
        formId: formId,
        target: '#hubspotForm',
      })
    }
  }, [region, portalId, formId])

  return (
    <div className='w-full bg-slate-900 p-8 rounded-xl border border-slate-700/50 mt-8'>
      <div id='hubspotForm'></div>
    </div>
  )
}

// --- Shared Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

// --- Common Button Styles ---
const btnClassesPrimary =
  'px-8 py-3.5 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 transition-all duration-300 shadow-[0_4px_20px_-5px_rgba(220,38,38,0.4)] hover:shadow-[0_10px_25px_-5px_rgba(220,38,38,0.6)] hover:-translate-y-0.5'
const btnClassesSmall =
  'px-6 py-2.5 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 transition-all duration-300 shadow-[0_4px_15px_-3px_rgba(220,38,38,0.4)] hover:-translate-y-0.5'

// --- Navigation Bar ---
const Navbar = ({ setIsCalendlyOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-slate-950/90 backdrop-blur-md py-4 shadow-lg border-b border-slate-800'
          : 'bg-transparent py-6'
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center relative z-50'>
        <a
          href='/'
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img
            src='/logo.png'
            alt='Brand Logo'
            className='h-20 w-auto object-contain p-0 -mt-4'
          />
        </a>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-300'>
          <a
            href='#about'
            onClick={(e) => scrollToSection(e, 'about')}
            className='hover:text-red-500 transition-colors'
          >
            About
          </a>
          <a
            href='#services'
            onClick={(e) => scrollToSection(e, 'services')}
            className='hover:text-red-500 transition-colors'
          >
            Services
          </a>
          <a
            href='#process'
            onClick={(e) => scrollToSection(e, 'process')}
            className='hover:text-red-500 transition-colors'
          >
            Process
          </a>
          <a
            href='#projects'
            onClick={(e) => scrollToSection(e, 'projects')}
            className='hover:text-red-500 transition-colors'
          >
            Work
          </a>
        </div>

        <button
          type='button'
          onClick={() => setIsCalendlyOpen(true)}
          className={`hidden md:block text-sm ${btnClassesSmall}`}
        >
          Contact us
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          type='button'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className='md:hidden text-white p-2 focus:outline-none'
          aria-label='Toggle mobile menu'
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 overflow-hidden md:hidden shadow-2xl'
          >
            <div className='flex flex-col px-6 py-8 gap-6'>
              {[
                { name: 'About', id: 'about' },
                { name: 'Services', id: 'services' },
                { name: 'Process', id: 'process' },
                { name: 'Work', id: 'projects' },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${link.id}`}
                  onClick={(e) =>
                    scrollToSection(e, link.id, () =>
                      setIsMobileMenuOpen(false),
                    )
                  }
                  className='text-lg font-medium text-slate-300 hover:text-red-500 transition-colors'
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.button
                type='button'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsCalendlyOpen(true)
                }}
                className={`w-full mt-4 text-center ${btnClassesPrimary}`}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// --- Sticky WhatsApp Button ---
const WhatsAppButton = () => (
  <motion.a
    href='https://wa.me/94702643587'
    target='_blank'
    rel='noopener noreferrer'
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
    className='fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:bg-[#20bd5a] transition-colors'
    aria-label='Chat on WhatsApp'
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 448 512'
      className='w-7 h-7 fill-current'
    >
      <path d='M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.4c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 334.1l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z' />
    </svg>
  </motion.a>
)

// --- Services Section ---
const Services = () => {
  const services = [
    {
      title: 'E-Commerce Development',
      description:
        'Custom Shopify and WooCommerce stores designed to convert visitors into customers.',
    },
    {
      title: 'Digital Marketing',
      description:
        'Paid advertising, social media management, and customer acquisition strategies.',
    },
    {
      title: 'SEO & Growth',
      description: 'Improve rankings and increase organic traffic.',
    },
    {
      title: 'Website Maintenance',
      description: 'Continuous updates, support, optimization, and security.',
    },
  ]

  return (
    <motion.section
      id='services'
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-20 px-6 bg-slate-950'
      viewport={{ once: true }}
    >
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          variants={fadeInUp}
          className='text-4xl font-bold text-white mb-16 text-center'
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Our Services
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {services.map((service, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className='bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700/50 hover:border-red-600/30 transition-colors'
            >
              <div className='w-12 h-12 bg-red-600/20 rounded-xl mb-6 flex items-center justify-center'>
                <div className='w-6 h-6 bg-red-600 rounded-md shadow-[0_0_15px_rgba(220,38,38,0.5)]'></div>
              </div>
              <h3 className='text-xl font-semibold text-white mb-4'>
                {service.title}
              </h3>
              <p className='text-slate-400 leading-relaxed'>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// --- Stats Section ---
const StatCounter = ({ end, duration, visibleStats }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!visibleStats) return
    const increment = end / (duration * 100)
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 10)
    return () => clearInterval(timer)
  }, [visibleStats, end, duration])

  return <span>{count}</span>
}

const Stats = () => {
  const [visibleStats, setVisibleStats] = useState(false)

  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      onViewportEnter={() => setVisibleStats(true)}
      className='py-20 px-6 bg-black'
      viewport={{ once: true }}
    >
      <div className='max-w-6xl mx-auto'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {[
            { label: 'Projects Delivered', value: 50 },
            { label: 'Client Satisfaction', value: 95 },
            { label: 'Support', value: 24 },
            { label: 'Custom Solutions', value: 100 },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeInUp} className='text-center'>
              <div className='text-5xl font-bold text-red-600 mb-3 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]'>
                <StatCounter
                  end={stat.value}
                  duration={2}
                  visibleStats={visibleStats}
                />
                {stat.value === 24 ? '/7' : '%'}
              </div>
              <p className='text-slate-400'>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// --- UPDATED CTA Section ---
const CTA = ({ setIsCalendlyOpen }) => (
  <motion.section
    id='contact'
    initial='hidden'
    whileInView='visible'
    variants={staggerContainer}
    className='relative overflow-hidden py-12 md:py-24 border-y border-slate-800 bg-black'
    viewport={{ once: true }}
  >
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none'></div>

    <div className='relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-8 text-center sm:gap-8 z-10'>
      <motion.div
        variants={fadeInUp}
        className='inline-flex items-center rounded-full border border-red-600/30 bg-red-600/10 px-3 py-1 text-sm font-medium text-red-500 backdrop-blur-md'
      >
        Let's Connect
      </motion.div>

      <motion.h2
        variants={fadeInUp}
        className='text-3xl font-semibold sm:text-5xl tracking-tight text-white'
        style={{ fontFamily: 'Outfit, sans-serif' }}
      >
        Ready To Grow Online?
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        className='text-lg text-slate-400 max-w-2xl'
      >
        Book your free strategy call below, or leave us your details and we'll
        reach out.
      </motion.p>

      <motion.div variants={fadeInUp}>
        <button
          type='button'
          onClick={() => setIsCalendlyOpen(true)}
          className={btnClassesPrimary}
        >
          Open Calendar to Book
        </button>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className='w-full text-left mt-8 relative z-20'
      >
        <HubSpotForm
          region='na2'
          portalId='48806883'
          formId='124129e1-ec6a-4623-8d5f-a912277033f8'
        />
      </motion.div>
    </div>
  </motion.section>
)

// --- Footer ---
const Footer = () => (
  <footer className='bg-slate-950 border-t border-slate-800 py-16 px-6'>
    <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12'>
      <div>
        <h3 className='text-white font-semibold text-lg mb-4'>Venwix</h3>
        <p className='text-slate-400 text-sm leading-relaxed'>
          Built for Builders
        </p>
      </div>
      <div>
        <p className='text-white font-semibold mb-4'>Services</p>
        <ul className='space-y-3 text-slate-400 text-sm'>
          <li>
            <span className='hover:text-red-500 cursor-pointer transition-colors'>
              E-Commerce Development
            </span>
          </li>
          <li>
            <span className='hover:text-red-500 cursor-pointer transition-colors'>
              Digital Marketing
            </span>
          </li>
          <li>
            <span className='hover:text-red-500 cursor-pointer transition-colors'>
              SEO & Growth
            </span>
          </li>
          <li>
            <span className='hover:text-red-500 cursor-pointer transition-colors'>
              Website Maintenance
            </span>
          </li>
        </ul>
      </div>
      <div>
        <p className='text-white font-semibold mb-4'>Company</p>
        <ul className='space-y-3 text-slate-400 text-sm'>
          {/* Updated Footer Links */}
          <li>
            <a
              href='#about'
              onClick={(e) => scrollToSection(e, 'about')}
              className='hover:text-red-500 transition-colors'
            >
              About
            </a>
          </li>
          <li>
            <a
              href='#contact'
              onClick={(e) => scrollToSection(e, 'contact')}
              className='hover:text-red-500 transition-colors'
            >
              Contact
            </a>
          </li>
          <li>
            <span className='hover:text-red-500 cursor-pointer transition-colors'>
              Blog
            </span>
          </li>
          <li>
            <span className='hover:text-red-500 cursor-pointer transition-colors'>
              Privacy
            </span>
          </li>
        </ul>
      </div>
      <div>
        <p className='text-white font-semibold mb-4'>Connect</p>
        <ul className='space-y-3 text-slate-400 text-sm'>
          <li>
            <a
              href='https://www.facebook.com/profile.php?id=61570936300925' // Replace with your actual Twitter/X URL
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-red-500 cursor-pointer transition-colors block'
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/company/109300011/admin/dashboard/' // Replace with your actual LinkedIn URL
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-red-500 cursor-pointer transition-colors block'
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href='https://www.instagram.com/venwix_tech/' // Replace with your actual Instagram URL
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-red-500 cursor-pointer transition-colors block'
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href='https://www.tiktok.com/@venwixtech?lang=en' // Replace with your actual Instagram URL
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-red-500 cursor-pointer transition-colors block'
            >
              Tiktok
            </a>
          </li>
          <li>
            <a
              href='mailto:hello@venwix.com' // Pulls from your contact email
              className='hover:text-red-500 cursor-pointer transition-colors block'
            >
              Email : hello@venwix.com
            </a>
          </li>
          <li>
            <a
              href='tel:+94702643587'
              className='hover:text-red-500 cursor-pointer transition-colors block'
            >
              Phone : +94 70 264 3587
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className='border-t border-slate-800 pt-8 text-center text-slate-500 text-sm'>
      <p>
        © {new Date().getFullYear()} Venwix. All rights reserved. | Built for
        the Builders.
      </p>
    </div>
  </footer>
)

// --- Main App Wrapper ---
const VenvixWebsite = () => {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  // Initialize GA4 and track the single page view when the site loads
  useEffect(() => {
    // Make sure to replace 'G-YOUR_MEASUREMENT_ID' with your actual GA4 Measurement ID
    ReactGA.initialize('G-W7P1DVM3NC')
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname })
  }, [])

  return (
    <div className='bg-black text-white overflow-x-hidden relative selection:bg-red-600/30 selection:text-white'>
      <Navbar setIsCalendlyOpen={setIsCalendlyOpen} />

      <MinimalHero setIsCalendlyOpen={setIsCalendlyOpen} />

      <StorySections setIsCalendlyOpen={setIsCalendlyOpen} />

      <Services />
      <Stats />

      <CTA setIsCalendlyOpen={setIsCalendlyOpen} />
      <Footer />
      <WhatsAppButton />

      <PopupModal
        url='https://calendly.com/venuja071/web-design-development'
        pageSettings={{
          backgroundColor: '0f172a',
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: 'dc2626',
          textColor: 'ffffff',
        }}
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        rootElement={document.getElementById('root') || document.body}
      />
    </div>
  )
}

export default VenvixWebsite
