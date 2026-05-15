import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { AuthProvider } from './components/AuthProvider';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Auth from './pages/Auth';
import CreateRequest from './pages/CreateRequest';
import { useAuthStore } from './store/authStore';
import LoadingScreen from './components/ui/LoadingScreen';

export default function App() {
  const { loading } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-bg-main font-sans text-slate-900 selection:bg-brand-primary/10 selection:text-brand-primary">
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loading" />
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Navbar />
              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/register" element={<Auth />} />
                  <Route path="/create-request" element={<CreateRequest />} />
                </Routes>
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}
