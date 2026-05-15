import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User as UserIcon, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const { user, setUser } = useAuthStore();

  const handleLogin = () => {
    // Mock login
    setUser({ displayName: 'Student User', email: 'test@student.ls' } as any);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/40 bg-white/65 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.037)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-xl font-black text-white shadow-lg shadow-green-200">
                CC
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Campus Connect <span className="text-brand-primary text-lg">Lesotho</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-6">
              <Link to="/" className="text-sm font-semibold text-slate-600 transition-colors hover:text-brand-primary">Marketplace</Link>
              <Link to="/categories" className="text-sm font-semibold text-slate-600 transition-colors hover:text-brand-primary">Categories</Link>
              <Link to="/create-request" className="text-sm font-semibold text-slate-600 transition-colors hover:text-brand-primary">Post Request</Link>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search items, vendors, or requests..." 
                className="h-10 w-80 rounded-full border-none bg-slate-100 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-brand-primary sm:w-96"
              />
            </div>

            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-900">
                  <ShoppingBag size={22} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm">3</span>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="hidden text-right md:block">
                    <p className="text-xs font-bold text-slate-900">{user.displayName || 'Student'}</p>
                    <p className="text-[10px] text-slate-400 cursor-pointer hover:text-brand-primary" onClick={handleLogout}>Sign Out</p>
                  </div>
                  <Link to="/profile" className="h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-green-100 shadow-sm">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-bold text-brand-primary">
                        {user.displayName?.charAt(0) || 'U'}
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            ) : (
              <Link 
                to="/login"
                className="rounded-xl bg-brand-secondary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-green-100 transition-all hover:scale-[1.02] active:scale-95"
              >
                Sign In
              </Link>
            )}
            
            <button className="p-2 text-gray-600 md:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
