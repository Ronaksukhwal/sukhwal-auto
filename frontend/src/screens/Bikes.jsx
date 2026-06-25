import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, Info, Sparkles } from 'lucide-react';
import { GearCanvas } from '../components/ThreePartsCanvas';
import LiquidButton from '../components/LiquidButton';
import { API_URL } from '../config';


// Default list of bikes to ensure the dropdown is populated even if the API is offline
const LOCAL_BIKES_CATALOG = {
  "Legacy Classics (Hero Honda Era)": [
    {"id": "cd100", "name": "Hero Honda CD 100", "year": "1985 - 2004", "engine": "97.2 cc", "power": "7.5 bhp"},
    {"id": "sle1994", "name": "Hero Honda Splendor (Original)", "year": "1994 - 2004", "engine": "97.2 cc", "power": "7.4 bhp"},
    {"id": "cd_dawn", "name": "Hero Honda CD Dawn", "year": "2003 - 2015", "engine": "97.2 cc", "power": "7.7 bhp"},
    {"id": "cd_deluxe", "name": "Hero Honda CD Deluxe", "year": "2005 - 2013", "engine": "97.2 cc", "power": "7.7 bhp"},
    {"id": "passion_plus", "name": "Hero Honda Passion Plus", "year": "2003 - 2010", "engine": "97.2 cc", "power": "7.5 bhp"},
    {"id": "cbz", "name": "Hero Honda CBZ / CBZ Gold", "year": "1999 - 2010", "engine": "156.8 cc", "power": "12.8 bhp"},
    {"id": "hunk", "name": "Hero Honda Hunk", "year": "2007 - 2016", "engine": "149.2 cc", "power": "14.2 bhp"},
    {"id": "karizma_r", "name": "Hero Honda Karizma R", "year": "2003 - 2016", "engine": "223 cc", "power": "17 bhp"},
    {"id": "karizma_zmr", "name": "Hero Honda Karizma ZMR", "year": "2009 - 2019", "engine": "223 cc (Fuel Injected)", "power": "20 bhp"}
  ],
  "Modern Commuters (Hero Era)": [
    {"id": "splendor_plus", "name": "Hero Splendor Plus / XTEC", "year": "2004 - Present", "engine": "97.2 cc", "power": "7.91 bhp"},
    {"id": "passion_pro", "name": "Hero Passion Pro / XTEC", "year": "2010 - Present", "engine": "110 cc", "power": "9 bhp"},
    {"id": "hf_deluxe", "name": "Hero HF Deluxe / HF 100", "year": "2013 - Present", "engine": "97.2 cc", "power": "7.91 bhp"},
    {"id": "glamour", "name": "Hero Glamour / XTEC", "year": "2005 - Present", "engine": "124.7 cc", "power": "10.7 bhp"},
    {"id": "super_splendor", "name": "Hero Super Splendor", "year": "2005 - Present", "engine": "124.7 cc", "power": "10.7 bhp"}
  ],
  "Performance & Offroad": [
    {"id": "xpulse_200", "name": "Hero XPulse 200 4V / 2V", "year": "2019 - Present", "engine": "199.6 cc (Oil Cooled)", "power": "18.9 bhp"},
    {"id": "xpulse_200t", "name": "Hero XPulse 200T", "year": "2019 - Present", "engine": "199.6 cc", "power": "17.8 bhp"},
    {"id": "xtreme_160r", "name": "Hero Xtreme 160R 4V / 2V", "year": "2020 - Present", "engine": "163 cc", "power": "15 bhp"},
    {"id": "xtreme_125r", "name": "Hero Xtreme 125R", "year": "2024 - Present", "engine": "124.7 cc", "power": "11.4 bhp"},
    {"id": "karizma_xmr", "name": "Hero Karizma XMR", "year": "2023 - Present", "engine": "210 cc (Liquid Cooled)", "power": "25.15 bhp"}
  ],
  "Scooters": [
    {"id": "pleasure", "name": "Hero Pleasure Plus", "year": "2005 - Present", "engine": "110.9 cc", "power": "8 bhp"},
    {"id": "maestro", "name": "Hero Maestro Edge 125", "year": "2012 - Present", "engine": "124.6 cc", "power": "9 bhp"},
    {"id": "destini", "name": "Hero Destini 125", "year": "2018 - Present", "engine": "124.6 cc", "power": "9 bhp"},
    {"id": "zoom", "name": "Hero Zoom 110", "year": "2023 - Present", "engine": "110.9 cc", "power": "8.05 bhp"}
  ]
};

