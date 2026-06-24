import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, HeartHandshake, History } from 'lucide-react';
import { EngineAssemblyCanvas } from '../components/ThreePartsCanvas';
import gopalProfileImg from '../assets/gopal_profile.jpg';
import ronakProfileImg from '../assets/ronak_profile.jpg';
import deepakProfileImg from '../assets/deepak_profile.jpg';
import kaluProfileImg from '../assets/kalu_profile.jpg';
import narayanProfileImg from '../assets/narayan_profile.jpg';



export default function AboutUs() {
  return (
    <motion.div 
      className="page-container tech-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="brand-badge">
          <History size={14} /> Our Heritage
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
          Tuning Hero Bikes <span style={{ color: 'var(--primary)' }}>For Generations</span>
        </h1>
        <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Learn about our workshop's strict focus under Gopal Sukhwal, how we grew into Bhilwara's leading bike repair shop, and our commitment to pure engineering quality.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        
        {/* Left Column: Assembled Engine 3D Canvas */}
        <div 
          className="glass-panel text-center" 
          style={{ 
            padding: '2rem 1.5rem', 
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,248,249,0.95) 100%)',
            border: '1px solid rgba(233,30,99,0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: '420px'
          }}
        >
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-heading)', marginBottom: '0.5rem', fontWeight: '800' }}>
            Genuine Engine Assembly
          </h3>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', marginBottom: '1rem' }}>
            Drag left/right to orbit the O.E.M. engine core block setup
          </p>
          
          {/* Embedded assembled 3D mechanical engine core */}
          <div style={{ background: 'rgba(0,0,0,0.01)', borderRadius: '12px', overflow: 'hidden' }}>
            <EngineAssemblyCanvas />
          </div>
        </div>

        {/* Right Column: Story & Heritage */}
        <div className="glass-panel" style={{ padding: '2.5rem', background: '#ffffff', border: '1px solid rgba(233, 30, 99, 0.08)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', borderBottom: '1px solid rgba(233,30,99,0.08)', paddingBottom: '1rem' }}>
            <img 
              src={gopalProfileImg} 
              alt="Gopal Sukhwal Master Mechanic" 
              style={{ 
                width: '85px', 
                height: '85px', 
                borderRadius: '50%', 
                border: '3px solid var(--primary)',
                objectFit: 'cover',
                boxShadow: 'var(--card-shadow)'
              }} 
            />
            <div>
              <h2 style={{ color: 'var(--text-heading)', fontSize: '1.6rem', fontWeight: '800', margin: 0 }}>Gopal Sukhwal</h2>
              <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '750', fontFamily: 'var(--font-display)', margin: '4px 0 0 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                FOUNDER & MASTER MECHANIC
              </p>
            </div>
          </div>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Sukhwal Auto Services was established on <strong style={{ color: 'var(--text-heading)' }}>1 November 2000</strong> in Bhilwara with a singular mission: to provide dealership-grade servicing for Hero Honda and Hero MotoCorp motorcycles without the inflated prices and long wait times of dealer workshops.
          </p>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Directed by master mechanic <strong style={{ color: 'var(--text-heading)' }}>Mr. Gopal Sukhwal</strong>, who brings <strong style={{ color: 'var(--text-heading)' }}>over 40+ years of veteran engineering experience</strong> to the field, our workshop operates with absolute dedication. We work exclusively on Hero-family vehicles, meaning our technicians understand every bolt, timing chain tensioner, carburetor jet, and ECU mapping inside out.
          </p>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Whether you ride a vintage CD100 sloper, a mileage-king Splendor, or a modern XPulse 200 4V adventure bike, your machine is serviced directly under Mr. Sukhwal's personal quality control. This guarantees that your vehicle is calibrated exactly to its original factory parameters.
          </p>
        </div>
      </div>

      {/* Technicians Section */}
      <div style={{ marginTop: '4rem', textAlign: 'center' }}>
        <div className="brand-badge">
          <Sparkles size={14} /> Our Experts
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
          Our Expert <span style={{ color: 'var(--primary)' }}>Technician Team</span>
        </h2>
        <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
          Meet the skilled professionals who keep your Hero and Hero Honda motorcycles running like new.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              name: "Ronak Sukhwal",
              role: "Technician and Software Developer",
              image: ronakProfileImg
            },
            {
              name: "Technician Deepak",
              role: "Technician Senior",
              image: deepakProfileImg
            },
            {
              name: "Technician Kalu",
              role: "Technician Intermediate",
              image: kaluProfileImg
            },
            {
              name: "Technician Narayan",
              role: "Junior Technician",
              image: narayanProfileImg
            }
          ].map((tech, idx) => (
            <motion.div 
              key={idx}
              className="glass-panel glow-hover"
              style={{
                padding: '2.5rem 1.5rem',
                background: '#ffffff',
                border: '1px solid rgba(233,30,99,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: '16px'
              }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src={tech.image} 
                alt={tech.name} 
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  border: '3px solid var(--primary)',
                  objectFit: 'cover',
                  marginBottom: '1.25rem',
                  boxShadow: 'var(--card-shadow)'
                }} 
              />
              <h3 style={{ color: 'var(--text-heading)', fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.4rem' }}>
                {tech.name}
              </h3>
              <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '750', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                {tech.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Values Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: '#ffffff', border: '1px solid rgba(233,30,99,0.08)' }}>
          <div style={{ background: 'rgba(233,30,99,0.06)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Shield color="var(--primary)" size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-heading)', fontSize: '1.15rem', marginBottom: '0.4rem', fontWeight: '800' }}>Dealer-Grade Tooling</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              We invest in official Hero engine pullers, diagnostic systems, timing chain aligners, and dial indicators. Your bike never suffers hammer-and-chisel repairs.
            </p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: '#ffffff', border: '1px solid rgba(233,30,99,0.08)' }}>
          <div style={{ background: 'rgba(233,30,99,0.06)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles color="var(--primary)" size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-heading)', fontSize: '1.15rem', marginBottom: '0.4rem', fontWeight: '800' }}>Zero Fake Spares</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              We believe duplicate spares are a safety hazard. That is why we refuse to fit cheaper, unauthorized parts. Every oil filter, gasket, and wire comes direct from Hero parts distributors.
            </p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: '#ffffff', border: '1px solid rgba(233,30,99,0.08)' }}>
          <div style={{ background: 'rgba(233,30,99,0.06)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <HeartHandshake color="var(--primary)" size={24} />
          </div>
          <div>
            <h3 style={{ color: 'var(--text-heading)', fontSize: '1.15rem', marginBottom: '0.4rem', fontWeight: '800' }}>Honest & Transparent</h3>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              No hidden costs. We consult you via call or photo approval if we discover any additional parts that need replacement. You pay exactly what was quoted.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
