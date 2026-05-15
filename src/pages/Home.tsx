import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Lock, ShieldCheck, MapPin, X, Shield, Users, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    id: 'payments',
    icon: <Lock size={24} className="sm:size-[40px]" strokeWidth={1.5} />,
    largeIcon: <CreditCard size={48} />,
    title: 'Secure Payments',
    shortDesc: 'Safe transactions between verified users.',
    longDesc: 'Experience peace of mind with our integrated student-to-student payment protection. We ensure that transactions are transparent and secure, holding funds with buyer protection until the item is successfully handed over on campus.',
    color: 'bg-green-50 text-brand-primary',
    hoverBorder: 'hover:border-brand-primary/30',
    hoverShadow: 'hover:shadow-[0_40px_80px_-15px_rgba(34,197,94,0.1)]',
    accent: 'bg-brand-primary',
    glow: 'bg-green-50/50',
    btnText: 'Learn about safety'
  },
  {
    id: 'vendors',
    icon: <ShieldCheck size={24} className="sm:size-[40px]" strokeWidth={1.5} />,
    largeIcon: <Users size={48} />,
    title: 'Verified Vendors',
    shortDesc: 'Confirmed Student IDs only.',
    longDesc: 'Trust is our foundation. Every vendor on CampusConnect is a verified student from Roma or Maseru campuses. We verify Student IDs to ensure a closed, safe community where students can trade with confidence.',
    color: 'bg-emerald-50 text-emerald-600',
    hoverBorder: 'hover:border-emerald-400/30',
    hoverShadow: 'hover:shadow-[0_40px_80px_-15px_rgba(16,185,129,0.1)]',
    accent: 'bg-emerald-500',
    glow: 'bg-emerald-100/30',
    btnText: 'Vendor Guidelines'
  },
  {
    id: 'location',
    icon: <MapPin size={24} className="sm:size-[40px]" strokeWidth={1.5} />,
    largeIcon: <MapPin size={48} />,
    title: 'Roma & Maseru',
    shortDesc: 'Localized browsing for campus communities.',
    longDesc: 'Built specifically for the Lesotho student ecosystem. Whether you are at NUL Roma or studying in Maseru, find what you need within walking distance. Save on transport and meet safely at recognized campus landmarks.',
    color: 'bg-teal-50 text-teal-600',
    hoverBorder: 'hover:border-teal-400/30',
    hoverShadow: 'hover:shadow-[0_40px_80px_-15px_rgba(20,184,166,0.1)]',
    accent: 'bg-teal-600',
    glow: 'bg-teal-100/30',
    btnText: 'Explore Local Hubs'
  }
];

