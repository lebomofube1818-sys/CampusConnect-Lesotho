import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search, Sparkles } from 'lucide-react';
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
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-brand-secondary py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-[900] tracking-tight text-white sm:text-7xl">
                Explore <span className="text-brand-primary">Everything.</span>
              </h1>
              <p className="mt-8 text-lg font-medium text-green-50/80 leading-relaxed sm:text-xl">
                Whatever you need for the semester, we've organized it for you. 
                Browse the largest student marketplace in Lesotho.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-brand-primary">
                <span className="h-1 w-8 bg-brand-primary rounded-full" /> All Departments
              </div>
              <h2 className="text-4xl font-[900] tracking-tight text-slate-900">
                Browse by <span className="text-brand-primary">Interest</span>
              </h2>
            </div>
            
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text"
                placeholder="Search for a specific category..."
                className="w-full rounded-2xl border-2 border-slate-100 bg-slate-50 py-4 pl-12 pr-4 text-sm font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-primary focus:bg-white"
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
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {CATEGORIES.map((cat) => (
              <motion.div
                key={cat.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  show: { opacity: 1, scale: 1 }
                }}
              >
                <Link 
                  to={`/search?category=${cat.name.toLowerCase()}`}
                  className={`group relative flex flex-col h-full overflow-hidden rounded-[2.5rem] border-2 ${cat.border} ${cat.color} p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200`}
                >
                  <div className="relative z-10">
                    <div className="mb-6 flex text-5xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      {cat.emoji}
                    </div>
                    <h3 className="text-2xl font-black tracking-tight leading-none mb-3">{cat.name}</h3>
                    <p className="mb-6 text-sm font-medium opacity-80 leading-relaxed">
                      {cat.description}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{cat.count} listings found</p>
                  </div>

                  <div className="mt-8 relative z-10 flex items-center gap-2 text-xs font-black uppercase tracking-wider opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                    Explore Department <ArrowRight size={14} />
                  </div>

                  {/* Abstract decorative circles */}
                  <div className={`absolute -right-10 -bottom-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-20 ${cat.accent}`}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 overflow-hidden rounded-[3rem] bg-brand-primary p-12 text-center sm:p-20"
          >
            <h2 className="mb-6 text-3xl font-[900] text-brand-secondary sm:text-5xl">
              Become a <span className="text-white">Campus Vendor.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-lg font-medium text-brand-secondary/80">
              Start selling your textbooks, skills, or snacks to your campus community today 
              with zero commission fees.
            </p>
            <Link 
              to="/auth" 
              className="inline-flex items-center gap-3 rounded-full bg-brand-secondary px-10 py-5 text-sm font-black text-white shadow-xl shadow-green-950/20 transition-transform hover:scale-105 active:scale-95"
            >
              Start Selling Now <Sparkles size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
