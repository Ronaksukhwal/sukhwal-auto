import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Cpu, CheckCircle2, Box, ShieldCheck, AlertTriangle, Award, Check, X } from 'lucide-react';
import SEO from '../../components/seo/SEO';

import engineCrankcaseImg from '../../assets/engine_crankcase.jpg';
import partsPileImg from '../../assets/parts_pile.jpg';
import beltComponentImg from '../../assets/belt_component.jpg';
import oilyGearsImg from '../../assets/oily_gears.jpg';

const partsData = [
  {
    id: 0,
    name: "Genuine Engine Block Cutout",
    metric: "High-Compression Cylinder Sleeve & Piston",
    desc: "An inside view of the specialized Hero engine. Formulated to handle high heat cycles while maintaining excellent compression and fuel efficiency.",
    specs: "Bore Size: 50.0mm (Std) | Material: Cast Iron-Alloy | Coating: Moly Skirt",
    img: engineCrankcaseImg
  },
  {
    id: 1,
    name: "Genuine Speedometer Dashboard",
    metric: "Precision Instrument Cluster Assembly",
    desc: "Official Hero MotoCorp speedometer console surrounded by O.E.M. service components. Provides accurate speed, fuel level, and odometer readings.",
    specs: "Speed Range: 0-160 km/h | Input: Mechanical/Electronic Cable | Backlight: LED",
    img: partsPileImg
  },
  {
    id: 2,
    name: "Genuine Timing Chain Belt Kit",
    metric: "Anti-Wear Tensioner & Guide Track Assembly",
    desc: "Premium anti-wear timing chain system that links your crankshaft and camshaft in perfect synchronization. Prevents valve-piston collision.",
    specs: "Pitch: 1/4 inch | Link Count: 84 / 88 / 90 | Grade: Silent O.E.M.",
    img: beltComponentImg
  },
  {
    id: 3,
    name: "Genuine Gearbox Assembly Gears",
    metric: "Ground helical gear tooth wheels",
    desc: "Helical-ground transmission gear wheels built to minimize friction and prevent gear slip. Personal quality guarantee by Mr. Gopal Sukhwal.",
    specs: "Tooth Profile: Involute | Hardness: HRC 58-62 | Layout: Constant Mesh",
    img: oilyGearsImg
  }
];

