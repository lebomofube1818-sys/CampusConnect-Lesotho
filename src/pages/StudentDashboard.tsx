import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Store, 
  TrendingUp, 
  Tag, 
  GraduationCap,
  MessageSquare,
  Sparkles,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useFavoritesStore } from '../store/favoritesStore';

import { dataApi } from '../lib/api';

const MOCK_VENDORS = [
  {
    id: 'v1',
    name: 'Roma Tech Hub',
    category: 'Electronics',
    rating: 4.9,
    reviews: 124,
    locations: ['Roma', 'Maseru'],
    universities: ['NUL', 'LUCT'],
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=400&h=300',
    verified: true,
    description: 'Expert repair services and genuine student electronics.'
  },
  {
    id: 'v2',
    name: 'Khotso Custom Prints',
    category: 'Handmade',
    rating: 4.8,
    reviews: 89,
    locations: ['Maseru'],
    universities: ['LUCT', 'CAS'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=300',
    verified: true,
    description: 'Customized apparel and stationery for student organizations.'
  },
  {
    id: 'v3',
    name: 'Elite Tutors LS',
    category: 'Services',
    rating: 5.0,
    reviews: 56,
    locations: ['Maseru', 'Leribe', 'Roma'],
    universities: ['NUL', 'LCE', 'LUCT'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400&h=300',
    verified: true,
    description: 'Personalized tutoring in Math, Physics, and Business.'
  },
  {
    id: 'v4',
    name: 'Campus Cuisines',
    category: 'Food',
    rating: 4.7,
    reviews: 210,
    locations: ['Roma'],
    universities: ['NUL'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400&h=300',
    verified: false,
    description: 'Fresh home-style student meals delivered to your dorm.'
  }
];

const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { toggleFavorite, isFavorite, setIsOpen: setIsFavoritesOpen } = useFavoritesStore();
  const [vendors, setVendors] = useState<any[]>(MOCK_VENDORS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      setLoading(true);
      const response = await dataApi.getVendors();
      if (response.data && Array.isArray(response.data)) {
        setVendors(response.data.length > 0 ? response.data : MOCK_VENDORS);
      }
    } catch (err) {
      console.error('Failed to fetch vendors, using mocks:', err);
      setVendors(MOCK_VENDORS);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (vendor: any) => {
    toggleFavorite({
      id: vendor.id,
      name: vendor.name,
      category: vendor.category,
      image: vendor.image,
      rating: vendor.rating
    });
    if (!isFavorite(vendor.id)) {
      setIsFavoritesOpen(true);
    }
  };

  const filteredVendors = vendors.filter(v => 
    (v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (activeTab === 'all' || v.category.toLowerCase() === activeTab)
  );

  return (
    <div className="min-h-screen bg-bg-main pb-20 pt-8 sm:pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Section */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                <Sparkles size={14} />
              </span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary">Student Dashboard</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Hello, <span className="text-brand-primary">{user?.displayName?.split(' ')[0] || 'Student'}!</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-slate-500">
              Browse trusted vendors and popular campus services.
            </p>
          </motion.div>

          <div className="flex gap-3">
            <Link 
              to="/create-request"
              className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black text-white shadow-xl transition-all hover:bg-slate-800 active:scale-95"
            >
              <Tag size={18} /> Post a Need
            </Link>
          </div>
        </div>

        {/* Stats / Highlights */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider">Active Requests</h3>
            <p className="text-3xl font-black text-slate-900">12</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider">Verified Vendors</h3>
            <p className="text-3xl font-black text-slate-900">45+</p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <MapPin size={20} />
            </div>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-wider">Popular Campus</h3>
            <p className="text-3xl font-black text-slate-900">Roma</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search by vendor name, category, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl bg-white py-4 pl-12 pr-4 text-sm font-bold shadow-sm outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['All', 'Electronics', 'Food', 'Services', 'Handmade'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.toLowerCase()
                    ? 'bg-brand-primary text-white shadow-lg shadow-green-100'
                    : 'bg-white text-slate-500 hover:bg-slate-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filteredVendors.map((vendor, idx) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-slate-100 ring-1 ring-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl sm:flex-row"
            >
              {/* Vendor Image */}
              <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56">
                <img 
                  src={vendor.image} 
                  alt={vendor.name} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:bg-gradient-to-r" />
                <div className="absolute bottom-4 left-4 flex gap-1 sm:bottom-auto sm:top-4 sm:left-4 sm:flex-col">
                  {vendor.verified && (
                    <div className="flex items-center gap-1.5 rounded-full bg-brand-primary px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white shadow-lg">
                      <ShieldCheck size={10} /> Verified
                    </div>
                  )}
                </div>
              </div>

              {/* Vendor Info */}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-primary transition-colors">{vendor.name}</h3>
                    <p className="text-xs font-bold text-slate-400">{vendor.category}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-xl bg-amber-50 px-2 py-1 text-amber-600">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-black">{vendor.rating}</span>
                  </div>
                </div>

                <p className="mb-6 text-sm font-medium leading-relaxed text-slate-500">
                  {vendor.description}
                </p>

                <div className="mb-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                      <MapPin size={14} />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {vendor.locations.map(loc => (
                        <span key={loc} className="text-xs font-bold text-slate-600">{loc}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
                      <GraduationCap size={14} />
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {vendor.universities.map(uni => (
                        <span key={uni} className="text-xs font-bold text-slate-600">{uni}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <button 
                    onClick={() => handleToggleFavorite(vendor)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-xs font-black transition-all active:scale-95 ${
                      isFavorite(vendor.id)
                        ? 'bg-pink-50 text-pink-500 ring-1 ring-pink-200'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    {isFavorite(vendor.id) ? 'Favorited' : 'Add Favourite'} 
                    <Heart size={14} fill={isFavorite(vendor.id) ? "currentColor" : "none"} />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-brand-primary hover:text-white active:scale-90">
                    <MessageSquare size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Popular Locations / Universities Summary */}
        <div className="mt-20">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900">Network <span className="text-brand-primary">Coverage</span></h2>
            <p className="text-sm font-bold text-slate-500">Where our vendors are most active.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { name: 'Roma Campus (NUL)', vendors: 24, university: 'NUL' },
              { name: 'Maseru (LUCT)', vendors: 18, university: 'LUCT' },
              { name: 'Leribe (LCE)', vendors: 7, university: 'LCE' },
              { name: 'Maseru (CAS)', vendors: 12, university: 'CAS' },
            ].map((loc, idx) => (
              <motion.div 
                key={loc.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-3xl bg-white p-6 shadow-sm border border-slate-100 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-brand-primary">
                  <MapPin size={24} />
                </div>
                <h4 className="text-sm font-black text-slate-900 line-clamp-1">{loc.name}</h4>
                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">{loc.vendors} Ready Vendors</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