const Home: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<typeof FEATURES[0] | null>(null);

  return (
    <div className="py-8 sm:py-12 selection:bg-brand-primary/10 selection:text-brand-primary">
      {/* Feature Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                layoutId={`feature-${selectedFeature.id}`}
                initial={{ scale: 0.9, opacity: 0, rotateX: -15, y: 30 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, rotateX: 10, y: 20 }}
                className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl sm:p-12"
                style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
              >
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFeature(null);
                  }}
                  className="absolute right-6 top-6 z-50 rounded-full bg-slate-100 p-2.5 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-900 active:scale-90"
                >
                  <X size={20} />
                </button>

                <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
                  <motion.div 
                    initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`mb-8 flex h-20 w-20 items-center justify-center rounded-3xl ${selectedFeature.color} shadow-lg`}
                  >
                    {selectedFeature.largeIcon}
                  </motion.div>

                  <h3 className="mb-4 text-3xl font-[900] tracking-tight text-slate-950 sm:text-4xl">
                    {selectedFeature.title}
                  </h3>
                  
                  <p className="mb-10 text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                    {selectedFeature.longDesc}
                  </p>

                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => setSelectedFeature(null)}
                      className="flex items-center justify-center gap-2 rounded-full bg-slate-900 py-4 text-sm font-black text-white transition-all hover:bg-slate-800 active:scale-95"
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </div>

                {/* Background Glow */}
                <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl ${selectedFeature.accent}`} />
                <div className={`absolute -left-20 -bottom-20 h-64 w-64 rounded-full opacity-10 blur-3xl ${selectedFeature.accent}`} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-primary to-brand-secondary p-8 text-white shadow-2xl sm:p-16">
        <div className="relative z-10 max-w-2xl" style={{ perspective: 1200 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ 
              rotateX: 4, 
              rotateY: -4, 
              scale: 1.01,
              transition: { duration: 0.3 } 
            }}
            transition={{ duration: 0.6 }}
            className="transform-gpu transition-shadow duration-500 hover:drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
          >
            <div className="mb-6 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-green-100 backdrop-blur-md">
              <Sparkles size={14} className="text-green-300" />
              <span>THE BIG STUDENT SWAP • 100+ NEW LISTINGS</span>
            </div>
            <h1 className="mb-6 text-4xl font-black tracking-tight sm:text-7xl">
              Buy, Sell, <br /> & Connect.
            </h1>
            <p className="mb-10 text-base font-medium text-green-50/90 leading-relaxed max-w-lg sm:text-lg">
              Get ready for the new semester. The premier marketplace for Roma & Maseru students with instant search and secure transactions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/register" 
                className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-black text-brand-secondary shadow-xl shadow-green-900/20 transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create Account <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 z-0 bg-linear-to-r from-green-50 to-white opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              
              <Link 
                to="/login" 
                className="flex items-center justify-center rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md px-8 py-4 text-sm font-black text-white transition-all hover:bg-white/20 hover:border-white/50 active:scale-95"
              >
                Login to Profile
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-[100px]"></div>
        <div className="absolute right-12 bottom-12 text-[180px] opacity-20 transform rotate-12 select-none">
          🎓
        </div>
      </section>

      {/* Trust Signals / Features */}
      <section className="py-24 lg:py-32">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10"
        >
          {FEATURES.map((feature) => (
            <motion.button
              key={feature.id}
              layoutId={`feature-${feature.id}`}
              onClick={() => setSelectedFeature(feature)}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ 
                rotateX: 10, 
                rotateY: -10, 
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
              className={`group relative flex flex-col justify-between overflow-hidden text-left rounded-[1.5rem] sm:rounded-[3rem] border border-slate-200/60 bg-white p-4 sm:p-12 shadow-sm transition-all duration-500 ${feature.hoverBorder} ${feature.hoverShadow} ${feature.id === 'location' ? 'col-span-2 lg:col-span-1' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                <div className={`mb-4 sm:mb-10 flex h-12 w-12 sm:h-20 sm:w-20 items-center justify-center rounded-xl sm:rounded-3xl ${feature.color} transition-all duration-500 group-hover:scale-110 group-hover:bg-opacity-100 group-hover:bg-slate-900 group-hover:text-white group-hover:rotate-6 shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="mb-1 sm:mb-4 text-sm sm:text-3xl font-[900] tracking-tighter text-slate-950">{feature.title}</h3>
                <p className="text-[10px] sm:text-base font-bold leading-relaxed text-slate-600 antialiased">
                  {feature.shortDesc}
                </p>
              </div>
              
              <div className="mt-4 sm:mt-10 flex items-center gap-1 sm:gap-2 text-[8px] sm:text-[11px] font-black uppercase tracking-wider sm:tracking-[0.2em] transition-all duration-300 group-hover:translate-x-2" style={{ color: 'inherit' }}>
                <span className="hidden sm:inline">{feature.btnText}</span><span className="sm:hidden">{feature.id === 'payments' ? 'Safety' : feature.id === 'vendors' ? 'Vendors' : 'Hubs'}</span> <ArrowRight size={12} className="sm:size-[16px]" />
              </div>

              <div className={`absolute -right-12 -bottom-12 h-48 w-48 rounded-full ${feature.glow} blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:opacity-40`}></div>
              
              {feature.id === 'location' && (
                <div className="absolute inset-0 z-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.07]" 
                     style={{ backgroundImage: 'radial-gradient(#14b8a6 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }} />
              )}
            </motion.button>
          ))}
        </motion.div>
      </section>


      {/* Categories Grid */}
      <section className="py-24 lg:py-32">
        <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-primary">
              <span className="h-1 w-8 bg-brand-primary rounded-full" /> Popular Now
            </div>
            <h2 className="text-4xl font-[900] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Browse <span className="text-brand-primary underline decoration-brand-primary/20 decoration-8 underline-offset-8">Categories</span>
            </h2>
            <p className="mt-4 text-slate-500 font-medium text-lg max-w-md">
              Discover everything from textbooks to tech, curated for the campus lifestyle.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/create-request" className="group flex items-center gap-3 rounded-2xl bg-emerald-50 px-8 py-4 text-sm font-black text-brand-primary transition-all hover:bg-white hover:shadow-2xl hover:shadow-emerald-100 active:scale-95">
              Can't find it? Post Request <Sparkles size={18} className="text-emerald-400 group-hover:rotate-12 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4"
        >
          {[
            { name: 'Textbooks', emoji: '📚', count: '150+', color: 'bg-emerald-50 text-brand-primary', border: 'border-emerald-100', accent: 'bg-emerald-500' },
            { name: 'Tech & Gear', emoji: '💻', count: '85+', color: 'bg-blue-50 text-blue-700', border: 'border-blue-100', accent: 'bg-blue-500' },
            { name: 'Fashion', emoji: '👕', count: '210+', color: 'bg-rose-50 text-rose-700', border: 'border-rose-100', accent: 'bg-rose-500' },
            { name: 'Handmade', emoji: '🎨', count: '45+', color: 'bg-amber-50 text-amber-700', border: 'border-amber-100', accent: 'bg-amber-500' },
            { name: 'Services', emoji: '🛠️', count: '32+', color: 'bg-teal-50 text-teal-700', border: 'border-teal-100', accent: 'bg-teal-500' },
            { name: 'Living', emoji: '🏠', count: '64+', color: 'bg-indigo-50 text-indigo-700', border: 'border-indigo-100', accent: 'bg-indigo-500' },
            { name: 'Stationery', emoji: '✏️', count: '120+', color: 'bg-orange-50 text-orange-700', border: 'border-orange-100', accent: 'bg-orange-500' },
            { name: 'Explore All', emoji: '🗺️', count: '500+', color: 'bg-slate-50 text-slate-700', border: 'border-slate-100', accent: 'bg-slate-900' },
          ].map((cat) => (
            <motion.div
              key={cat.name}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <Link 
                to={cat.name === 'Explore All' ? '/categories' : `/search?category=${cat.name.toLowerCase()}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] border-2 ${cat.border} ${cat.color} aspect-square p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200`}
              >
                <div className="relative z-10">
                  <div className="mb-4 flex text-5xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6">
                    {cat.emoji}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight leading-none mb-1">{cat.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{cat.count} listings</p>
                </div>

                <div className="relative z-10 flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                  {cat.name === 'Explore All' ? 'View All' : 'Browse Now'} <ArrowRight size={14} />
                </div>

                {/* Abstract decorative circles */}
                <div className={`absolute -right-10 -bottom-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-20 ${cat.accent}`}></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
