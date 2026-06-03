import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const VenvixWebsite = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeProject, setActiveProject] = useState(null)
  const [visibleStats, setVisibleStats] = useState(false)

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
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-20 px-6 bg-black'
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
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-20 px-6 bg-slate-950'
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

  // Stats Section with counting animation
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
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-20 px-6 bg-slate-950'
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
              className='flex gap-8 items-start'
            >
              <div className='flex-shrink-0'>
                <div className='w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center'>
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
                <div className='absolute left-8 w-0.5 h-24 bg-gradient-to-b from-amber-500/30 to-transparent'></div>
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
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-20 px-6 bg-black'
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
      initial='hidden'
      whileInView='visible'
      variants={staggerContainer}
      className='py-24 px-6 bg-black border-y border-slate-700/50'
    >
      <div className='max-w-4xl mx-auto text-center'>
        <motion.h2
          variants={fadeInUp}
          className='text-5xl font-bold text-white mb-6'
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          Ready To Grow Online?
        </motion.h2>
        <motion.p variants={fadeInUp} className='text-xl text-slate-300 mb-12'>
          Let's build something exceptional together.
        </motion.p>
        <motion.button
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='px-10 py-4 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition text-lg'
        >
          Book A Free Strategy Call
        </motion.button>
      </div>
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
          © 2024 Venvix. All rights reserved. | Building The Future Of Small
          Business.
        </p>
      </div>
    </footer>
  )

  return (
    <div className='bg-black text-white overflow-x-hidden'>
      <Hero />
      <About />
      <Services />
      <Stats />
      <Process />
      <Projects />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}

export default VenvixWebsite
