import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, ShieldCheck, MapPin, Award, Navigation, Flame, Clock } from 'lucide-react';
import LiquidButton from '../components/LiquidButton';
import shopFrontImg from '../assets/shop_front.jpg';
import aiWorkshopImg from '../assets/ai_workshop_front.png';


export default function Home({ setTab }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <motion.div 
      className="page-container tech-grid"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
        
        {/* Left Column: Title and details */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <motion.div variants={itemVariants} className="brand-badge">
            <Flame size={14} className="animate-pulse" /> Specialized Workshop
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            style={{ 
              fontSize: 'clamp(2.3rem, 4.5vw, 4rem)', 
              lineHeight: '1.15',
              color: 'var(--text-heading)',
              marginBottom: '1.5rem'
            }}
          >
            Sukhwal <span style={{ color: 'var(--primary)' }}>Auto Services</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            style={{ 
              fontSize: '1.05rem', 
              color: 'var(--text-gray)',
              fontWeight: '500',
              maxWidth: '600px',
              lineHeight: '1.6',
              marginBottom: '2.5rem'
            }}
          >
            Bhilwara's premier specialized service hub dedicated <strong style={{ color: 'var(--text-heading)', fontWeight: '755' }}>exclusively to Hero Honda and Hero MotoCorp</strong> motorcycles. Directed by master mechanic <strong style={{ color: 'var(--text-heading)', fontWeight: '755' }}>Gopal Sukhwal</strong>. Engineered for reliability, built with 100% genuine parts.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <LiquidButton onClick={() => setTab('book')}>
              BOOK A SERVICE
            </LiquidButton>
            <button 
              onClick={() => setTab('parts')}
              style={{
                background: 'transparent',
                border: '2px solid var(--primary)',
                color: 'var(--primary-hover)',
                fontFamily: 'var(--font-display)',
                fontWeight: '800',
                padding: '14px 30px',
                borderRadius: '30px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              className="glow-hover"
            >
              EXPLORE GENUINE PARTS
            </button>
          </motion.div>
        </div>

        {/* Right Column: 3D Piston Widget + Workshop Promise Card */}
        <motion.div 
          variants={itemVariants}
          className="glass-panel"
          style={{
            position: 'relative',
            padding: '2rem',
            borderLeft: '4px solid var(--primary)',
            boxShadow: 'var(--card-shadow-hover)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,248,249,0.95) 100%)'
          }}
        >
          {/* Embedded 3D Engine Animation Video */}
          <div style={{ 
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '12px', 
            overflow: 'hidden',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid rgba(233,30,99,0.12)',
            position: 'relative'
          }}>
            <video
              src="/engine_animation.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-heading)' }}>Gopal Sukhwal's Promise</h3>
            <ShieldCheck color="var(--primary)" size={28} />
          </div>
          
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            At Sukhwal Auto, your bike receives certified service matching factory guidelines. We specialize in tuning both vintage Hero Honda (CD100, original Splendor) and state-of-the-art new Hero models (Xpulse, Karizma XMR).
          </p>

          <div style={{ height: '1px', backgroundColor: 'rgba(233,30,99,0.08)' }}></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
              <Award color="var(--primary)" size={16} />
              <span>Certified Expert Hero Honda Technicians</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
              <ShieldCheck color="var(--primary)" size={16} />
              <span>Only 100% Genuine Hero O.E.M. Parts Used</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem' }}>
              <MapPin color="var(--primary)" size={16} />
              <span>Doorstep Pickup & Drop Facility Across Bhilwara</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Physical Workshop Section */}
      <motion.div 
        variants={itemVariants}
        className="glass-panel responsive-grid-320 responsive-padding"
        style={{
          margin: '3rem 0 1rem 0',
          background: '#ffffff',
          border: '1px solid rgba(233,30,99,0.08)',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Left Side: Storefront Image (AI High-Tech Workshop Design) */}
        <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: 'var(--card-shadow)', border: '1px solid rgba(233,30,99,0.12)', background: '#ffffff', width: '100%' }}>
          <img 
            src={aiWorkshopImg} 
            alt="Sukhwal Auto Services High-Tech Workshop" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              objectFit: 'contain',
              display: 'block',
              transition: 'transform 0.5s ease'
            }}
            className="hover-zoom"
          />
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'var(--primary)',
            color: '#ffffff',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-display)',
            fontWeight: '800',
            padding: '4px 12px',
            borderRadius: '20px',
            letterSpacing: '0.05em',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            HIGH-TECH WORKSHOP
          </div>
          {/* Branded signage overlay banner */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '85%',
            background: 'rgba(49, 5, 11, 0.88)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(233, 30, 99, 0.2)',
            padding: '12px 16px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            pointerEvents: 'none'
          }}>
            <h4 style={{ 
              color: '#ffffff', 
              fontFamily: 'var(--font-display)', 
              fontWeight: '900', 
              fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              margin: 0
            }}>
              Sukhwal <span style={{ color: 'var(--secondary)' }}>Auto Services</span>
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.62rem', margin: '3px 0 0 0', fontFamily: 'var(--font-display)', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              High-Tech Workshop Outlet
            </p>
          </div>
          <style>{`
            .hover-zoom:hover {
              transform: scale(1.04);
            }
          `}</style>
        </div>

        {/* Right Side: Physical Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '0.3rem' }}>
              Our Bhilwara Workshop
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
              DIRECTED BY MASTER MECHANIC GOPAL SUKHWAL
            </p>
          </div>

          <p style={{ color: 'var(--text-gray)', fontSize: '0.92rem', lineHeight: '1.6' }}>
            Visit our physical workshop near the TB Hospital road in Bhilwara. We are fully equipped with official Hero MotoCorp engine timing extractors, digital carburetor synchronization rigs, and O.E.M. tools. Bring your motorcycle in for live diagnostics, transparent billing, and 100% genuine spares.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <MapPin color="var(--primary)" size={16} style={{ flexShrink: 0 }} />
              <span style={{ color: 'var(--text-gray)' }}><strong>Address:</strong> Shop no. 2, near TB Hospital, Manikya Nagar, Bhilwara (311001)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Clock color="var(--primary)" size={16} style={{ flexShrink: 0 }} />
              <span style={{ color: 'var(--text-gray)' }}><strong>Hours:</strong> Mon - Sat: 09:00 AM - 07:30 PM (Sunday Closed)</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
            <a 
              href="https://maps.app.goo.gl/fMkj48yBKgKGPyNy9" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                background: 'var(--primary)',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '0.85rem',
                textDecoration: 'none',
                textAlign: 'center',
                boxShadow: '0 4px 10px rgba(233,30,99,0.2)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.target.style.background = 'var(--primary-hover)'; }}
              onMouseLeave={(e) => { e.target.style.background = 'var(--primary)'; }}
            >
              GET DIRECTIONS ON GOOGLE MAPS
            </a>
          </div>
        </div>
      </motion.div>

      {/* Stats Counter Row */}
      <motion.div 
        variants={itemVariants}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          margin: '3rem 0',
          padding: '2rem',
          borderRadius: '16px',
          background: 'rgba(233,30,99,0.03)',
          border: '1px solid rgba(233,30,99,0.08)'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>25+</h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginTop: '0.25rem', fontWeight: '600' }}>Years of Service Legacy</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>15K+</h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginTop: '0.25rem', fontWeight: '600' }}>Hero Bikes Serviced</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>100%</h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginTop: '0.25rem', fontWeight: '600' }}>Hero Genuine Parts Policy</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>4.9★</h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginTop: '0.25rem', fontWeight: '600' }}>Customer Satisfaction Rating</p>
        </div>
      </motion.div>

      {/* Key Services Grid */}
      <div style={{ marginTop: '1rem' }}>
        <motion.h2 
          variants={itemVariants}
          style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2.5rem' }}
        >
          Why Choose <span style={{ color: 'var(--primary)' }}>Sukhwal Auto Services</span>?
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <motion.div 
            variants={itemVariants}
            className="glass-panel glow-hover"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#fff' }}
          >
            <div style={{ background: 'rgba(233,30,99,0.06)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Wrench color="var(--primary)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)' }}>Dedicated Engine Specialists</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Our mechanics are certified engine builders. From the iconic Hero Honda 97.2cc sloper engine to modern 4V motors, we restore factory specs.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="glass-panel glow-hover"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#fff' }}
          >
            <div style={{ background: 'rgba(233,30,99,0.06)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck color="var(--primary)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)' }}>No Duplicates. 100% Genuine.</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              We fit only verified O.E.M. parts sourced directly from Hero distributors. This guarantees engine life, structural safety, and high resale value.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="glass-panel glow-hover"
            style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#fff' }}
          >
            <div style={{ background: 'rgba(233,30,99,0.06)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Navigation color="var(--primary)" size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)' }}>Convenient Doorstep Pickup</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Busy schedule? We pick up your motorcycle from your home or office in Bhilwara and drop it back, complete with a digital service report.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
