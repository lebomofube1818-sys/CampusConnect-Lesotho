import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
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
  Heart,
  Trash2,
  CheckCircle2
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
    description: 'Expert repair services and genuine student electronics.',
    workedWith: true,
    dealsCount: 4
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
    description: 'Customized apparel and stationery for student organizations.',
    workedWith: false,
    dealsCount: 0
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
    description: 'Personalized tutoring in Math, Physics, and Business.',
    workedWith: true,
    dealsCount: 2
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
    description: 'Fresh home-style student meals delivered to your dorm.',
    workedWith: true,
    dealsCount: 7
  },
  {
    id: 'v5',
    name: 'Lerotholi Auto Services',
    category: 'Services',
    rating: 4.6,
    reviews: 42,
    locations: ['Maseru'],
    universities: ['Lerotholi'],
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400&h=300',
    verified: true,
    description: 'Affordable on-campus and nearby mobile mechanical repairs and diagnostics.',
    workedWith: false,
    dealsCount: 0
  },
  {
    id: 'v6',
    name: 'CAS Books & Supplies',
    category: 'Books',
    rating: 4.9,
    reviews: 35,
    locations: ['Maseru'],
    universities: ['CAS'],
    image: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400&h=300',
    verified: true,
    description: 'Taxation, Auditing, and Financial Accounting textbooks for professional streams.',
    workedWith: true,
    dealsCount: 3
  }
];

const getStudentSchoolCode = (school: string | undefined | null): string => {
  if (!school) return 'NUL';
  const s = school.toUpperCase();
  if (s.includes('NUL') || s.includes('NATIONAL UNIVERSITY') || s.includes('ROMA')) return 'NUL';
  if (s.includes('LUCT') || s.includes('LIMKOKWING')) return 'LUCT';
  if (s.includes('LCE') || s.includes('LESOTHO COLLEGE') || s.includes('EDUCATION')) return 'LCE';
  if (s.includes('LEROTHOLI') || s.includes('POLYTECHNIC')) return 'Lerotholi';
  if (s.includes('CAS') || s.includes('ACCOUNTING') || s.includes('CENTRE FOR ACCOUNTING')) return 'CAS';
  return 'NUL'; // Default fallback
};

const getCampusFromSchool = (schoolName: string | undefined | null): string => {
  if (!schoolName) return 'Roma';
  const s = schoolName.toUpperCase();
  if (s.includes('NUL') || s.includes('LESOTHO') || s.includes('ROMA')) return 'Roma';
  if (s.includes('LUCT') || s.includes('LIMKOKWING') || s.includes('CAS') || s.includes('ACCOUNTING') || s.includes('LEROTHOLI') || s.includes('MASERU')) return 'Maseru';
  if (s.includes('LCE') || s.includes('EDUCATION') || s.includes('LERIBE')) return 'Leribe';
  return 'Roma';
};

const StudentDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { toggleFavorite, isFavorite, setIsOpen: setIsFavoritesOpen } = useFavoritesStore();
  const [vendors, setVendors] = useState<any[]>(MOCK_VENDORS);
  const [studentRequests, setStudentRequests] = useState<any[]>([]);
  const [requestsFilter, setRequestsFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [loading, setLoading] = useState(true);

  const studentSchoolCode = getStudentSchoolCode(user?.school);
  const studentCampus = getCampusFromSchool(user?.school);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadVendors();
    loadStudentRequests();
  }, [user]);

  const loadStudentRequests = () => {
    const local = localStorage.getItem('client_student_requests');
    let parsedLocal = local ? JSON.parse(local) : [];

    // Pre-populate some initial customizable entries if no posts exist
    if (parsedLocal.length === 0) {
      const studentName = user?.displayName || 'Thabo Mokoena';
      const studentUid = user?.uid || 'demo-student-uid';
      const rawSchool = user?.school || 'NUL';
      const campus = getCampusFromSchool(rawSchool);
      
      const defaultRequests = [
        {
          id: 'req-l1',
          item: 'Macroeconomics 101 Textbook',
          category: 'Books',
          budget: '320',
          description: 'Looking for a clean copy of the prescribed Macroeconomics textbook. No torn pages or heavy highlights.',
          student: studentName,
          studentUid: studentUid,
          campus: campus,
          postedAt: '2 days ago',
          urgency: 'Needed Soon',
          status: 'open',
          timestamp: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString()
        },
        {
          id: 'req-l2',
          item: 'HP Pavilion Laptop Charger (65W)',
          category: 'Electronics',
          budget: '450',
          description: 'Urgent! My charger short-circuited and I need a replacement immediately to complete my software lab assignment due tomorrow.',
          student: studentName,
          studentUid: studentUid,
          campus: campus,
          postedAt: '5 hours ago',
          urgency: 'Urgent',
          status: 'urgent',
          timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
        }
      ];
      localStorage.setItem('client_student_requests', JSON.stringify(defaultRequests));
      parsedLocal = defaultRequests;
    }

    setStudentRequests(parsedLocal);
  };

  const handleToggleRequestStatus = (requestId: string) => {
    const updated = studentRequests.map(req => {
      if (req.id === requestId) {
        const isResolved = req.status === 'resolved';
        return {
          ...req,
          status: isResolved ? 'open' : 'resolved',
          urgency: isResolved ? 'Needed Soon' : 'Resolved'
        };
      }
      return req;
    });
    setStudentRequests(updated);
    localStorage.setItem('client_student_requests', JSON.stringify(updated));
  };

  const handleDeleteRequest = (requestId: string) => {
    const updated = studentRequests.filter(req => req.id !== requestId);
    setStudentRequests(updated);
    localStorage.setItem('client_student_requests', JSON.stringify(updated));
  };

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

  // Filter and prioritize vendors matching criteria: Worked-with OR Verified OR Around Area
  const personalizedVendors = vendors.filter(v => {
    const isAroundArea = v.universities?.some((uni: string) => uni.toUpperCase() === studentSchoolCode.toUpperCase()) || 
                         v.locations?.some((loc: string) => loc.toLowerCase() === studentCampus.toLowerCase());
    const isVerified = v.verified === true;
    const isWorkedWith = v.workedWith === true;

    return isWorkedWith || isVerified || isAroundArea;
  });

  // Sort: Worked-with partners at the top, then verified, then general ratings
  const sortedVendors = [...personalizedVendors].sort((a, b) => {
    if (a.workedWith && !b.workedWith) return -1;
    if (!a.workedWith && b.workedWith) return 1;
    if (a.verified && !b.verified) return -1;
    if (!a.verified && b.verified) return 1;
    return b.rating - a.rating;
  });

  // Filter requests based on status tabs
  const filteredRequests = studentRequests.filter(req => {
    if (requestsFilter === 'active') return req.status !== 'resolved';
    if (requestsFilter === 'resolved') return req.status === 'resolved';
    return true;
  });

  return (
    <div className="min-h-screen bg-bg-main pb-20 pt-8 sm:pt-12 font-sans">
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
              <span className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary">
                {studentSchoolCode} Campus Member
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Hello, <span className="text-brand-primary">{user?.displayName?.split(' ')[0] || 'Student'}!</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-slate-500">
              Welcome to your personalized board for {user?.school || 'National University of Lesotho (NUL)'}.
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

        {/* Dynamic Personalized Stats */}
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between sm:flex-col sm:items-start gap-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-blue-50 text-blue-600">
                <TrendingUp size={16} className="sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider leading-tight">Active Needs</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              {studentRequests.filter(r => r.status !== 'resolved').length}
            </p>
          </div>
          
          <div className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between sm:flex-col sm:items-start gap-2">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-brand-primary/10 text-brand-primary">
                <ShieldCheck size={16} className="sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider leading-tight">Partners Net</h3>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{sortedVendors.length}</p>
          </div>

          <div className="col-span-2 sm:col-span-1 rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-slate-100 flex sm:flex-col justify-between items-center sm:items-start">
            <div className="flex items-center sm:flex-col sm:items-start gap-2.5">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-amber-50 text-amber-600">
                <MapPin size={16} className="sm:w-5 sm:h-5" />
              </div>
              <h3 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider leading-tight">Campus Base</h3>
            </div>
            <p className="text-lg sm:text-2xl font-black text-slate-950 capitalize truncate max-w-[150px] sm:max-w-none text-right sm:text-left mt-1">
              {studentCampus}
            </p>
          </div>
        </div>

        {/* Personalized Student Requests Board */}
        <div className="mb-16">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                My <span className="text-brand-primary">Posted Needs</span>
              </h2>
              <p className="text-sm font-bold text-slate-500">
                Manage your active and completed marketplace help requests on campus.
              </p>
            </div>
            <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl w-fit self-start">
              {(['all', 'active', 'resolved'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setRequestsFilter(f)}
                  className={`rounded-xl px-5 py-2 text-xs font-black uppercase tracking-wider transition-all select-none ${
                    requestsFilter === f
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className="rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white p-12 text-center shadow-sm">
              <p className="text-base font-black text-slate-400">No student postings found here.</p>
              <Link
                to="/create-request"
                className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-primary hover:underline"
              >
                Create your first request <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className={`relative flex flex-col overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-white p-3.5 sm:p-6 shadow-md border transition-all ${
                    req.status === 'resolved' 
                      ? 'border-slate-100 opacity-75 grayscale bg-slate-50/50' 
                      : req.status === 'urgent' 
                        ? 'border-rose-100 shadow-rose-50/40 ring-1 ring-rose-50' 
                        : 'border-slate-200/60 shadow-slate-50/50 hover:shadow-lg'
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-1">
                    <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 sm:px-2.5 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider ${
                      req.status === 'resolved'
                        ? 'bg-slate-200 text-slate-500'
                        : req.status === 'urgent'
                          ? 'bg-rose-50 text-rose-600'
                          : 'bg-emerald-50 text-brand-primary'
                    }`}>
                      {req.status === 'resolved' ? 'Resolved' : req.urgency}
                    </span>
                    <span className="text-sm sm:text-lg font-black text-brand-primary font-mono select-none">M{req.budget}</span>
                  </div>

                  <h3 className={`text-xs sm:text-lg font-black text-slate-900 mb-1 sm:mb-2 line-clamp-1 ${req.status === 'resolved' ? 'line-through text-slate-400' : ''}`}>
                    {req.item}
                  </h3>
                  
                  <p className="text-[10px] sm:text-sm font-medium text-slate-500 mb-3 sm:mb-6 flex-1 min-h-[30px] sm:min-h-[40px] leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-3">
                    "{req.description}"
                  </p>

                  {/* Proposals simulator */}
                  {req.status !== 'resolved' && (
                    <div className="mb-3 sm:mb-6 rounded-xl sm:rounded-2xl bg-slate-50 p-2.5 sm:p-4 border border-slate-100/60 text-[9px] sm:text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black uppercase tracking-wider text-slate-400 text-[8px] sm:text-[10px]">Verified Offers</span>
                        <span className="flex h-1.5 w-1.5 rounded-full bg-brand-primary animate-pulse" />
                      </div>
                      <p className="font-bold text-slate-700 line-clamp-2 sm:line-clamp-none leading-tight">
                        {req.id === 'req-l2' || req.category.toLowerCase().includes('charger') || req.category.toLowerCase().includes('electr')
                          ? 'Roma Tech Hub is ready to supply this.' 
                          : 'Elite Tutors LS sent a proposal.'}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2.5 pt-3 sm:pt-4 border-t border-slate-100 mt-auto">
                    <span className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      <Tag size={10} className="text-slate-300 shrink-0" /> <span className="truncate">{req.category}</span>
                    </span>
                    
                    <div className="flex items-center justify-between gap-1 mt-1 sm:mt-0">
                      <span className="text-[8px] sm:text-[9px] font-bold text-slate-400 font-mono">
                        {req.postedAt}
                      </span>
                      
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleToggleRequestStatus(req.id)}
                          className={`rounded-lg sm:rounded-xl px-2 sm:px-4 py-1 sm:py-2 text-[8px] sm:text-[10px] font-black uppercase tracking-wider transition-all border select-none active:scale-95 ${
                            req.status === 'resolved'
                              ? 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                              : 'bg-emerald-50 text-brand-primary border-emerald-100 hover:bg-emerald-100'
                          }`}
                        >
                          {req.status === 'resolved' ? 'Open' : <span className="inline-flex"><span className="hidden sm:inline mr-0.5">Mark </span>Done</span>}
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(req.id)}
                          className="rounded-lg sm:rounded-xl p-1 sm:p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent active:scale-90"
                          title="Delete Request"
                        >
                          <Trash2 size={12} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Personalized & Filtered Vendors Section */}
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              Trusted <span className="text-brand-primary">Campus Vendors</span>
            </h2>
            <p className="text-sm font-bold text-slate-500">
              Verified campus partners, nearby stores, and vendors you previously worked with.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {sortedVendors.map((vendor, idx) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-white shadow-xl shadow-slate-100 ring-1 ring-slate-100 transition-all hover:-translate-y-2 hover:shadow-2xl sm:flex-row"
              >
                {/* Vendor Image & Badge Area */}
                <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 animate-fade-in"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Trust Status Badges */}
                  <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 sm:bottom-auto sm:top-4 sm:left-4 sm:flex-col">
                    {vendor.workedWith && (
                      <div className="flex items-center gap-1 rounded-full bg-slate-950 px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-yellow-300 shadow-md">
                        <Star size={8} fill="currentColor" stroke="none" /> <span className="hidden sm:inline">Worked & Trusted </span>({vendor.dealsCount})
                      </div>
                    )}
                    {vendor.verified && (
                      <div className="flex items-center gap-1 rounded-full bg-brand-primary px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white shadow-md">
                        <ShieldCheck size={8} /> <span className="hidden sm:inline">Verified Partner</span><span className="inline sm:hidden">Verified</span>
                      </div>
                    )}
                    {vendor.universities?.some((uni: string) => uni.toUpperCase() === studentSchoolCode.toUpperCase()) && (
                      <div className="flex items-center gap-1 rounded-full bg-blue-600 px-2 py-0.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-white shadow-md">
                        <GraduationCap size={8} /> <span className="hidden sm:inline">{studentSchoolCode} Campus</span><span className="inline sm:hidden">{studentSchoolCode}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Vendor Info */}
                <div className="flex flex-1 flex-col p-3.5 sm:p-8">
                  <div className="mb-2 sm:mb-4 flex items-start justify-between gap-1">
                    <div>
                      <h3 className="text-sm sm:text-xl font-black text-slate-900 group-hover:text-brand-primary transition-colors line-clamp-1">
                        {vendor.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-400">{vendor.category}</p>
                    </div>
                    <div className="flex items-center gap-0.5 sm:gap-1 rounded-lg sm:rounded-xl bg-amber-50 px-1.5 sm:px-2 py-0.5 sm:py-1 text-amber-600 shrink-0">
                      <Star size={10} className="sm:w-3.5 sm:h-3.5" fill="currentColor" />
                      <span className="text-[10px] sm:text-xs font-black">{vendor.rating}</span>
                    </div>
                  </div>

                  <p className="mb-3 sm:mb-6 text-[11px] sm:text-sm font-medium leading-relaxed text-slate-500 line-clamp-2 sm:line-clamp-none">
                    {vendor.description}
                  </p>

                  <div className="mb-4 sm:mb-8 space-y-2 sm:space-y-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-md sm:rounded-lg bg-slate-50 text-slate-400 shrink-0">
                        <MapPin size={11} className="sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {vendor.locations.map(loc => (
                          <span key={loc} className="text-[9px] sm:text-xs font-bold text-slate-600">{loc}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-5 w-5 sm:h-7 sm:w-7 items-center justify-center rounded-md sm:rounded-lg bg-slate-50 text-slate-400 shrink-0">
                        <GraduationCap size={11} className="sm:w-3.5 sm:h-3.5" />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {vendor.universities.map(uni => (
                          <span key={uni} className={`text-[9px] sm:text-xs font-bold ${
                            uni.toUpperCase() === studentSchoolCode.toUpperCase()
                              ? 'text-brand-primary font-black'
                              : 'text-slate-600'
                          }`}>
                            {uni}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto flex items-center gap-1.5 sm:gap-3">
                    <button 
                      onClick={() => handleToggleFavorite(vendor)}
                      className={`flex flex-1 items-center justify-center gap-1 rounded-lg sm:rounded-xl py-2 sm:py-3 text-[9px] sm:text-xs font-black transition-all active:scale-95 select-none ${
                        isFavorite(vendor.id)
                          ? 'bg-pink-50 text-pink-500 ring-1 ring-pink-200'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <span className="truncate">{isFavorite(vendor.id) ? 'Favorited' : <><span className="hidden sm:inline">Add </span>Favourite</>}</span>
                      <Heart size={11} className="sm:w-3.5 sm:h-3.5 shrink-0" fill={isFavorite(vendor.id) ? "currentColor" : "none"} />
                    </button>
                    <button className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-slate-50 text-slate-500 transition-all hover:bg-brand-primary hover:text-white active:scale-90 shrink-0">
                      <MessageSquare size={12} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical coverage summary */}
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
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 25px -5px rgba(132, 204, 22, 0.1), 0 10px 10px -5px rgba(132, 204, 22, 0.04)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative rounded-[2rem] bg-lime-50/80 p-7 text-center shadow-md shadow-lime-950/5 border border-lime-200/70 transition-all duration-300 group/card overflow-hidden"
              >
                {/* Decorative background shape */}
                <div className="absolute -right-4 -bottom-4 h-16 w-16 rounded-full bg-lime-500/10 transition-transform duration-500 group-hover/card:scale-150" />
                
                {/* Subtle Home Campus Indicator */}
                {loc.university.toUpperCase() === studentSchoolCode.toUpperCase() && (
                  <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-emerald-800 border border-emerald-200">
                    Home
                  </span>
                )}

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100 text-lime-700 transition-all duration-300 group-hover/card:scale-115 group-hover/card:bg-lime-650 group-hover/card:bg-lime-600 group-hover/card:text-white">
                  <MapPin size={24} className="transition-transform group-hover/card:rotate-6" />
                </div>
                
                <h4 className="text-sm font-black text-slate-800 line-clamp-1 transition-colors group-hover/card:text-lime-700">
                  {loc.name}
                </h4>
                
                <p className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  {loc.vendors} Ready Vendors
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
