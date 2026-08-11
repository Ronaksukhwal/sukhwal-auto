import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Bike, ShieldCheck, CalendarRange, Phone, Settings, Info, Menu, X } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home', icon: Wrench },
    { path: '/hero-bikes', label: 'Hero Bikes', icon: Bike },
    { path: '/genuine-parts', label: 'Genuine Parts', icon: ShieldCheck },
    { path: '/services', label: 'Services', icon: Settings },
    { path: '/book-service', label: 'Book Service', icon: CalendarRange },
    { path: '/about-us', label: 'About Us', icon: Info },
    { path: '/contact-us', label: 'Contact Us', icon: Phone }
  ];

  const handleNavClick = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
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
          onClick={() => handleNavClick('/')}
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
          <img 
            src={logoImg} 
            alt="Sukhwal Auto Services Logo" 
            style={{ 
              width: '72px', 
              height: '62px', 
              borderRadius: '8px', 
              objectFit: 'cover',
              border: '1px solid rgba(233, 30, 99, 0.12)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }} 
          />
          <span>SUKHWAL <span style={{ color: 'var(--primary)' }}>AUTO SERVICES</span></span>
        </div>

        {/* Desktop Nav Links */}
        <div style={{ display: 'none', gap: '1.2rem', alignItems: 'center' }} className="desktop-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? 'var(--primary)' : 'var(--text-heading)',
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
                {isActive && (
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
            );
          })}
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
              const isActive = location.pathname === item.path;
              return (
                <div
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(233, 30, 99, 0.08)' : 'transparent',
                    borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-gray)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    fontWeight: '700',
                    transition: 'all 0.2s'
                  }}
                >
                  <ItemIcon size={18} color={isActive ? 'var(--primary)' : 'var(--text-gray)'} />
                  {item.label}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
