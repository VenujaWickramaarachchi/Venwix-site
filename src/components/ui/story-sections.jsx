'use client'

import React from 'react'
import FlowArt, { FlowSection } from './flow-art'

export default function StorySections() {
  const processSteps = [
    { step: 'Discover', desc: 'Understanding your business mechanics.' },
    { step: 'Design', desc: 'Crafting a high-end digital experience.' },
    { step: 'Build', desc: 'Developing robust, scalable solutions.' },
    { step: 'Grow', desc: 'Data-driven marketing and optimization.' },
  ]

  const projects = [
    {
      title: 'ZIE Fashion',
      type: "Digital storefront for ZIE: A Sri Lankan fashion brand merging seamless e-commerce with a powerful women's empowerment movement.",
      status: 'Completed',
      mediaUrl: '/Projects/zie.png',
      isVideo: false,
      url: 'https://zie.lk/',
    },
    {
      title: 'Lactoboost',
      type: "A custom e-commerce platform developed for Lactoboost, Sri Lanka's first and leading lactation food brand dedicated to maternal well-being.",
      status: 'Completed',
      mediaUrl: '/Projects/lactoboost.png',
      isVideo: false,
      url: 'https://lactoboost.lk/',
    },
    {
      title: 'Zie Travel',
      type: 'A custom travel booking platform developed for ZIE Travel, designed to inspire wanderlust and effortlessly guide users through planning bespoke trips to Vietnam.',
      status: 'In Development',
      mediaUrl: '/Projects/zie_travel.png',
      isVideo: false,
      url: 'https://www.zietravel.com/',
    },
  ]

  return (
    <div className='bg-black'>
      <FlowArt>
        {/* CARD 1: ABOUT - ID moved to FlowSection */}
        <FlowSection
          id='about'
          className='bg-slate-950 border-t border-slate-800'
        >
          <div className='max-w-5xl mx-auto w-full text-center'>
            <span className='text-red-500 font-bold tracking-widest text-sm uppercase mb-4 block'>
              01 / The Agency
            </span>
            <h2
              className='text-5xl md:text-7xl font-bold text-white mb-8 leading-tight'
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Built By Entrepreneurs,
              <br />
              For Entrepreneurs.
            </h2>
            <p className='text-xl md:text-2xl text-slate-300 leading-relaxed mb-6 max-w-3xl mx-auto'>
              Venvix was founded by digital natives passionate about building
              digital infrastructure that actually scales.
            </p>
            <p className='text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto'>
              We combine world-class design, modern engineering, and aggressive
              marketing to create assets that generate real revenue.
            </p>
          </div>
        </FlowSection>

        {/* CARD 2: PROCESS - ID moved to FlowSection */}
        <FlowSection
          id='process'
          className='bg-black border-t border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]'
        >
          <div className='max-w-6xl mx-auto w-full'>
            <span className='text-red-500 font-bold tracking-widest text-sm uppercase mb-4 block text-center'>
              02 / The Methodology
            </span>
            <h2
              className='text-5xl md:text-6xl font-bold text-white mb-16 text-center'
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              How We Build Systems
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {processSteps.map((item, i) => (
                <div
                  key={i}
                  className='process-card-premium bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-red-600/30 transition-colors'
                >
                  <div className='w-16 h-16 rounded-2xl bg-red-600/10 border border-red-600/30 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(220,38,38,0.15)]'>
                    <span className='text-red-500 font-bold text-2xl'>
                      {i + 1}
                    </span>
                  </div>
                  <h3 className='text-2xl font-semibold text-white mb-3'>
                    {item.step}
                  </h3>
                  <p className='text-slate-400 leading-relaxed'>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FlowSection>

        {/* CARD 3: PROJECTS - ID moved to FlowSection */}
        <FlowSection
          id='projects'
          className='bg-slate-950 border-t border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]'
        >
          <div className='max-w-6xl mx-auto w-full'>
            <span className='text-red-500 font-bold tracking-widest text-sm uppercase mb-4 block text-center'>
              03 / Our Past Projects
            </span>
            <h2
              className='text-5xl md:text-6xl font-bold text-white mb-12 text-center'
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Selected Work
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {projects.map((project, i) => (
                <a
                  key={i}
                  href={project.url}
                  target={project.url !== '#' ? '_blank' : '_self'}
                  rel='noopener noreferrer'
                  className='project-card-premium relative group block h-80 rounded-3xl overflow-hidden border border-slate-700/50 hover:border-red-600/50 transition-all duration-500 shadow-lg'
                >
                  {project.isVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    >
                      <source src={project.mediaUrl} type='video/mp4' />
                    </video>
                  ) : (
                    <img
                      src={project.mediaUrl}
                      alt={project.title}
                      className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300'></div>
                  <div className='absolute inset-0 p-8 flex flex-col justify-end z-10'>
                    <div className='mb-3'>
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          project.status === 'Completed'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <h3 className='text-3xl font-semibold text-white mb-1 drop-shadow-md group-hover:text-red-400 transition-colors duration-300'>
                      {project.title}
                    </h3>
                    <p className='text-slate-300 text-sm'>{project.type}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FlowSection>
      </FlowArt>
    </div>
  )
}
