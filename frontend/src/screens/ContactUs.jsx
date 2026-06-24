import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { BrakeDiscCanvas } from '../components/ThreePartsCanvas';
import LiquidButton from '../components/LiquidButton';
import { API_URL } from '../config';


export default function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    
    setSubmitting(true);
    setError('');

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    };

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to send inquiry. Please try again.');
      }

      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err.message || 'Server connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="page-container tech-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="brand-badge">
          <Phone size={14} /> Connect With Us
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
          Contact <span style={{ color: 'var(--primary)' }}>Sukhwal Auto Services</span>
        </h1>
        <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Have a question about engine tuning or spare parts availability? Reach out to us or locate Gopal Sukhwal's workshop in Bhilwara.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        
        {/* Left Column: Details, Map & 3D Brake Disc */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Quick Info Box */}
          <div className="glass-panel" style={{ padding: '2rem', background: '#ffffff', border: '1px solid rgba(233,30,99,0.08)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h3 style={{ color: 'var(--text-heading)', fontSize: '1.3rem', borderBottom: '1px solid rgba(233,30,99,0.08)', paddingBottom: '0.75rem', fontWeight: '800' }}>Workshop Details</h3>
            
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <MapPin color="var(--primary)" size={20} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', fontWeight: '600' }}>Address</div>
                <div style={{ color: 'var(--text-white)', fontSize: '0.9rem', fontWeight: '700' }}>Shop no. 2, Near TB Hospital, Manikya Nagar, Bhilwara, Rajasthan (311001)</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <Phone color="var(--primary)" size={20} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', fontWeight: '600' }}>Phone / Support</div>
                <div style={{ color: 'var(--text-white)', fontSize: '0.9rem', fontWeight: '700' }}>+91 94137 57303 / +91 94615 24500</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <Mail color="var(--primary)" size={20} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', fontWeight: '600' }}>Email Address</div>
                <div style={{ color: 'var(--text-white)', fontSize: '0.9rem', fontWeight: '700' }}>ronaksukhwal5@gmail.com</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <Clock color="var(--primary)" size={20} style={{ flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)', fontWeight: '600' }}>Business Hours</div>
                <div style={{ color: 'var(--text-white)', fontSize: '0.9rem', fontWeight: '700' }}>Monday - Saturday: 09:00 AM - 07:30 PM (Sunday Closed)</div>
              </div>
            </div>
          </div>

          {/* 3D Brake Disc Widget Card */}
          <div 
            className="glass-panel text-center" 
            style={{ 
              padding: '1.25rem', 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,248,249,0.95) 100%)',
              border: '1px solid rgba(233,30,99,0.08)' 
            }}
          >
            <h4 style={{ color: 'var(--text-heading)', fontSize: '1rem', fontWeight: '800', marginBottom: '0.3rem' }}>
              Genuine Disc Braking
            </h4>
            <div style={{ background: 'rgba(0,0,0,0.01)', borderRadius: '10px', overflow: 'hidden' }}>
              <BrakeDiscCanvas />
            </div>
            <p style={{ color: 'var(--text-gray)', fontSize: '0.75rem', marginTop: '0.4rem' }}>
              Click and drag the 3D ventilated steel rotor above. We install only O.E.M. heat-treated rotors.
            </p>
          </div>

          {/* Interactive Map Simulation */}
          <div className="glass-panel" style={{ padding: '1.5rem', background: '#ffffff', border: '1px solid rgba(233,30,99,0.08)', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ color: 'var(--text-heading)', fontSize: '1rem', marginBottom: '0.2rem', fontWeight: '800' }}>Navigate to Shop</h4>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.75rem' }}>Map view near TB Hospital, Bhilwara</p>
            </div>
            
            <div style={{ 
              height: '110px', 
              background: 'radial-gradient(circle at 70% 30%, rgba(233,30,99,0.15) 0%, transparent 60%), repeating-linear-gradient(45deg, rgba(233,30,99,0.01) 0px, rgba(233,30,99,0.01) 2px, transparent 2px, transparent 10px)',
              border: '1px solid rgba(233,30,99,0.08)',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: 'var(--primary)', 
                borderRadius: '50%', 
                border: '2px solid #fff', 
                boxShadow: '0 0 10px var(--primary)',
                position: 'absolute',
                top: '40%',
                left: '60%',
                cursor: 'pointer'
              }} className="animate-ping"></div>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: 'var(--primary)', 
                borderRadius: '50%', 
                border: '2px solid #fff', 
                boxShadow: '0 0 10px var(--primary)',
                position: 'absolute',
                top: '40%',
                left: '60%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{ width: '6px', height: '6px', background: '#fff', borderRadius: '50%' }}></div>
              </div>
              
              <div style={{ position: 'absolute', left: '10px', top: '15px', color: 'rgba(233,30,99,0.3)', fontSize: '0.7rem', fontWeight: 'bold' }}>TB HOSPITAL ROAD</div>
              <div style={{ position: 'absolute', right: '15px', bottom: '15px', color: 'rgba(233,30,99,0.3)', fontSize: '0.7rem', fontWeight: 'bold' }}>SUKHWAL AUTO</div>
            </div>

            <a 
              href="https://maps.app.goo.gl/fMkj48yBKgKGPyNy9" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                background: 'rgba(233, 30, 99, 0.05)',
                border: '1px solid rgba(233, 30, 99, 0.25)',
                color: 'var(--primary)',
                padding: '8px 0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '0.8rem',
                textAlign: 'center',
                textDecoration: 'none',
                transition: 'all 0.3s',
                marginTop: '0.5rem'
              }}
              onMouseEnter={(e) => { e.target.style.background = 'var(--primary)'; e.target.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.target.style.background = 'rgba(233, 30, 99, 0.05)'; e.target.style.color = 'var(--primary)'; }}
            >
              GET DIRECTIONS ON GOOGLE MAPS
            </a>
          </div>
        </div>

        {/* Right Column: Contact Inquiry Form */}
        <div className="glass-panel" style={{ padding: '2.5rem 2rem', background: '#ffffff', border: '1px solid rgba(233,30,99,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ color: 'var(--text-heading)', fontSize: '1.4rem', marginBottom: '1.5rem', fontWeight: '800' }}>Send Message</h3>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <CheckCircle color="var(--primary)" size={48} style={{ margin: '0 auto 1rem auto' }} className="animate-bounce" />
              <h4 style={{ color: 'var(--text-heading)', fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Message Sent!</h4>
              <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', lineHeight: '1.5', maxWidth: '300px', margin: '0 auto' }}>
                We have received your message and will reply via email shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(233,30,99,0.2)',
                  color: 'var(--primary)',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  marginTop: '1.5rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {error && (
                <div style={{ background: 'rgba(233, 30, 99, 0.06)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.8rem 1.2rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Your Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name" 
                  required
                  style={{ padding: '12px', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address" 
                  required
                  style={{ padding: '12px', borderRadius: '8px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Message</label>
                <textarea 
                  rows="4" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your question or request..." 
                  required
                  style={{ padding: '12px', borderRadius: '8px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ height: '1px', backgroundColor: 'rgba(233,30,99,0.08)', margin: '0.5rem 0' }}></div>

              <LiquidButton type="submit" disabled={submitting} onClick={undefined}>
                {submitting ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    SENDING...
                  </span>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Send size={14} /> SEND INQUIRY
                  </span>
                )}
              </LiquidButton>
            </form>
          )}
        </div>

      </div>

      {/* 3D Engine Animation Video Card */}
      <div 
        className="glass-panel" 
        style={{ 
          marginTop: '3rem', 
          padding: '2.5rem 2rem', 
          background: '#ffffff', 
          border: '1px solid rgba(233,30,99,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1rem'
        }}
      >
        <h3 style={{ color: 'var(--text-heading)', fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>
          Hero Engine Mechanics: 3D Animation
        </h3>
        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 1rem auto', lineHeight: '1.5' }}>
          Watch this detailed 3D engineering animation showing the complex internal assembly and precision timing mechanics of a professional single-cylinder motorcycle engine.
        </p>
        
        {/* Responsive Video Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          paddingBottom: '56.25%', /* 16:9 Aspect Ratio */
          height: 0,
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: 'var(--card-shadow)',
          border: '1px solid rgba(233,30,99,0.12)'
        }}>
          <iframe
            src="https://www.youtube.com/embed/JhHsPoK_2RI?rel=0"
            title="Motorcycle Engine 3D Animation"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
}
