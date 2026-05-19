import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Mail, Lock, UserCircle, Store, ArrowRight, Sparkles, Zap, ShieldCheck, Phone, Check, GraduationCap } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const countryCodes = [
  { code: '+266', name: 'LS', flag: '🇱🇸' },
  { code: '+27', name: 'ZA', flag: '🇿🇦' },
  { code: '+1', name: 'US', flag: '🇺🇸' },
  { code: '+44', name: 'GB', flag: '🇬🇧' },
  { code: '+234', name: 'NG', flag: '🇳🇬' },
  { code: '+254', name: 'KE', flag: '🇰🇪' },
  { code: '+263', name: 'ZW', flag: '🇿🇼' },
  { code: '+267', name: 'BW', flag: '🇧🇼' },
  { code: '+264', name: 'NA', flag: '🇳🇦' },
  { code: '+260', name: 'ZM', flag: '🇿🇲' },
  { code: '+255', name: 'TZ', flag: '🇹🇿' },
  { code: '+256', name: 'UG', flag: '🇺🇬' },
  { code: '+233', name: 'GH', flag: '🇬🇭' },
  { code: '+33', name: 'FR', flag: '🇫🇷' },
  { code: '+49', name: 'DE', flag: '🇩🇪' },
  { code: '+86', name: 'CN', flag: '🇨🇳' },
  { code: '+91', name: 'IN', flag: '🇮🇳' },
].sort((a, b) => a.name.localeCompare(b.name));

type AuthMode = 'login' | 'register';
type UserRole = 'student' | 'vendor';

