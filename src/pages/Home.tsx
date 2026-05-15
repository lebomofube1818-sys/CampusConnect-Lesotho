import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Lock, ShieldCheck, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="py-8 sm:py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-brand-primary to-brand-secondary p-8 text-white shadow-2xl sm:p-16">
        <div className="relative z-10 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
              <button className="flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-black text-brand-secondary shadow-xl shadow-green-900/10 transition-transform hover:scale-[1.05] active:scale-95">
                Browse Deals <ArrowRight size={18} />
              </button>
              <Link to="/register" className="rounded-full border-2 border-white/40 bg-transparent px-8 py-3.5 text-sm font-black text-white transition-colors hover:bg-white/10">
                Sell Items
              </Link>
              <Link to="/create-request" className="rounded-full bg-white/20 backdrop-blur-md px-8 py-3.5 text-sm font-black text-white transition-all hover:bg-white/30 border border-white/10">
                Request Item
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
          className="grid grid-cols-1 gap-10 lg:grid-cols-3"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[3rem] border border-slate-200/60 bg-white p-12 shadow-sm transition-all duration-500 hover:border-brand-primary/30 hover:shadow-[0_40px_80px_-15px_rgba(34,197,94,0.1)]"
          >
            <div className="relative z-10">
              <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-brand-primary transition-all duration-500 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white group-hover:rotate-6 shadow-sm">
                <Lock size={40} strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 text-3xl font-[900] tracking-tighter text-slate-950">Secure Payments</h3>
              <p className="text-base font-bold leading-relaxed text-slate-600 antialiased">
                Safe and protected transactions between <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-[11px] font-black text-green-800 ring-1 ring-inset ring-green-600/20 shadow-sm">Verified Users</span> across the Lesotho student network.
              </p>
            </div>
            
            <div className="mt-10 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-brand-primary transition-all duration-300 group-hover:translate-x-2">
              Learn about safety <ArrowRight size={16} />
            </div>

            <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-green-50/50 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-brand-primary/10"></div>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[3rem] border border-slate-200/60 bg-white p-12 shadow-sm transition-all duration-500 hover:border-emerald-400/30 hover:shadow-[0_40px_80px_-15px_rgba(16,185,129,0.1)]"
          >
            <div className="relative z-10">
              <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white group-hover:-rotate-6 shadow-sm">
                <ShieldCheck size={40} strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 text-3xl font-[900] tracking-tighter text-slate-950">Verified Vendors</h3>
              <p className="text-base font-bold leading-relaxed text-slate-600 antialiased">
                We confirm the <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-black text-emerald-800 ring-1 ring-inset ring-emerald-600/20 shadow-sm">Student ID</span> of every vendor to ensure community trust.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-emerald-600 transition-all duration-300 group-hover:translate-x-2">
              Vendor Guidelines <ArrowRight size={16} />
            </div>

            <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-emerald-100/30 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-emerald-500/10"></div>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[3rem] border border-slate-200/60 bg-white p-12 shadow-sm transition-all duration-500 hover:border-teal-400/30 hover:shadow-[0_40px_80px_-15px_rgba(20,184,166,0.1)]"
          >
            <div className="relative z-10">
              <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-teal-600 transition-all duration-500 group-hover:scale-110 group-hover:bg-teal-600 group-hover:text-white group-hover:rotate-6 shadow-sm">
                <MapPin size={40} strokeWidth={1.5} />
              </div>
              <h3 className="mb-4 text-3xl font-[900] tracking-tighter text-slate-950">Roma & Maseru</h3>
              <p className="text-base font-bold leading-relaxed text-slate-600 antialiased">
                Precision localized browsing for <span className="inline-flex items-center rounded-full bg-teal-100 px-3 py-1 text-[11px] font-black text-teal-800 ring-1 ring-inset ring-teal-600/20 shadow-sm">University Communities</span> across major Lesotho hubs.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-teal-600 transition-all duration-300 group-hover:translate-x-2">
              Explore Local Hubs <ArrowRight size={16} />
            </div>

            <div className="absolute inset-0 z-0 opacity-[0.03] transition-opacity group-hover:opacity-[0.07]" 
                 style={{ backgroundImage: 'radial-gradient(#14b8a6 0.5px, transparent 0.5px)', backgroundSize: '12px 12px' }} />

            <div className="absolute -right-12 -bottom-12 h-48 w-48 rounded-full bg-teal-100/30 blur-3xl transition-all duration-700 group-hover:scale-125 group-hover:bg-teal-400/10"></div>
          </motion.div>
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
