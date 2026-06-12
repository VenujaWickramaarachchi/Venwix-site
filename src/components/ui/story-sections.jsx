'use client'

import React, { useState } from 'react'
import FlowArt, { FlowSection } from './flow-art'

// Extracted from your main file for consistency
const btnClassesPrimary =
  'px-8 py-3.5 bg-red-600 text-white font-semibold rounded-full hover:bg-red-500 transition-all duration-300 shadow-[0_4px_20px_-5px_rgba(220,38,38,0.4)] hover:-translate-y-0.5'

export default function StorySections({ setIsCalendlyOpen }) {
  const [activeProject, setActiveProject] = useState(null)

  const processSteps = [
    { step: 'Discover', desc: 'Understanding your business mechanics.' },
    { step: 'Design', desc: 'Crafting a high-end digital experience.' },
    { step: 'Build', desc: 'Developing robust, scalable solutions.' },
    { step: 'Grow', desc: 'Data-driven marketing and optimization.' },
  ]

  const projects = [
    { title: 'Fashion Store', color: 'from-purple-500/10' },
    { title: 'Restaurant Website', color: 'from-orange-500/10' },
    { title: 'Electronics Store', color: 'from-blue-500/10' },
    { title: 'Service Business', color: 'from-green-500/10' },
  ]

  return (
    <div className='bg-black'>
      <FlowArt>
        {/* CARD 1: ABOUT */}
        <FlowSection className='bg-slate-950 border-t border-slate-800'>
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

        {/* CARD 2: PROCESS */}
        <FlowSection className='bg-black border-t border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]'>
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
                  className='bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-red-600/30 transition-colors'
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

        {/* CARD 3: PROJECTS */}
        <FlowSection className='bg-slate-950 border-t border-slate-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]'>
          <div className='max-w-6xl mx-auto w-full'>
            <span className='text-red-500 font-bold tracking-widest text-sm uppercase mb-4 block text-center'>
              03 / The Proof
            </span>
            <h2
              className='text-5xl md:text-6xl font-bold text-white mb-12 text-center'
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Selected Work
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {projects.map((project, i) => (
                <div
                  key={i}
                  onClick={() => setActiveProject(project)}
                  className={`bg-gradient-to-br ${project.color} to-slate-900 p-12 rounded-3xl border border-slate-700/50 cursor-pointer h-56 flex items-center justify-center hover:border-red-600/40 transition-all duration-300 group`}
                >
                  <h3 className='text-3xl font-semibold text-white text-center drop-shadow-md group-hover:scale-105 transition-transform duration-300'>
                    {project.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </FlowSection>
      </FlowArt>

      {/* Project Modal Overlay */}
      {activeProject && (
        <div
          className='fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-6'
          onClick={() => setActiveProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='bg-slate-900 rounded-3xl p-10 max-w-2xl w-full border border-slate-700 shadow-2xl relative overflow-hidden'
          >
            {/* Modal Glow */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] rounded-full pointer-events-none'></div>

            <h3 className='text-4xl font-bold text-white mb-4 relative z-10'>
              {activeProject.title} Case Study
            </h3>
            <p className='text-slate-400 mb-10 leading-relaxed text-lg relative z-10'>
              This is a detailed case study showcasing the digital architecture,
              UI/UX gallery layout, and conversion metrics behind this project.
            </p>
            <button
              type='button'
              onClick={() => setActiveProject(null)}
              className={`${btnClassesPrimary} relative z-10`}
            >
              Close Case Study
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
