import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Bike, ShieldCheck, CalendarRange, Phone, Settings, Info, Menu, X } from 'lucide-react';
import logoImg from './assets/logo.jpg';

// Screens
import Home from './screens/Home';
import Bikes from './screens/Bikes';
import GenuineParts from './screens/GenuineParts';
import Services from './screens/Services';
import BookService from './screens/BookService';
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';

export default function App() {
  const [tab, setTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Shared booking prefill state
  const [selectedBikeModel, setSelectedBikeModel] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');

  const navigateToTab = (tabName) => {
    setTab(tabName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveScreen = () => {
    switch (tab) {
      case 'home':
        return <Home setTab={navigateToTab} />;
      case 'bikes':
        return (
          <Bikes 
            setTab={navigateToTab} 
            setSelectedBikeModel={setSelectedBikeModel} 
          />
        );
      case 'parts':
        return <GenuineParts />;
      case 'services':
        return (
          <Services 
            setTab={navigateToTab} 
            setSelectedServiceType={setSelectedServiceType} 
          />
        );
      case 'book':
        return (
          <BookService 
            selectedBikeModel={selectedBikeModel} 
            setSelectedBikeModel={setSelectedBikeModel}
            selectedServiceType={selectedServiceType} 
            setSelectedServiceType={setSelectedServiceType}
          />
        );
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      default:
        return <Home setTab={navigateToTab} />;
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Wrench },
    { id: 'bikes', label: 'Hero Bikes', icon: Bike },
    { id: 'parts', label: 'Genuine Parts', icon: ShieldCheck },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'book', label: 'Book Service', icon: CalendarRange },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact Us', icon: Phone }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-black)' }}>
      
      {/* Hidden SVG filter for Gooey Liquid Buttons */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }} width="0" height="0">
        <defs>
          <filter id="gooey-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Navigation Header */}
      <nav 
        className="glass-panel" 
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: '80px', 
          zIndex: 1000, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '0 5%',
          borderRadius: 0,
          borderBottom: '1px solid rgba(233, 30, 99, 0.15)',
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)'
        }}
      >
        {/* Logo */}
        <div 
          onClick={() => navigateToTab('home')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem', 
            cursor: 'pointer',
            fontFamily: 'var(--font-display)',
            fontWeight: '950',
            fontSize: '1.3rem',
            letterSpacing: '0.01em',
            color: 'var(--text-heading)'
          }}
        >
          <img src={logoImg} alt="Sukhwal Auto Services Logo" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'contain' }} />
          <span>SUKHWAL <span style={{ color: 'var(--primary)' }}>AUTO SERVICES</span></span>
        </div>

        {/* Desktop Nav Links (Sleek, Compact Text Menu with Slide Indicators) */}
        <div style={{ display: 'none', gap: '1.2rem', alignItems: 'center' }} className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigateToTab(item.id)}
              className={`nav-link-btn ${tab === item.id ? 'active' : ''}`}
              style={{
                background: 'transparent',
                border: 'none',
                color: tab === item.id ? 'var(--primary)' : 'var(--text-heading)',
                fontFamily: 'var(--font-display)',
                fontWeight: '800',
                fontSize: '0.92rem',
                cursor: 'pointer',
                position: 'relative',
                padding: '6px 4px',
                transition: 'color 0.3s ease',
                outline: 'none'
              }}
            >
              {item.label}
              {tab === item.id && (
                <motion.div 
                  layoutId="activeNavIndicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--primary)',
                    borderRadius: '2px'
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-heading)',
            cursor: 'pointer',
            padding: '8px'
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Style helper for responsive nav show/hide */}
        <style>{`
          .mobile-toggle { display: flex !important; }
          .desktop-nav { display: none !important; }
          @media (min-width: 1024px) {
            .desktop-nav { display: flex !important; }
            .mobile-toggle { display: none !important; }
          }
        `}</style>
      </nav>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              background: 'rgba(255, 253, 245, 0.98)',
              borderBottom: '1px solid rgba(233, 30, 99, 0.15)',
              zIndex: 999,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
            }}
          >
            {navItems.map((item) => {
              const ItemIcon = item.icon;
              const isSelected = tab === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => navigateToTab(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(233, 30, 99, 0.08)' : 'transparent',
                    borderLeft: isSelected ? '4px solid var(--primary)' : '4px solid transparent',
                    color: isSelected ? 'var(--primary)' : 'var(--text-gray)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '700',
                    transition: 'all 0.2s'
                  }}
                >
                  <ItemIcon size={18} color={isSelected ? 'var(--primary)' : 'var(--text-gray)'} />
                  {item.label}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginTop: '80px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer 
        style={{ 
          borderTop: '1px solid rgba(233, 30, 99, 0.15)', 
          padding: '2.5rem 5%', 
          background: '#fffdf5',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
          fontSize: '0.88rem',
          color: 'var(--text-gray)',
          fontWeight: '600'
        }}
      >
        <div>
          <div style={{ color: 'var(--text-heading)', fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.25rem' }}>
            Sukhwal Auto Services
          </div>
          <div>Owner: <strong>Gopal Sukhwal</strong> | Shop no. 2, near TB Hospital, Manikya Nagar, Bhilwara (311001)</div>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>© {new Date().getFullYear()} Sukhwal Auto. All Rights Reserved.</div>
          <div style={{ color: 'var(--primary)', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} /> 100% Genuine Hero Parts
          </div>
        </div>
      </footer>
    </div>
  );
}
