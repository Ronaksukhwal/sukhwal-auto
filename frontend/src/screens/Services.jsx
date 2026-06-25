import React from 'react';
import { motion } from 'framer-motion';
import { Check, Flame, Shield, HelpCircle, Wrench, Settings } from 'lucide-react';
import { SpringCanvas } from '../components/ThreePartsCanvas';
import LiquidButton from '../components/LiquidButton';

export default function Services({ setTab, setSelectedServiceType }) {
  const servicePackages = [
    {
      id: "commuter_pack",
      name: "Commuter Essential Care",
      subtitle: "Tailored for Splendor, CD100, Passion & HF Deluxe",
      price: "₹399",
      period: "+ Parts cost",
      features: [
        "10W-30 Premium Engine Oil replacement",
        "Carburetor clean & jet calibration",
        "Spark plug gap check & cleaning",
        "Front & Rear brake shoe adjustment",
        "Drive chain tensioning & wet lube",
        "Air filter cleaning / replacement check",
        "Water wash & liquid wax polish"
      ],
      icon: Settings,
      recommended: true
    },
    {
      id: "overhaul_pack",
      name: "Major Performance Overhaul",
      subtitle: "Full restoration for all Hero Honda & Hero models",
      price: "₹999",
      period: "+ Parts cost",
      features: [
        "Everything in Essential Care package",
        "Valve clearance (tappet) calibration",
        "Clutch assembly & plates servicing",
        "Front fork alignment & play check",
        "Wheel bearing cleaning & greasing",
        "Carbon clean & spark plug replacement",
        "Full electrical harness & battery test"
      ],
      icon: Wrench,
      recommended: false
    },
    {
      id: "performance_pack",
      name: "Premium Xtreme & XPulse Tech",
      subtitle: "Specially calibrated for XPulse, Xtreme & Karizma",
      price: "₹1,299",
      period: "+ Parts cost",
      features: [
        "Fuel Injector cleaning & pressure test",
        "FastAPI / OBD ECU code diagnostic scan",
        "Front & Rear hydraulic disc brake bleed",
        "Rear Monoshock sag & damping setup",
        "Coolant top-up (for liquid cooled)",
        "O-ring chain degrease and high-speed lube",
        "Digital sensor diagnostic report"
      ],
      icon: Flame,
      recommended: false
    }
  ];

  const handleBook = (pkgName) => {
    setSelectedServiceType(pkgName);
    setTab('book');
  };

  return (
    <motion.div 
      className="page-container tech-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header section with split layout including the 3D spring coil */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2.5rem', 
          alignItems: 'center', 
          marginBottom: '3rem' 
        }}
      >
        <div style={{ textAlign: 'left' }}>
          <div className="brand-badge">
            <Shield size={14} /> Certified Menu
          </div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
            Hero Specialized <span style={{ color: 'var(--primary)' }}>Service Packages</span>
          </h1>
          <p style={{ color: 'var(--text-gray)', lineHeight: '1.6' }}>
            Select the ideal care package for your bike. We tune old workhorses to run like new and calibrate modern tourers for the highway. Certified mechanical tools used for every assembly.
          </p>
        </div>

        {/* Embedded 3D Suspension Spring Canvas */}
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
          <SpringCanvas />
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', paddingBottom: '0.4rem' }}>
            Interactive 3D O.E.M. Suspension Coil
          </div>
        </div>
      </div>

      {/* Service Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2rem',
        alignItems: 'stretch'
      }}>
        {servicePackages.map((pkg) => {
          const PkgIcon = pkg.icon;
          return (
            <motion.div
              key={pkg.id}
              whileHover={{ y: -8 }}
              className="glass-panel"
              style={{
                padding: '2.5rem 2rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#ffffff',
                border: pkg.recommended 
                  ? '2px solid var(--primary)' 
                  : '1px solid rgba(233,30,99,0.1)',
                boxShadow: pkg.recommended 
                  ? '0 15px 35px rgba(233,30,99,0.07)' 
                  : 'var(--card-shadow)'
              }}
            >
              {pkg.recommended && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '24px',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: '800',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 10px rgba(233,30,99,0.2)'
                }}>
                  RECOMMENDED
                </div>
              )}

              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ 
                    background: pkg.recommended ? 'rgba(233,30,99,0.08)' : 'rgba(0,0,0,0.02)', 
                    width: '46px', 
                    height: '46px', 
                    borderRadius: '10px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <PkgIcon color={pkg.recommended ? "var(--primary)" : "var(--text-heading)"} size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', fontWeight: '800' }}>{pkg.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{pkg.subtitle}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--text-heading)', fontFamily: 'var(--font-display)' }}>
                    {pkg.price}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '600' }}>
                    {pkg.period}
                  </span>
                </div>

                <div style={{ height: '1px', backgroundColor: 'rgba(233,30,99,0.08)', marginBottom: '1.5rem' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <Check color="var(--primary)" size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-gray)', lineHeight: '1.4' }}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Liquid gooey button select action */}
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <LiquidButton onClick={() => handleBook(pkg.name)}>
                  SELECT PACKAGE
                </LiquidButton>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Works FAQ banner */}
      <div 
        className="glass-panel" 
        style={{ 
          marginTop: '3.5rem', 
          padding: '2rem', 
          background: '#ffffff',
          border: '1px solid rgba(233,30,99,0.08)',
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <div style={{ background: 'rgba(233,30,99,0.05)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <HelpCircle color="var(--primary)" size={24} />
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <h4 style={{ color: 'var(--text-heading)', fontSize: '1.05rem', marginBottom: '0.2rem' }}>Need specialized repairs (Clutch, Gearbox, Wiring, Crankshaft)?</h4>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', lineHeight: '1.5' }}>
            We perform custom internal engine rebuilds, bore sleeve replacements, original wiring harness replacements, and frame checks. Gopal Sukhwal will supply a detailed quote after inspecting the vehicle.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
