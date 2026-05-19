import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Tag, 
  User, 
  MessageSquare, 
  Filter, 
  ChevronRight, 
  X, 
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2
} from 'lucide-react';

import { dataApi } from '../lib/api';

const MOCK_REQUESTS = [
  {
    id: 'req1',
    item: 'HP Laptop Charger (65W)',
    category: 'Electronics',
    budget: '450',
    description: 'Looking for an original HP charger for my Pavilion laptop. Must be in Roma campus for quick pickup today.',
    student: 'Thabo Mokoena',
    campus: 'Roma',
    postedAt: '2 hours ago',
    urgency: 'High',
    status: 'urgent'
  },
  {
    id: 'req2',
    item: 'Macroeconomics Textbook',
    category: 'Books',
    budget: '300-400',
    description: 'Need the latest edition for NUL first-year economics. Willing to negotiate price if in good condition.',
    student: 'Neo Sekoai',
    campus: 'Maseru',
    postedAt: '5 hours ago',
    urgency: 'Standard',
    status: 'open'
  },
  {
    id: 'req3',
    item: 'Scientific Calculator',
    category: 'Stationery',
    budget: '250',
    description: 'Casio fx-991ES preferred. Needed for upcoming math finals.',
    student: 'Lerato Phiri',
    campus: 'Roma',
    postedAt: '1 day ago',
    urgency: 'High',
    status: 'urgent'
  },
  {
    id: 'req4',
    item: 'Campus Hoodie (Medium)',
    category: 'Fashion',
    budget: '350',
    description: 'Looking for a branded NUL or Roma campus hoodie. Grey or Navy preferred.',
    student: 'Khotso Molapo',
    campus: 'Maseru',
    postedAt: 'Yesterday',
    urgency: 'Standard',
    status: 'open'
  }
];

const Requests: React.FC = () => {
  const [requests, setRequests] = useState<any[]>(MOCK_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const response = await dataApi.getRequests();
      if (response.data && Array.isArray(response.data)) {
        setRequests(response.data.length > 0 ? response.data : MOCK_REQUESTS);
      }
    } catch (err) {
      console.error('Failed to fetch requests, using mocks:', err);
      setRequests(MOCK_REQUESTS);
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = filter === 'All' 
    ? requests 
    : requests.filter(r => r.category === filter || r.campus === filter);

  return (
    <div className="min-h-screen bg-white pb-20 selection:bg-brand-primary/10 selection:text-brand-primary">
      {/* Request Detail Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRequest(null)}
              className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-md"
            />
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                layoutId={`req-card-${selectedRequest.id}`}
                initial={{ scale: 0.9, opacity: 0, rotateX: -15, y: 30 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, rotateX: 10, y: 20 }}
                className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl sm:p-12"
                style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
              >
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="absolute right-6 top-6 z-50 rounded-full bg-slate-100 p-2 text-slate-500 transition-all hover:bg-slate-200"
                >
                  <X size={20} />
                </button>

                <div className="relative z-10" style={{ transform: 'translateZ(40px)' }}>
                  <div className="mb-6">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-primary">
                      <Sparkles size={12} /> {selectedRequest.category}
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{selectedRequest.item}</h2>
                  </div>

                  <div className="mb-8 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Max Budget</p>
                      <p className="text-xl font-black text-brand-primary">M {selectedRequest.budget}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">Campus</p>
                      <p className="text-lg font-black text-slate-900">{selectedRequest.campus}</p>
                    </div>
                  </div>

                  <div className="mb-10">
                    <h4 className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Request Details</h4>
                    <p className="text-lg font-medium leading-relaxed text-slate-600">
                      "{selectedRequest.description}"
                    </p>
                  </div>

                  <div className="mb-10 flex items-center gap-4 rounded-3xl bg-slate-50 p-4 border border-slate-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-4 ring-white">
                      <User className="text-slate-400" size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{selectedRequest.student}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Posted {selectedRequest.postedAt}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button className="flex items-center justify-center gap-3 rounded-full bg-slate-900 py-4 text-sm font-black text-white transition-all hover:bg-slate-800 active:scale-95">
                      <CheckCircle2 size={18} /> I have this item
                    </button>
                    <button className="flex items-center justify-center gap-3 rounded-full border-2 border-slate-100 py-4 text-sm font-black text-slate-900 transition-all hover:bg-slate-50 active:scale-95">
                      <MessageSquare size={18} /> Negotiate Offer
                    </button>
                  </div>
                </div>

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-primary/10 blur-[100px]" />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="bg-brand-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotateY: [0, 10, 0, -10, 0],
                y: [0, -10, 0]
              }}
              transition={{ 
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 },
                rotateY: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="mb-8 flex items-center justify-center p-2"
              style={{ perspective: 1000 }}
            >
              <img 
                src="/logo.png" 
                alt="Campus Connect" 
                className="h-28 w-28 object-contain drop-shadow-[0_20px_40px_rgba(34,197,94,0.3)] sm:h-40 sm:w-40" 
              />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
              Student <span className="text-brand-primary">Wants.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium text-slate-300">
              Direct market intelligence. See what students actually need right now and meet the demand instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {['All', 'Electronics', 'Books', 'Fashion', 'Roma', 'Maseru'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-6 py-3 text-xs font-black uppercase tracking-wider transition-all active:scale-95 ${
                filter === f 
                ? 'bg-brand-primary text-white shadow-lg shadow-green-200' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((req) => (
            <motion.button
              key={req.id}
              layoutId={`req-card-${req.id}`}
              onClick={() => setSelectedRequest(req)}
              whileHover={{ 
                y: -12,
                rotateX: 4,
                rotateY: -4,
                boxShadow: "0 40px 80px -15px rgba(0,0,0,0.12)"
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col items-start overflow-hidden rounded-[2.5rem] bg-white p-8 text-left shadow-xl shadow-slate-100 transition-all"
              style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
            >
              <div className="mb-6 flex w-full items-start justify-between" style={{ transform: 'translateZ(30px)' }}>
                <div className={`rounded-2xl p-3 ${req.status === 'urgent' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-brand-primary'}`}>
                  <ShoppingBag size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Budget</span>
                  <span className="text-xl font-black text-slate-900">M {req.budget}</span>
                </div>
              </div>

              <div className="flex-1" style={{ transform: 'translateZ(20px)' }}>
                <h3 className="mb-2 text-xl font-black tracking-tight text-slate-900 group-hover:text-brand-primary transition-colors">{req.item}</h3>
                <p className="mb-6 line-clamp-2 text-sm font-medium text-slate-500 leading-relaxed">
                  {req.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 border border-slate-100">
                    <MapPin size={12} /> {req.campus}
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 border border-slate-100">
                    <Tag size={12} /> {req.category}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex w-full items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden">
                    <div className="flex h-full w-full items-center justify-center bg-brand-primary/10 text-brand-primary text-[8px] font-bold">
                      {req.student.charAt(0)}
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{req.postedAt}</span>
                </div>
                <ArrowRight size={18} className="text-brand-primary opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </div>

              {req.status === 'urgent' && (
                <div className="absolute right-8 top-24 -rotate-12 rounded-full border-2 border-red-500/20 px-2 py-1 text-[8px] font-black uppercase tracking-widest text-red-500/40">
                  Negotiable
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-20 py-20 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Open Requests', val: '124' },
              { label: 'Total Budget', val: 'M 45K+' },
              { label: 'Roma Needs', val: '82' },
              { label: 'Maseru Needs', val: '42' }
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Requests;
