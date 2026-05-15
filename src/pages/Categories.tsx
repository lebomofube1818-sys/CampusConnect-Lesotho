import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Search, ShoppingBag, X, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { name: 'Textbooks', emoji: '📚', count: '150+', color: 'bg-emerald-50 text-brand-primary', border: 'border-emerald-100', accent: 'bg-emerald-500', description: 'Find course materials and used books from fellow students.' },
  { name: 'Tech & Gear', emoji: '💻', count: '85+', color: 'bg-blue-50 text-blue-700', border: 'border-blue-100', accent: 'bg-blue-500', description: 'Calculators, laptops, chargers, and other essential campus tech.' },
  { name: 'Fashion', emoji: '👕', count: '210+', color: 'bg-rose-50 text-rose-700', border: 'border-rose-100', accent: 'bg-rose-500', description: 'Campus wear, traditional attire, and stylish student-made pieces.' },
  { name: 'Handmade', emoji: '🎨', count: '45+', color: 'bg-amber-50 text-amber-700', border: 'border-amber-100', accent: 'bg-amber-500', description: 'Beaded jewelry, art, and custom crafts from Roma artisans.' },
  { name: 'Services', emoji: '🛠️', count: '32+', color: 'bg-teal-50 text-teal-700', border: 'border-teal-100', accent: 'bg-teal-500', description: 'Tutoring, hair styling, photography, and repair services.' },
  { name: 'Living', emoji: '🏠', count: '64+', color: 'bg-indigo-50 text-indigo-700', border: 'border-indigo-100', accent: 'bg-indigo-500', description: 'Small furniture, kettles, and room essentials for campus life.' },
  { name: 'Stationery', emoji: '✏️', count: '120+', color: 'bg-orange-50 text-orange-700', border: 'border-orange-100', accent: 'bg-orange-500', description: 'Pens, notebooks, and design supplies for your creative courses.' },
  { name: 'Events', emoji: '🎟️', count: '18+', color: 'bg-fuchsia-50 text-fuchsia-700', border: 'border-fuchsia-100', accent: 'bg-fuchsia-500', description: 'Student events, society tickets, and campus gatherings.' },
  { name: 'Food', emoji: '🍱', count: '42+', color: 'bg-green-50 text-brand-secondary', border: 'border-green-100', accent: 'bg-brand-secondary', description: 'Home-cooked student meals and vendor lunches near campus.' },
  { name: 'Sports', emoji: '⚽', count: '24+', color: 'bg-sky-50 text-sky-700', border: 'border-sky-100', accent: 'bg-sky-500', description: 'Kits, shoes, and equipment for student league players.' },
  { name: 'Music', emoji: '🎸', count: '15+', color: 'bg-violet-50 text-violet-700', border: 'border-violet-100', accent: 'bg-violet-500', description: 'Instruments, speakers, and local student music gear.' },
  { name: 'Misc', emoji: '✨', count: '90+', color: 'bg-slate-50 text-slate-700', border: 'border-slate-100', accent: 'bg-slate-900', description: 'Everything else that makes campus life exciting and easier.' },
];

