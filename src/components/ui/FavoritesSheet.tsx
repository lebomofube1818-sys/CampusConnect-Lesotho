import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Store, Trash2, ArrowRight, Star } from 'lucide-react';
import { useFavoritesStore } from '../../store/favoritesStore';

const FavoritesSheet: React.FC = () => {
  const { favorites, isOpen, setIsOpen, toggleFavorite } = useFavoritesStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-[101] flex h-full w-full flex-col bg-white shadow-2xl sm:max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50 text-pink-500">
                  <Heart size={20} fill="currentColor" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">Your Favorites</h2>
                  <p className="text-xs font-bold text-slate-400">{favorites.length} {favorites.length === 1 ? 'vendor' : 'vendors'} saved</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {favorites.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-200">
                    <Heart size={40} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">No favorites yet</h3>
                  <p className="mt-2 max-w-[200px] text-sm font-medium text-slate-400">
                    Save the vendors you love to find them easily later.
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-8 rounded-2xl bg-brand-primary px-8 py-4 text-sm font-black text-white transition-all hover:bg-green-600 active:scale-95"
                  >
                    Explore Vendors
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {favorites.map((vendor) => (
                    <motion.div
                      layout
                      key={vendor.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex gap-4 rounded-3xl border border-slate-50 p-3 transition-colors hover:bg-slate-50"
                    >
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-sm font-black text-slate-900">{vendor.name}</h4>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{vendor.category}</p>
                          </div>
                          <button
                            onClick={() => toggleFavorite(vendor)}
                            className="text-slate-300 transition-colors hover:text-rose-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star size={12} fill="currentColor" />
                            <span className="text-xs font-black">{vendor.rating}</span>
                          </div>
                          <button className="text-xs font-black text-brand-primary flex items-center gap-1 hover:underline">
                            Store <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {favorites.length > 0 && (
              <div className="border-t border-slate-100 bg-slate-50/50 p-6">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-3 rounded-[1.5rem] bg-slate-900 py-5 text-sm font-black text-white transition-all hover:bg-slate-800 active:scale-95"
                >
                  Close Favorites
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FavoritesSheet;
