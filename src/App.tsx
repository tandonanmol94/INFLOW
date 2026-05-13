import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BrandForm } from './components/BrandForm';
import { CreatorForm } from './components/CreatorForm';
import { cn } from './lib/utils';

import { Logo } from './components/Logo';

export default function App() {
  const [loginTab, setLoginTab] = useState<'brand' | 'creator'>('brand');

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-white selection:text-black">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-[8vw] py-8 bg-[#050505]/70 backdrop-blur-md">
        <a href="#" className="flex items-center gap-4 no-underline group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center"
          >
            <Logo size={48} />
          </motion.div>
          <span className="font-display font-medium text-2xl text-white tracking-tight">Inflow</span>
        </a>
        <ul className="hidden md:flex items-center gap-10 list-none">
          <li><a href="#about" className="text-gray-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">Vision</a></li>
          <li><a href="#how" className="text-gray-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">Protocol</a></li>
          <li><a href="#apply" className="text-gray-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">Apply</a></li>
          <li><a href="#contact" className="text-gray-500 text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-white transition-colors duration-300">Contact</a></li>
          <li>
            <a href="#login" className="px-6 py-3 border border-white/10 rounded-lg text-[10px] font-mono font-bold text-gray-500 uppercase tracking-[0.2em] hover:text-white hover:border-white transition-all">
              Portal
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-[5vw] pt-40 pb-20 overflow-hidden">
        <div className="glow-mesh" />
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-white/5 rounded-full px-5 py-2 text-[10px] font-mono font-bold text-gray-500 tracking-[0.3em] uppercase mb-12 shadow-sm flex items-center"
        >
          Matched
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1 bg-green-500 rounded-full mx-3"
          />
          Managed
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-1 h-1 bg-green-500 rounded-full mx-3"
          />
          Measured
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-[clamp(3rem,10vw,7rem)] text-white leading-[0.95] mb-10 max-w-[1200px] font-medium tracking-tight"
        >
          Where brands <span className="text-zinc-600 italic font-light">flow</span><br/>
          and creators <span className="text-zinc-600 italic font-light">glow</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-500 max-w-[700px] mx-auto mb-16 font-display font-medium leading-relaxed tracking-tight"
        >
          Institutional-grade protocols for high-fidelity influencer engagement. Precision at every partnership, growth at every turn.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <a href="#apply" className="bg-white text-black px-12 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-gray-200 transition-all shadow-2xl hover:-translate-y-1">Initialize Campaign</a>
          <a href="#apply" className="bg-transparent text-gray-500 border border-white/10 px-12 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:text-white hover:border-white transition-all">Join Network</a>
        </motion.div>
      </section>

      {/* STATS - Bento Style */}
      <section className="px-[5vw] max-w-[1400px] mx-auto mb-32">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-[#111] border border-white/5 p-12 rounded-[2rem] shadow-sm flex flex-col justify-between min-h-[300px] hover:bg-[#151515] transition-all duration-500 group"
          >
            <div className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest group-hover:text-white transition-colors">Efficiency</div>
            <div className="space-y-2">
              <div className="text-6xl font-display font-medium text-white">100%</div>
              <p className="text-sm text-gray-500 leading-relaxed font-light italic">Fully managed execution from brief to payout.</p>
            </div>
          </motion.div>
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white p-12 rounded-[2rem] shadow-2xl flex flex-col justify-between min-h-[300px] text-black transition-all duration-500 group"
          >
            <div className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest group-hover:text-black transition-colors">Integrity</div>
            <div className="space-y-2">
              <div className="text-6xl font-display font-medium">Zero</div>
              <p className="text-sm text-gray-700 leading-relaxed font-light italic">Direct bypass leakage. We protect the ecosystem.</p>
            </div>
          </motion.div>
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-[#111] border border-white/5 p-12 rounded-[2rem] shadow-sm flex flex-col justify-between min-h-[300px] md:col-span-2 lg:col-span-1 hover:bg-[#151515] transition-all duration-500 group"
          >
            <div className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest group-hover:text-white transition-colors">Scalability</div>
            <div className="space-y-2">
              <div className="text-6xl font-display font-medium text-white">∞</div>
              <p className="text-sm text-gray-500 leading-relaxed font-light italic">Unlimited potential for cross-niche collaboration.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-40 px-[8vw] max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-20 items-start">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-12"
        >
          <header className="space-y-6">
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-gray-500">01 / Our Vision</p>
            <h2 className="text-[clamp(3rem,6vw,4.5rem)] text-white leading-none font-display font-medium tracking-tighter">Refining the Bridge.</h2>
            <p className="text-gray-500 text-lg md:text-xl font-light max-w-lg">We've eliminated the friction of modern influence. Professionalism is our baseline.</p>
          </header>
          <div className="grid md:grid-cols-2 gap-12 text-sm text-gray-600 leading-relaxed font-light">
            <p>Inflow was established to solve the "managed middle" problem. Brands deserve predictable high-quality execution. Creators deserve secure, timely, and respectful compensation.</p>
            <p>By centralizing communication and standardizing protocols, we ensure that every partnership is a value-add for both parties. No noise, just flow.</p>
          </div>
        </motion.div>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="lg:col-span-5 grid gap-4"
        >
          {[
            { icon: '🎯', title: 'Curated Intelligence', text: "Deep niche analysis for perfect brand alignment.", id: 'about-1', color: 'shadow-red-500/10' },
            { icon: '🔐', title: 'Encrypted Workflow', text: "Proprietary channels for all negotiations.", id: 'about-2', color: 'shadow-blue-500/10' },
            { icon: '💸', title: 'Secure Settlement', text: "Automated, transparent financial clearing.", id: 'about-3', color: 'shadow-green-500/10' }
          ].map((card) => (
            <motion.div 
              key={card.id}
              variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}
              whileHover={{ scale: 1.02, x: 10 }}
              className={cn(
                "bg-zinc-900 border border-white/5 rounded-2xl p-8 shadow-sm flex items-center gap-6 transition-all duration-500 hover:border-white/20 group cursor-default",
                card.color
              )}
            >
              <div className="text-4xl transition-all group-hover:scale-110 duration-300 pointer-events-none drop-shadow-lg">{card.icon}</div>
              <div className="space-y-1">
                <h4 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">{card.title}</h4>
                <p className="text-xs text-gray-500 font-light">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-[#090909] border-y border-white/5 py-40 px-[8vw]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <div className="space-y-4">
              <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-gray-600">02 / Protocol</p>
              <h2 className="text-[clamp(2.5rem,5vw,4rem)] text-white font-display font-medium leading-[0.9] tracking-tighter">Autonomous Success.</h2>
            </div>
            <p className="text-sm text-gray-500 max-w-xs italic font-light">A streamlined operational framework designed for speed and reliability.</p>
          </div>
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid lg:grid-cols-3 gap-[1px] bg-white/5 rounded-[3rem] overflow-hidden"
          >
            {[
              { num: 'I', tag: 'Discovery', title: 'Requirement Architecture', text: 'Define your parameters. Budget, niche, and timeline data mapped.', id: 'step-1' },
              { num: 'II', tag: 'Curation', title: 'Target Alignment', text: 'Optimal creators identified and briefed within the Inflow framework.', id: 'step-2' },
              { num: 'III', tag: 'Settlement', title: 'Live Execution', text: 'Deployment monitored and payments settled via automated escrow.', id: 'step-3' }
            ].map((step) => (
              <motion.div 
                key={step.id} 
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                className="bg-[#050505] p-16 space-y-10 group hover:bg-[#090909] transition-colors duration-500 cursor-default"
              >
                <div className="text-8xl font-display font-light text-gray-900 group-hover:text-white transition-colors duration-500 group-hover:scale-105 origin-left duration-700">{step.num}</div>
                <div className="space-y-6">
                  <span className="inline-block border border-white/10 rounded-full px-4 py-1.5 text-[9px] text-gray-500 uppercase font-bold tracking-widest">{step.tag}</span>
                  <div className="space-y-3">
                    <h3 className="text-xl font-medium text-white leading-tight tracking-tight">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-light italic">{step.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* APPLICATION FORMS */}
      <section id="apply" className="py-40 px-[8vw] max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-8">
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-gray-600">03 / Integration</p>
            <h2 className="text-6xl text-white font-display font-medium leading-[0.9] tracking-tighter">Enter the<br/><span className="text-zinc-600">Network</span>.</h2>
            <p className="text-base text-gray-500 font-light max-w-xs">Select your profile to begin the onboarding sequence. We review all applications within 48 hours for quality assurance.</p>
            
            <div className="flex flex-col gap-4 pt-10">
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-gray-600 tracking-widest uppercase">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Network status: Open
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-gray-600 tracking-widest uppercase">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                Auth: Verified
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-8 space-y-20">
            <div className="bg-[#090909] border border-white/5 rounded-[3rem] p-10 md:p-20 shadow-sm space-y-12">
              <div className="space-y-2">
                <p className="text-[10px] text-gray-600 uppercase font-bold tracking-[0.3em] font-mono">Profile Alpha</p>
                <h3 className="text-3xl font-medium text-white tracking-tight">Organization Onboarding</h3>
              </div>
              <BrandForm />
            </div>

            <div className="bg-[#090909] border border-white/5 rounded-[3rem] p-10 md:p-20 shadow-sm space-y-12">
              <div className="space-y-2">
                <p className="text-[10px] text-gray-600 uppercase font-bold tracking-[0.3em] font-mono">Profile Beta</p>
                <h3 className="text-3xl font-medium text-white tracking-tight">Creator Registration</h3>
              </div>
              <CreatorForm />
            </div>
          </div>
        </div>
      </section>

      {/* LOGIN */}
      <section id="login" className="bg-black py-40 px-[8vw] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[480px] mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-4">
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-white/30">04 / Terminal</p>
            <h2 className="text-6xl font-display font-medium leading-none tracking-tighter text-white">Member Portal</h2>
          </div>

          <div className="bg-white/5 p-1.5 border border-white/10 rounded-2xl flex gap-1.5">
            <button 
              onClick={() => setLoginTab('brand')}
              className={cn(
                "flex-1 py-4 rounded-xl text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all",
                loginTab === 'brand' ? "bg-white text-black shadow-2xl" : "text-white/30 hover:text-white"
              )}
            >
              Organization
            </button>
            <button 
              onClick={() => setLoginTab('creator')}
              className={cn(
                "flex-1 py-4 rounded-xl text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all",
                loginTab === 'creator' ? "bg-white text-black shadow-2xl" : "text-white/30 hover:text-white"
              )}
            >
              Creator
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[3rem] p-12 text-left space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-white/20">Identity Reference</label>
                <input 
                  type="email" 
                  placeholder={loginTab === 'brand' ? 'org@system.inflow' : 'handle@network.inflow'}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-5 text-sm text-white outline-none focus:border-white/30 transition-all placeholder:text-white/10" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-white/20">Access Key</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-5 text-sm text-white outline-none focus:border-white/30 transition-all placeholder:text-white/10" 
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <a href="#" className="text-[10px] text-white/20 hover:text-white transition-colors font-mono">Reset Sequence</a>
            </div>
            <button className="w-full bg-white text-black font-bold py-5 rounded-xl text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-[0.98]">
              Authorize Access
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-40 px-[8vw] border-t border-white/5 bg-[#030303]">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20">
          <div className="space-y-8">
            <p className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-gray-600">05 / Contact</p>
            <h2 className="text-6xl text-white font-display font-medium leading-[0.9] tracking-tighter">Direct Inquiry.</h2>
            <p className="text-gray-500 text-lg font-light max-w-sm leading-relaxed">Connecting the ecosystem with human precision. Our response protocol is active 24/7 for all network inquiries.</p>
          </div>

          <div className="grid gap-6">
            <a 
              href="mailto:inflow.collabs@gmail.com" 
              className="group p-10 bg-zinc-900/40 border border-white/5 rounded-[2rem] hover:bg-white hover:border-white transition-all duration-700 flex flex-col justify-between min-h-[240px]"
            >
              <div className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-400">Electronic Mail</div>
              <div className="space-y-2">
                <div className="text-3xl font-display font-medium text-white group-hover:text-black transition-colors">inflow.collabs@gmail.com</div>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Average response time: &lt; 4 hours</p>
              </div>
            </a>

            <a 
              href="https://www.instagram.com/inflow.collabs/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-10 bg-zinc-900/40 border border-white/5 rounded-[2rem] hover:bg-white hover:border-white transition-all duration-700 flex flex-col justify-between min-h-[240px]"
            >
              <div className="text-[10px] font-mono font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-400">Social Network</div>
              <div className="space-y-2">
                <div className="text-3xl font-display font-medium text-white group-hover:text-black transition-colors">@inflow.collabs</div>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors italic">Follow for network updates.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-32 px-[8vw] text-center space-y-12 bg-[#050505] border-t border-white/5">
        <div className="flex flex-col items-center gap-6">
          <Logo size={64} />
          <div className="font-display font-medium text-4xl text-white tracking-tight">Inflow</div>
          <p className="text-sm text-gray-500 max-w-sm mx-auto italic font-light">The definitive protocol for institutional influencer engagement.</p>
        </div>
        <div className="h-[1px] w-full bg-white/5" />
        <div className="flex flex-wrap justify-center gap-16 text-[10px] font-mono uppercase tracking-[0.3em] font-bold text-gray-600">
          <a href="#about" className="hover:text-white transition-colors">Vision</a>
          <a href="#how" className="hover:text-white transition-colors">Protocol</a>
          <a href="#apply" className="hover:text-white transition-colors">Integration</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-[10px] text-zinc-500 font-mono font-bold tracking-[0.2em] max-w-sm mx-auto leading-relaxed uppercase">Direct Inquiries<br/><a href="mailto:inflow.collabs@gmail.com" className="text-white hover:underline lowercase tracking-normal font-sans">inflow.collabs@gmail.com</a></p>
        <p className="text-[9px] text-gray-800 font-mono font-bold tracking-[0.5em] mt-20 uppercase">© MMXXV Inflow Collective / All Indices Reserved.</p>
      </footer>
    </div>
  );
}