const Categories: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[0] | null>(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-brand-primary/10 selection:text-brand-primary">
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                layoutId={`card-${selectedCategory.name}`}
                initial={{ scale: 0.9, opacity: 0, y: 20, rotateX: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20, rotateX: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border-2 ${selectedCategory.border} ${selectedCategory.color} p-8 shadow-2xl sm:p-12`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="absolute right-6 top-6 rounded-full bg-white/20 p-2 text-slate-900 transition-colors hover:bg-white/40 active:scale-95 sm:right-8 sm:top-8"
                >
                  <X size={24} />
                </button>

                <div className="relative z-10">
                  <motion.div 
                    initial={{ scale: 0.5, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="mb-8 flex text-7xl sm:text-8xl"
                  >
                    {selectedCategory.emoji}
                  </motion.div>

                  <h2 className="mb-4 text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
                    {selectedCategory.name}
                  </h2>
                  
                  <p className="mb-8 text-lg font-medium leading-relaxed text-slate-600 sm:text-xl">
                    {selectedCategory.description}
                  </p>

                  <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-2xl bg-white/40 p-4 ring-1 ring-black/5">
                      <div className="rounded-lg bg-white p-2 text-brand-primary">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-slate-400">Verified Ads</p>
                        <p className="text-sm font-bold text-slate-900">{selectedCategory.count} Active Listings</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-2xl bg-white/40 p-4 ring-1 ring-black/5">
                      <div className="rounded-lg bg-white p-2 text-brand-primary">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-slate-400">Demand</p>
                        <p className="text-sm font-bold text-slate-900">High Campus Interest</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                      to={`/search?category=${selectedCategory.name.toLowerCase()}`}
                      className="flex flex-1 items-center justify-center gap-3 rounded-full bg-slate-900 py-5 text-base font-black text-white shadow-xl transition-all hover:bg-slate-800 active:scale-95"
                    >
                      Browse All {selectedCategory.name} <ArrowRight size={20} />
                    </Link>
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="flex items-center justify-center gap-3 rounded-full bg-white py-5 px-8 text-base font-black text-slate-900 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
                    >
                      Close
                    </button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl ${selectedCategory.accent}`} />
                <div className={`absolute -left-20 -bottom-20 h-64 w-64 rounded-full opacity-20 blur-3xl ${selectedCategory.accent}`} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
      {/* Hero Section */}
      <section className="bg-brand-secondary py-16 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-[900] tracking-tight text-white sm:text-7xl">
              Explore <span className="text-brand-primary">Everything.</span>
            </h1>
            <p className="mt-6 text-base font-medium text-green-50/80 leading-relaxed sm:text-xl sm:mt-8">
              Whatever you need for the semester, we've organized it for you. 
              Browse the largest student marketplace in Lesotho.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-12 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary sm:mb-3 sm:text-xs">
                <span className="h-1 w-6 bg-brand-primary rounded-full sm:w-8" /> All Departments
              </div>
              <h2 className="text-3xl font-[900] tracking-tight text-slate-900 sm:text-4xl">
                Browse by <span className="text-brand-primary">Interest</span>
              </h2>
            </div>
            
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text"
                placeholder="Search categories..."
                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-3.5 pl-12 pr-4 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-primary focus:bg-white"
              />
            </div>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
            className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
          >
            {CATEGORIES.map((cat) => (
              <motion.div
                key={cat.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  show: { opacity: 1, scale: 1 }
                }}
                whileHover={{ y: -8 }}
                style={{ perspective: 1000 }}
              >
                <motion.button
                  layoutId={`card-${cat.name}`}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ 
                    rotateX: 10, 
                    rotateY: -10, 
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className={`group relative flex w-full flex-col h-full overflow-hidden text-left rounded-[1.5rem] sm:rounded-[2.5rem] border-2 ${cat.border} ${cat.color} p-4 sm:p-8 transition-colors duration-500 hover:bg-white`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    <div className="mb-3 flex text-3xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:translate-z-10 sm:mb-6 sm:text-5xl">
                      {cat.emoji}
                    </div>
                    <h3 className="text-base font-black tracking-tight leading-tight mb-2 sm:text-2xl sm:mb-3">{cat.name}</h3>
                    <p className="mb-4 text-[10px] font-medium opacity-80 leading-relaxed sm:text-sm sm:mb-6">
                      {cat.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-black uppercase tracking-widest opacity-60 sm:text-[10px]">{cat.count} listings</p>
                      <div className="sm:hidden flex h-6 w-6 items-center justify-center rounded-full bg-slate-900/5 text-slate-900">
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 relative z-10 hidden sm:flex items-center gap-1 text-[9px] font-black uppercase tracking-wider opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 sm:mt-8 sm:gap-2 sm:text-xs">
                    View Details <ArrowRight size={12} />
                  </div>

                  {/* Abstract decorative circles */}
                  <div className={`absolute -right-10 -bottom-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-20 ${cat.accent}`}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative mt-24 overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-center sm:rounded-[4rem] sm:px-12 sm:py-24"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mb-10 flex justify-center" style={{ perspective: 1000 }}>
                <motion.div
                  animate={{ 
                    y: [0, -12, 0],
                    rotateY: [0, 15, 0, -15, 0],
                    rotateX: [0, -8, 0, 8, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotateY: 25,
                    transition: { duration: 0.3 }
                  }}
                  className="relative flex items-center justify-center"
                >
                  <img 
                    src="/logo.png" 
                    alt="Logo" 
                    className="h-32 w-32 object-contain drop-shadow-[0_20px_50px_rgba(34,197,94,0.3)] sm:h-56 sm:w-56"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <ShoppingBag size={80} className="fallback-icon hidden text-brand-primary" />
                </motion.div>
              </div>

              <h2 className="mb-6 text-4xl font-[900] tracking-tight text-white sm:text-6xl">
                Ready to <span className="bg-linear-to-r from-brand-primary to-green-400 bg-clip-text text-transparent">Start Selling?</span>
              </h2>
              
              <p className="mx-auto mb-12 text-base font-bold leading-relaxed text-slate-300 sm:text-xl">
                Join our thriving network of student vendors. Reach your campus community instantly with zero fees and secure student-to-student transactions.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link 
                  to="/auth" 
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-primary px-10 py-5 text-sm font-black text-white shadow-[0_20px_40px_-10px_rgba(34,197,94,0.3)] transition-all hover:scale-105 hover:bg-green-600 active:scale-95 sm:w-auto sm:text-base"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Create Vendor Account <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Glowing accents */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-primary/20 blur-[100px]" />
            <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-green-500/20 blur-[100px]" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