const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countryCode, setCountryCode] = useState('+266');
  const [phone, setPhone] = useState('');
  const [school, setSchool] = useState('');
  
  const [agreed, setAgreed] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock verification for passwords
    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (mode === 'register' && !agreed) {
      setError('Please agree to terms');
      setLoading(false);
      return;
    }

    // Mock success
    setTimeout(() => {
      const mockUser = {
        uid: 'demo-' + Math.random().toString(36).substr(2, 9),
        email: email,
        displayName: displayName || (email.split('@')[0]),
        photoURL: null,
        role: role
      };
      
      useAuthStore.getState().setUser(mockUser as any);
      setLoading(false);
      setShowSuccess(true);
      
      // Delay redirect to show success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 1200);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    setTimeout(() => {
      const mockUser = {
        uid: 'demo-google',
        email: 'student@google.com',
        displayName: 'Google Student',
        photoURL: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg',
        role: 'student'
      };
      useAuthStore.getState().setUser(mockUser as any);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-br from-brand-primary via-emerald-600 to-brand-secondary px-4 pt-24 pb-12 sm:pt-40 font-sans overflow-hidden">
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-sm rounded-[3rem] bg-white p-10 text-center shadow-2xl"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-brand-primary">
                <Check size={40} strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-black text-slate-900">Success!</h2>
              <p className="mt-4 font-bold text-slate-500">
                {mode === 'login' ? 'Welcome back! Redirecting to your dashboard...' : 'Your account has been created successfully! Redirecting...'}
              </p>
              <div className="mt-8 flex justify-center">
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-slate-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                    className="h-full bg-brand-primary"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>      {/* Dynamic Background Elements */}
      <div className="fixed -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
      <div className="fixed -bottom-24 -right-24 h-96 w-96 rounded-full bg-black/10 blur-3xl animate-pulse"></div>

      {/* Header section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col items-center text-center"
      >
        <div className="mb-10 flex justify-center" style={{ perspective: 1000 }}>
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotateY: [0, 20, 0, -20, 0],
              rotateX: [0, -10, 0, 10, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            whileHover={{ 
              scale: 1.2, 
              rotateY: 30,
              transition: { duration: 0.3 }
            }}
            className="relative flex items-center justify-center"
          >
            <img 
              src="/logo.png" 
              alt="Campus Connect" 
              className="h-48 w-48 object-contain drop-shadow-[0_40px_80px_rgba(34,197,94,0.5)] sm:h-72 sm:w-72"
            />
          </motion.div>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-md sm:text-4xl">
          CampusConnect
        </h1>
        <p className="mt-1 text-[11px] font-black uppercase tracking-[0.4em] text-emerald-50 opacity-90">Lesotho • Student Marketplace</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative w-full max-w-[420px]"
      >
        <div className="rounded-[3rem] bg-white/95 backdrop-blur-xl p-8 shadow-2xl sm:p-10 relative overflow-hidden ring-1 ring-white/50">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-slate-900">
              {mode === 'login' ? 'Welcome Back' : 'Join the Community'}
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-500">
              {mode === 'login' ? 'Login to your student account' : 'Start buying and selling today'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Full Name</label>
                    <div className="relative group">
                      <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand-primary" size={20} />
                      <input 
                        required
                        type="text"
                        placeholder="Thabo Mokoena"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full rounded-2xl bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold border-2 border-transparent transition-all focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Phone Number</label>
                    <div className="flex gap-2 h-[58px]">
                      <div className="relative shrink-0 w-32 h-full">
                        <select 
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="h-full w-full rounded-2xl bg-slate-50 pl-4 pr-10 text-xs font-black appearance-none border-2 border-transparent transition-all focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-0 cursor-pointer"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>{c.flag} {c.name} {c.code}</option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-hover:text-brand-primary">
                          <ArrowRight size={14} className="rotate-90" />
                        </div>
                      </div>
                      <div className="relative flex-1 h-full group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand-primary" size={18} />
                        <input 
                          required
                          type="tel"
                          placeholder="5800 0000"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          className="h-full w-full rounded-2xl bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold border-2 border-transparent transition-all focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Register as a:</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setRole('student')}
                        className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-5 transition-all border-2 ${
                          role === 'student' 
                            ? 'border-brand-primary bg-emerald-50/50 shadow-sm' 
                            : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <UserCircle size={28} className={role === 'student' ? 'text-brand-primary' : 'text-slate-400'} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${role === 'student' ? 'text-brand-primary' : 'text-slate-600'}`}>Student</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole('vendor')}
                        className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-5 transition-all border-2 ${
                          role === 'vendor' 
                            ? 'border-brand-primary bg-emerald-50/50 shadow-sm' 
                            : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <Store size={28} className={role === 'vendor' ? 'text-brand-primary' : 'text-slate-400'} />
                        <span className={`text-[10px] font-black uppercase tracking-widest ${role === 'vendor' ? 'text-brand-primary' : 'text-slate-600'}`}>Vendor</span>
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {role === 'student' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-5 overflow-hidden"
                      >
                        <div className="space-y-2 pt-2">
                          <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Your School / University</label>
                          <div className="relative group">
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand-primary" size={20} />
                            <select 
                              required
                              value={school}
                              onChange={(e) => setSchool(e.target.value)}
                              className="w-full rounded-2xl bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold appearance-none border-2 border-transparent transition-all focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-0 cursor-pointer"
                            >
                              <option value="" disabled>Select your institution</option>
                              <option value="NUL">National University of Lesotho (NUL)</option>
                              <option value="LUCT">Limkokwing University (LUCT)</option>
                              <option value="LCE">Lesotho College of Education (LCE)</option>
                              <option value="Lerotholi">Lerotholi Polytechnic</option>
                              <option value="CAS">Centre for Accounting Studies (CAS)</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand-primary" size={20} />
                <input 
                  required
                  type="email"
                  placeholder="students@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold border-2 border-transparent transition-all focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Secret Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand-primary" size={20} />
                <input 
                  required
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold border-2 border-transparent transition-all focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <AnimatePresence>
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-brand-primary" size={20} />
                    <input 
                      required
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-2xl bg-slate-50 py-4 pl-12 pr-4 text-sm font-semibold border-2 border-transparent transition-all focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-0"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-3 px-1 py-1"
                >
                  <button
                    type="button"
                    onClick={() => setAgreed(!agreed)}
                    className={`group relative flex h-6 w-6 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300 ${
                      agreed 
                        ? 'bg-brand-primary border-brand-primary shadow-lg shadow-green-100 ring-4 ring-brand-primary/10' 
                        : 'border-slate-200 bg-white hover:border-brand-primary/50'
                    }`}
                  >
                    <AnimatePresence>
                      {agreed && (
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -45 }}
                        >
                          <Check size={14} className="text-white stroke-[4]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                  <p className="text-[11px] font-bold text-slate-500 leading-tight select-none">
                    I agree to the <span className="text-brand-primary cursor-pointer hover:underline decoration-brand-primary/30 underline-offset-2">Terms of Service</span> and <span className="text-brand-primary cursor-pointer hover:underline decoration-brand-primary/30 underline-offset-2">Privacy Policy</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-[10px] font-bold text-red-500 text-center uppercase tracking-wider"
              >
                {error}
              </motion.p>
            )}

            <div className="pt-6 space-y-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full rounded-2xl bg-brand-primary py-4 text-sm font-black text-white shadow-xl shadow-green-900/10 transition-all hover:scale-[1.02] hover:bg-emerald-600 active:scale-95 disabled:opacity-50"
              >
                {loading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
              </button>

              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-slate-50 py-4 text-xs font-bold text-slate-600 transition-all hover:bg-slate-100"
              >
                {mode === 'login' ? (
                  <>Don't have an account? <span className="text-brand-primary font-black">Sign Up</span></>
                ) : (
                  <>Already a member? <span className="text-brand-primary font-black">Sign In</span></>
                )}
              </button>
            </div>
          </form>

          {/* Social login divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-100"></div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Trust</span>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>

          <button 
            type="button"
            onClick={signInWithGoogle}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-white py-4 text-xs font-black text-slate-700 ring-1 ring-slate-100 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="h-5 w-5" alt="Google" />
            Continue with Google
          </button>
        </div>

        <div className="mt-8 text-center text-white/80 drop-shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Built for Lesotho Students</p>
          <div className="flex items-center justify-center gap-4 text-[10px] font-bold mt-2">
            <span className="flex items-center gap-1"><Sparkles size={10} /> Secure</span>
            <span className="h-1 w-1 rounded-full bg-white/40"></span>
            <span className="flex items-center gap-1"><Zap size={10} /> Fast</span>
            <span className="h-1 w-1 rounded-full bg-white/40"></span>
            <span className="flex items-center gap-1"><ShieldCheck size={10} /> Verified</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