export default function GenuineParts() {
  const [activePartId, setActivePartId] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const activePart = partsData.find(p => p.id === activePartId);

  return (
    <motion.div 
      className="page-container tech-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SEO 
        title="100% Genuine Hero MotoCorp Spares"
        description="We guarantee 100% authentic Hero MotoCorp and Hero Honda spare parts. No duplicate filters, replica cables, or fake brake pads. Full traceability to authorized distributors."
        keywords="Hero genuine parts Bhilwara, Hero MotoCorp spare parts, original Hero air filters, genuine bike brake pads, OEM Hero parts Rajasthan"
        canonical="https://sukhwalautoservice.in/genuine-parts"
      />
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="brand-badge">
          <Box size={14} /> 100% O.E.M. Quality Assurance
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
          Hero <span style={{ color: 'var(--primary)' }}>Genuine Parts</span> Policy
        </h1>
        <p style={{ color: 'var(--text-gray)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          Sukhwal Auto Services is built on absolute integrity. Directed by master mechanic <strong>Gopal Sukhwal</strong>, we strictly implement a zero-duplicate policy. We install only verified, original Hero MotoCorp spares to keep your motorcycle running in its native engineered form.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2.5rem', 
        alignItems: 'stretch',
        marginBottom: '3rem'
      }}>
        {/* Left Column: Interactive Image Viewer & Part Selector */}
        <div 
          className="glass-panel" 
          style={{ 
            padding: '1.5rem', 
            position: 'relative', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,240,242,0.95) 100%)',
            border: '1px solid rgba(233, 30, 99, 0.12)',
            minHeight: '450px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>O.E.M. Parts Showcase</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginBottom: '1.5rem' }}>Select a part to view its details and photo</p>
          </div>

          {/* Active Image Showcase */}
          <div style={{ 
            position: 'relative', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: 'var(--card-shadow)',
            border: '1px solid rgba(233,30,99,0.08)',
            background: '#ffffff',
            height: '280px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem'
          }}>
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={selectedPart.img} 
                alt={selectedPart.name} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </AnimatePresence>
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(26, 19, 21, 0.85)',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontFamily: 'monospace',
              padding: '4px 12px',
              borderRadius: '20px',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {selectedPart.metric}
            </div>
          </div>

          {/* Part Selection Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {partsData.map((part, idx) => (
              <button
                key={part.id}
                onClick={() => setSelectedIdx(idx)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  fontFamily: 'var(--font-display)',
                  transition: 'all 0.25s',
                  border: '1px solid ' + (selectedIdx === idx ? 'var(--primary)' : 'rgba(233, 30, 99, 0.15)'),
                  background: selectedIdx === idx ? 'var(--primary)' : 'transparent',
                  color: selectedIdx === idx ? '#ffffff' : 'var(--text-gray)',
                  boxShadow: selectedIdx === idx ? '0 4px 10px rgba(233,30,99,0.2)' : 'none'
                }}
              >
                {part.name.replace("Genuine ", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Specifications & Engineering */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Engineering Specifications Panel */}
          <div 
            className="glass-panel" 
            style={{ 
              padding: '2rem', 
              borderLeft: '4px solid var(--primary)', 
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              flex: 1
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <Cpu size={24} color="var(--primary)" />
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-heading)' }}>Engineering Specifications</h3>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPart.name}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
              >
                <h4 style={{ color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '0.2rem', fontWeight: '800' }}>
                  {selectedPart.name}
                </h4>
                <div style={{ 
                  fontSize: '0.8rem', 
                  color: 'var(--primary)', 
                  background: 'rgba(233, 30, 99, 0.06)',
                  border: '1px solid rgba(233, 30, 99, 0.15)',
                  padding: '4px 10px', 
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '0.8rem',
                  fontFamily: 'monospace',
                  fontWeight: '700'
                }}>
                  {selectedPart.metric}
                </div>
                
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
                  {selectedPart.desc}
                </p>
                
                <div style={{ 
                  padding: '0.8rem 1rem', 
                  background: 'rgba(233, 30, 99, 0.02)', 
                  borderRadius: '8px', 
                  border: '1px solid rgba(233, 30, 99, 0.08)',
                  fontSize: '0.85rem',
                  color: 'var(--text-white)',
                  fontFamily: 'monospace',
                  lineHeight: '1.4'
                }}>
                  <strong style={{ color: 'var(--primary)' }}>TOLERANCES & DATA:</strong> <span style={{ color: 'var(--text-gray)' }}>{selectedPart.specs}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Guarantee Panel */}
          <div style={{ 
            background: 'rgba(233,30,99,0.04)', 
            border: '1px solid rgba(233,30,99,0.18)', 
            padding: '1.25rem', 
            borderRadius: '12px',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <ShieldCheck color="var(--primary)" size={32} style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)', lineHeight: '1.5' }}>
              <strong>GOPAL SUKHWAL'S PROMISE:</strong> We refuse to compromise your safety. Under no circumstances will we install replica cables, duplicate filters, or counterfeit brake components. Every single spare has full traceability to official Hero MotoCorp distributors.
            </p>
          </div>
        </div>
      </div>

      {/* O.E.M. Integrity and Verification Section */}
      <div className="glass-panel" style={{ padding: '2.5rem 2rem', background: '#ffffff', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Award color="var(--primary)" size={28} /> Our Strict Spare Parts Verification Standard
        </h2>
        
        <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
          In the Indian automotive market, lookalike spare parts are extremely common. To combat this, we have developed a strict three-tier verification process for every piece that enters our workshop.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          <div style={{ background: 'rgba(233,30,99,0.02)', border: '1px solid rgba(233,30,99,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 color="var(--primary)" size={16} /> 1. Hologram Scratch Verification
            </h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: '1.5' }}>
              Every genuine Hero box carries a 3D security hologram. We check the visual authenticity and scan the unique QR scratch-off code on the official portal before placing it on your bike.
            </p>
          </div>

          <div style={{ background: 'rgba(233,30,99,0.02)', border: '1px solid rgba(233,30,99,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 color="var(--primary)" size={16} /> 2. Sealed Box Unboxing
            </h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: '1.5' }}>
              Parts are kept sealed in their O.E.M. packaging until your service is initiated. Customers are welcome to inspect the packaging and hologram, or we can share unboxing videos for doorstep pickups.
            </p>
          </div>

          <div style={{ background: 'rgba(233,30,99,0.02)', border: '1px solid rgba(233,30,99,0.06)', padding: '1.5rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 color="var(--primary)" size={16} /> 3. Official Part ID Billing
            </h4>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.82rem', lineHeight: '1.5' }}>
              We record the exact Hero part number (e.g. 12200-GB4-000, 24301-GB4-770) on your service invoice. This guarantees transparent, correct pricing matching the Hero MotoCorp MRP list.
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="glass-panel" style={{ padding: '2.5rem 2rem', background: '#ffffff', overflow: 'hidden' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertTriangle color="var(--primary)" size={26} /> Genuine Spares vs. Cheap Duplicates
        </h2>
        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: '1.5' }}>
          Installing replica parts might save a few rupees upfront, but it results in engine damage, poor fuel economy, and safety hazards. See how duplicates compare:
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(233,30,99,0.15)', background: 'rgba(233,30,99,0.03)' }}>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-heading)' }}>Spare Part Type</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--primary)' }}>Original Hero O.E.M. Parts</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: '#b37400' }}>Common Duplicate Spares</th>
                <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-heading)' }}>Impact on Motorcycle</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(233,30,99,0.06)' }} className="table-row">
                <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-heading)' }}>Engine Air Filter</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2e7d32', fontWeight: '700' }}><Check size={14} /> High-Density Resin Paper</span>
                  <br />Catches 99.8% of micro-dust particles.
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#c62828', fontWeight: '700' }}><X size={14} /> Thin Foam / Coarse Paper</span>
                  <br />Allows fine dust to bypass.
                </td>
                <td style={{ padding: '14px 16px', color: '#c62828', fontWeight: '600' }}>Dust scratches cylinder wall, causing compression loss & smoke.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(233,30,99,0.06)' }} className="table-row">
                <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-heading)' }}>Brake Shoes / Pads</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2e7d32', fontWeight: '700' }}><Check size={14} /> Kevlar-Organic Compound</span>
                  <br />Smooth heat dissipation, no brake fading.
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#c62828', fontWeight: '700' }}><X size={14} /> Asbestos / Metal Scrap</span>
                  <br />Harsh braking profile, high noise.
                </td>
                <td style={{ padding: '14px 16px', color: '#c62828', fontWeight: '600' }}>Wears down brake drums & discs, causing sudden brake failure.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(233,30,99,0.06)' }} className="table-row">
                <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-heading)' }}>Spark Plug</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2e7d32', fontWeight: '700' }}><Check size={14} /> Copper Core with Resistor</span>
                  <br />Stable spark, resists electrical noise.
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#c62828', fontWeight: '700' }}><X size={14} /> Plain Metal / No Resistor</span>
                  <br />Uncontrolled spark timing.
                </td>
                <td style={{ padding: '14px 16px', color: '#c62828', fontWeight: '600' }}>Causes engine knocking, misfire, and burns out CDI ignition coil.</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(233,30,99,0.06)' }} className="table-row">
                <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-heading)' }}>Engine Oil</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2e7d32', fontWeight: '700' }}><Check size={14} /> Hero 4T 10W-30 Premium</span>
                  <br />Maintains viscosity under heavy heat.
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#c62828', fontWeight: '700' }}><X size={14} /> Recycled / Drain Oil</span>
                  <br />Thins out completely when hot.
                </td>
                <td style={{ padding: '14px 16px', color: '#c62828', fontWeight: '600' }}>Destroys piston rings and triggers heavy clutch slip.</td>
              </tr>
              <tr style={{ borderBottom: 'none' }} className="table-row">
                <td style={{ padding: '14px 16px', fontWeight: '600', color: 'var(--text-heading)' }}>Clutch / Throttle Cables</td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#2e7d32', fontWeight: '700' }}><Check size={14} /> Teflon-Coated Inner Wire</span>
                  <br />Frictionless motion, zero stretching.
                </td>
                <td style={{ padding: '14px 16px', color: 'var(--text-gray)' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#c62828', fontWeight: '700' }}><X size={14} /> Plain Uncoated Steel</span>
                  <br />High friction, stretches quickly.
                </td>
                <td style={{ padding: '14px 16px', color: '#c62828', fontWeight: '600' }}>Stiff, heavy lever feel; snaps unexpectedly during riding.</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <style>{`
          .table-row {
            transition: background-color 0.2s ease;
          }
          .table-row:hover {
            background-color: rgba(233, 30, 99, 0.015);
          }
        `}</style>
      </div>
    </motion.div>
  );
}