export default function Bikes({ setTab, setSelectedBikeModel }) {
  const [catalog, setCatalog] = useState(LOCAL_BIKES_CATALOG);
  const [activeCategory, setActiveCategory] = useState(Object.keys(LOCAL_BIKES_CATALOG)[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/bikes`)
      .then(res => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then(data => {
        setCatalog(data);
        setActiveCategory(prev => Object.keys(data).includes(prev) ? prev : Object.keys(data)[0]);
      })
      .catch(err => {
        console.warn("Backend API not reachable. Using local fallback catalog.", err);
      });
  }, []);

  const handleBookService = (bikeName) => {
    setSelectedBikeModel(bikeName);
    setTab('book');
  };

  const categories = Object.keys(catalog);

  return (
    <motion.div 
      className="page-container tech-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header section with split layout including the 3D rotating gear */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem', 
          alignItems: 'center', 
          marginBottom: '3rem' 
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div className="brand-badge">
            <Sparkles size={14} /> Official Directory
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
            Hero & Hero Honda <span style={{ color: 'var(--primary)' }}>Specialty Catalog</span>
          </h1>
          <p style={{ color: 'var(--text-gray)', lineHeight: '1.6' }}>
            We possess custom-calibrated diagnostic rigs and official engine timing tools for the entire production history of Hero Honda (1984-2011) and Hero MotoCorp (2011-Present). Select your model below to begin booking.
          </p>
        </div>

        {/* Embedded 3D Gear Sprocket canvas */}
        <div 
          className="glass-panel" 
          style={{ 
            maxWidth: '350px', 
            margin: '0 auto', 
            padding: '0.5rem', 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,248,249,0.85) 100%)',
            border: '1px solid rgba(233,30,99,0.08)'
          }}
        >
          <GearCanvas />
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', paddingBottom: '0.4rem' }}>
            Interactive 3D O.E.M. Gear sprocket
          </div>
        </div>
      </div>

      {/* Categories Horizontal Tabs */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '0.8rem', 
        flexWrap: 'wrap', 
        marginBottom: '3rem',
        padding: '0.5rem',
        background: 'rgba(233, 30, 99, 0.03)',
        borderRadius: '35px',
        maxWidth: '900px',
        margin: '0 auto 3rem auto',
        border: '1px solid rgba(233,30,99,0.08)'
      }}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid of Bikes */}
      <div style={{ position: 'relative', minHeight: '350px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <div style={{ border: '3px solid rgba(233,30,99,0.1)', borderTop: '3px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', animation: 'spin 1s linear infinite' }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <motion.div 
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.8rem'
            }}
          >
            <AnimatePresence mode="popLayout">
              {catalog[activeCategory]?.map((bike) => (
                <motion.div
                  key={bike.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel glow-hover"
                  style={{
                    padding: '1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: '#ffffff',
                    border: '1px solid rgba(233,30,99,0.08)',
                    minHeight: '280px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', fontWeight: '800', fontFamily: 'var(--font-display)', lineHeight: '1.3' }}>
                        {bike.name}
                      </h3>
                      <ShieldCheck color="var(--primary)" size={20} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-gray)' }}>
                        <Calendar size={14} color="var(--primary)" />
                        <span>Years: {bike.year}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-gray)' }}>
                        <Info size={14} color="var(--primary)" />
                        <span>Engine: {bike.engine}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-gray)' }}>
                        <Info size={14} color="var(--primary)" />
                        <span>Power Output: {bike.power}</span>
                      </div>
                    </div>
                  </div>

                  {/* Centered gooey LiquidButton for clean look */}
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <LiquidButton onClick={() => handleBookService(bike.name)}>
                      BOOK SERVICE
                    </LiquidButton>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Bottom Specialty Info Callout */}
      <div style={{ 
        marginTop: '4rem', 
        padding: '2rem', 
        borderRadius: '16px', 
        background: 'linear-gradient(90deg, rgba(233,30,99,0.06) 0%, rgba(255,255,255,0) 100%)',
        border: '1px solid rgba(233,30,99,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ background: 'rgba(233,30,99,0.08)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ShieldCheck color="var(--primary)" size={30} />
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <h4 style={{ color: 'var(--text-heading)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>Hero MotoCorp Factory Diagnostic Protocols</h4>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', lineHeight: '1.5' }}>
            We do not use generic multi-brand scanners. We utilize specialized Hero OBD scanners, digital carburetor synchronizers, and official valve feeler gauges to maintain the high fuel economy of your commuter engine.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
