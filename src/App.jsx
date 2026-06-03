import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PopupModal } from 'react-calendly'

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

const VenvixWebsite = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [visibleStats, setVisibleStats] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // --- NEW: Navigation Bar ---
  const Navbar = () => (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-md py-4 shadow-lg border-b border-slate-800'
          : 'bg-transparent py-6'
      }`}
    >
      <div className='max-w-7xl mx-auto px-6 flex justify-between items-center'>
        <a
          href='#'
          className='text-2xl font-bold text-white tracking-tighter'
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Venvix
        </a>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-300'>
          <a href='#about' className='hover:text-amber-500 transition'>
            About
          </a>
          <a href='#services' className='hover:text-amber-500 transition'>
            Services
          </a>
          <a href='#process' className='hover:text-amber-500 transition'>
            Process
          </a>
          <a href='#projects' className='hover:text-amber-500 transition'>
            Work
          </a>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='hidden md:block px-6 py-2.5 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition text-sm'
        >
          Get Started
        </motion.button>

        {/* Mobile menu icon (Placeholder for visual completeness) */}
        <button className='md:hidden text-white'>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>
    </motion.nav>
  )

  // --- NEW: Sticky WhatsApp Button ---
  const WhatsAppButton = () => (
    <motion.a
      href='https://wa.me/94702643587' // REPLACE WITH YOUR ACTUAL NUMBER
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

  // Hero Section
  const Hero = () => (
    <section className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black relative overflow-hidden pt-20 flex items-center'>
      {/* Animated background orbs */}
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className='absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl opacity-20'
      />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className='absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-20'
      />

      <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10'>
        {/* Left content */}
        <motion.div
          initial='hidden'
          animate='visible'
          variants={staggerContainer}
        >
          <motion.h1
            variants={fadeInUp}
            className='text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight'
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Your Business Deserves More Than Just A Website.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className='text-xl text-slate-300 mb-8 leading-relaxed max-w-lg'
          >
            We build e-commerce experiences and growth strategies that help
            businesses scale online.
          </motion.p>
          <motion.div variants={fadeInUp} className='flex gap-4 flex-wrap'>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCalendlyOpen(true)}
              className='px-8 py-4 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition'
            >
              Book A Free Consultation
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-8 py-4 border border-amber-500/50 text-white font-semibold rounded-lg hover:border-amber-500 transition'
            >
              View Our Work
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right - Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className='relative h-96 hidden lg:block'
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className='absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 shadow-2xl'
          >
            <div className='space-y-4'>
              <div className='h-2 bg-amber-500/30 rounded w-32'></div>
              <div className='space-y-3'>
                <div className='h-12 bg-slate-700/50 rounded-lg flex items-center px-4'>
                  <div className='w-2 h-2 bg-green-400 rounded-full mr-3'></div>
                  <div className='h-1.5 bg-slate-600 rounded w-20'></div>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                  <div className='h-20 bg-slate-700/50 rounded-lg'></div>
                  <div className='h-20 bg-slate-700/50 rounded-lg'></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )

  // About Section
  const About = () => (
    <motion.section
      id='about'
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-20 px-6 bg-black'
      viewport={{ once: true }}
    >
      <div className='max-w-4xl mx-auto'>
        <motion.h2
          variants={fadeInUp}
          className='text-4xl font-bold text-white mb-8 text-center'
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Built By Entrepreneurs, For Entrepreneurs.
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className='text-lg text-slate-300 text-center leading-relaxed mb-6'
        >
          Venvix was founded by two university graduates passionate about
          helping businesses succeed online.
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className='text-lg text-slate-300 text-center leading-relaxed'
        >
          We combine creativity, technology, and marketing to create digital
          experiences that generate real business growth.
        </motion.p>
      </div>
    </motion.section>
  )

  // Services Section
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

  const Services = () => (
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
              className='bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-xl border border-slate-700/50 hover:border-amber-500/30 transition'
            >
              <div className='w-12 h-12 bg-amber-500/20 rounded-lg mb-6 flex items-center justify-center'>
                <div className='w-6 h-6 bg-amber-500 rounded-md'></div>
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

  // Stats Section
  const StatCounter = ({ end, duration }) => {
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

  const Stats = () => (
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
              <div className='text-5xl font-bold text-amber-500 mb-3'>
                <StatCounter end={stat.value} duration={2} />
                {stat.value === 24 ? '/7' : '%'}
              </div>
              <p className='text-slate-400'>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )

  // Process Section
  const Process = () => (
    <motion.section
      id='process'
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-20 px-6 bg-slate-950'
      viewport={{ once: true }}
    >
      <div className='max-w-4xl mx-auto'>
        <motion.h2
          variants={fadeInUp}
          className='text-4xl font-bold text-white mb-16 text-center'
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Our Process
        </motion.h2>
        <div className='space-y-8'>
          {[
            { step: 'Discover', desc: 'Understanding your business' },
            { step: 'Design', desc: 'Crafting your digital experience' },
            { step: 'Build', desc: 'Developing scalable solutions' },
            { step: 'Grow', desc: 'Marketing and optimization' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className='flex gap-8 items-start relative'
            >
              <div className='flex-shrink-0 z-10'>
                <div className='w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center bg-slate-950'>
                  <span className='text-amber-500 font-bold text-xl'>
                    {i + 1}
                  </span>
                </div>
              </div>
              <div className='flex-grow pt-2'>
                <h3 className='text-2xl font-semibold text-white mb-2'>
                  {item.step}
                </h3>
                <p className='text-slate-400'>{item.desc}</p>
              </div>
              {i < 3 && (
                <div className='absolute left-8 top-16 w-0.5 h-20 bg-gradient-to-b from-amber-500/30 to-transparent'></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )

  // Projects Section
  const projects = [
    { title: 'Fashion Store', color: 'from-purple-500/20' },
    { title: 'Restaurant Website', color: 'from-orange-500/20' },
    { title: 'Electronics Store', color: 'from-blue-500/20' },
    { title: 'Service Business', color: 'from-green-500/20' },
  ]

  const Projects = () => (
    <motion.section
      id='projects'
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-20 px-6 bg-black'
      viewport={{ once: true }}
    >
      <div className='max-w-6xl mx-auto'>
        <motion.h2
          variants={fadeInUp}
          className='text-4xl font-bold text-white mb-16 text-center'
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Featured Projects
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveProject(project)}
              className={`bg-gradient-to-br ${project.color} to-slate-900 p-12 rounded-xl border border-slate-700/50 cursor-pointer h-48 flex items-center justify-center hover:border-amber-500/30 transition`}
            >
              <h3 className='text-2xl font-semibold text-white text-center'>
                {project.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className='fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6'
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className='bg-slate-900 rounded-xl p-8 max-w-2xl w-full border border-slate-700'
            >
              <h3 className='text-3xl font-bold text-white mb-4'>
                {activeProject.title} Case Study
              </h3>
              <p className='text-slate-400 mb-6'>
                This is a detailed case study showcasing the results and process
                behind this project.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setActiveProject(null)}
                className='px-6 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition'
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )

  // Testimonials Section
  const Testimonials = () => (
    <motion.section
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-20 px-6 bg-slate-950'
      viewport={{ once: true }}
    >
      <div className='max-w-4xl mx-auto'>
        <motion.h2
          variants={fadeInUp}
          className='text-4xl font-bold text-white mb-16 text-center'
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          What Our Clients Say
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {[
            {
              name: 'Sarah Chen',
              title: 'Fashion Boutique Owner',
              quote:
                'Venvix transformed our online presence. Sales increased by 300% within 6 months.',
            },
            {
              name: 'Marcus Rodriguez',
              title: 'Restaurant Founder',
              quote:
                'Professional, responsive, and results-driven. They truly understand startup challenges.',
            },
            {
              name: 'Emma Thompson',
              title: 'SaaS Founder',
              quote:
                'Best decision we made. Their marketing strategy brought our CAC down significantly.',
            },
            {
              name: 'Raj Patel',
              title: 'E-commerce Entrepreneur',
              quote:
                'Premium service at honest prices. Venvix is the real deal.',
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className='bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-xl border border-slate-700/50'
            >
              <p className='text-slate-300 mb-6 italic'>
                "{testimonial.quote}"
              </p>
              <div>
                <p className='text-white font-semibold'>{testimonial.name}</p>
                <p className='text-amber-500 text-sm'>{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )

  // CTA Section
  const CTA = () => (
    <motion.section
      id='contact'
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-24 px-6 bg-black border-y border-slate-700/50'
      viewport={{ once: true }}
    >
      <div className='max-w-4xl mx-auto text-center'>
        <motion.h2
          variants={fadeInUp}
          className='text-5xl font-bold text-white mb-6'
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Ready To Grow Online?
        </motion.h2>
        <motion.p variants={fadeInUp} className='text-xl text-slate-300 mb-8'>
          Book your free strategy call below, or leave us your details and we'll
          reach out.
        </motion.p>

        {/* CALENDLY BUTTON */}
        <motion.button
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCalendlyOpen(true)}
          className='mb-12 px-10 py-4 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition text-lg'
        >
          Open Calendar to Book
        </motion.button>

        {/* HUBSPOT FORM */}
        <motion.div variants={fadeInUp} className='text-left max-w-2xl mx-auto'>
          <HubSpotForm
            region='na2'
            portalId='48806883'
            formId='124129e1-ec6a-4623-8d5f-a912277033f8'
          />
        </motion.div>
      </div>

      {/* THE CALENDLY MODAL (Hidden until triggered) */}
      <PopupModal
        url='https://calendly.com/venuja071/web-design-development' // <-- REPLACE WITH YOUR LINK
        pageSettings={{
          backgroundColor: '0f172a', // Dark slate background
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: 'f59e0b', // Amber theme color
          textColor: 'ffffff',
        }}
        onModalClose={() => setIsCalendlyOpen(false)}
        open={isCalendlyOpen}
        /* Uses document.body as a fallback in case you are using Next.js */
        rootElement={document.getElementById('root') || document.body}
      />
    </motion.section>
  )

  // Footer
  const Footer = () => (
    <footer className='bg-slate-950 border-t border-slate-700/50 py-12 px-6'>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
        <div>
          <h3 className='text-white font-semibold mb-4'>Venvix</h3>
          <p className='text-slate-400 text-sm'>
            Building The Future Of Small Business.
          </p>
        </div>
        <div>
          <p className='text-white font-semibold mb-4'>Services</p>
          <ul className='space-y-2 text-slate-400 text-sm'>
            <li>E-Commerce Development</li>
            <li>Digital Marketing</li>
            <li>SEO & Growth</li>
            <li>Website Maintenance</li>
          </ul>
        </div>
        <div>
          <p className='text-white font-semibold mb-4'>Company</p>
          <ul className='space-y-2 text-slate-400 text-sm'>
            <li>About</li>
            <li>Contact</li>
            <li>Blog</li>
            <li>Privacy</li>
          </ul>
        </div>
        <div>
          <p className='text-white font-semibold mb-4'>Connect</p>
          <ul className='space-y-2 text-slate-400 text-sm'>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
            <li>Email</li>
          </ul>
        </div>
      </div>
      <div className='border-t border-slate-700/50 pt-8 text-center text-slate-400 text-sm'>
        <p>
          © 2024 Venvix. All rights reserved. | Building The Future Of Business.
        </p>
      </div>
    </footer>
  )

  return (
    <div className='bg-black text-white overflow-x-hidden relative'>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Stats />
      <Process />
      <Projects />
      <Testimonials />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default VenvixWebsite
