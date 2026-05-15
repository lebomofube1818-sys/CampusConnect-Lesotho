import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Auth from './pages/Auth';
import CreateRequest from './pages/CreateRequest';
import { useAuthStore } from './store/authStore';

export default function App() {
  const { loading } = useAuthStore();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-bg-main font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-brand-primary"></div>
          <p className="text-sm font-bold tracking-tight text-slate-500">Wait while Campus Connect loads...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-bg-main">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            <Route path="/create-request" element={<CreateRequest />} />
            {/* Future routes will go here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
