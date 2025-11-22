import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, CreditCard, Zap, Menu, X } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ user, toggleMenu, isMenuOpen }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path ? "text-white" : "text-zinc-400 hover:text-white";

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white to-zinc-500 flex items-center justify-center shadow-lg shadow-white/5 group-hover:shadow-white/10 transition-all">
                <Sparkles className="w-5 h-5 text-zinc-950" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                YBT<span className="text-zinc-500 font-light">Images</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/generate" className={`text-sm font-medium transition-colors ${isActive('/generate')}`}>Generator</Link>
            <Link to="/payment" className={`text-sm font-medium transition-colors ${isActive('/payment')}`}>Buy Credits</Link>
          </div>

          {/* User Credits / Auth */}
          <div className="hidden md:flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-mono text-zinc-300">{user.credits} Credits</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 border border-zinc-700">
              {user.name.charAt(0)}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-zinc-400 hover:text-white p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900">Home</Link>
            <Link to="/generate" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900">Generator</Link>
            <Link to="/payment" onClick={toggleMenu} className="block px-3 py-2 rounded-md text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-900">Buy Credits</Link>
            <div className="mt-4 px-3 flex items-center justify-between text-zinc-400">
              <span>Available Credits:</span>
              <span className="text-white font-mono font-bold">{user.credits}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};