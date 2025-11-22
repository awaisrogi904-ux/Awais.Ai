import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Generator } from './pages/Generator';
import { Payment } from './pages/Payment';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Guest User',
    email: 'user@example.com',
    credits: 25 // 25 free credits on signup
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const deductCredit = (amount: number) => {
    setUser(prev => ({ ...prev, credits: Math.max(0, prev.credits - amount) }));
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-zinc-700 selection:text-white">
        <Navbar user={user} toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route 
            path="/generate" 
            element={<Generator credits={user.credits} deductCredit={deductCredit} />} 
          />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="border-t border-zinc-900 py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-zinc-600 text-sm">
                    © {new Date().getFullYear()} YBT AI Images. Powered by Gemini 2.5 Flash.
                </p>
                <p className="text-zinc-700 text-xs mt-2">Awais❤️‍🩹 - Privacy First AI</p>
            </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;