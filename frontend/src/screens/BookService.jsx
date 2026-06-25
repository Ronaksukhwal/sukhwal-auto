import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle, Navigation, ShieldCheck, PhoneCall } from 'lucide-react';
import { SparkPlugCanvas } from '../components/ThreePartsCanvas';
import LiquidButton from '../components/LiquidButton';
import { API_URL } from '../config';


// Default list of bikes to ensure the dropdown is populated even if the API is offline
const FLAT_BIKES_FALLBACK = [
  "Hero Honda CD 100",
  "Hero Honda Splendor (Original)",
  "Hero Honda CD Dawn",
  "Hero Honda CD Deluxe",
  "Hero Honda Passion Plus",
  "Hero Honda CBZ / CBZ Gold",
  "Hero Honda Hunk",
  "Hero Honda Karizma R",
  "Hero Honda Karizma ZMR",
  "Hero Splendor Plus / XTEC",
  "Hero Passion Pro / XTEC",
  "Hero HF Deluxe / HF 100",
  "Hero Glamour / XTEC",
  "Hero Super Splendor",
  "Hero XPulse 200 4V / 2V",
  "Hero XPulse 200T",
  "Hero Xtreme 160R 4V / 2V",
  "Hero Xtreme 125R",
  "Hero Karizma XMR",
  "Hero Pleasure Plus",
  "Hero Maestro Edge 125",
  "Hero Destini 125",
  "Hero Zoom 110"
];

export default function BookService({ selectedBikeModel, setSelectedBikeModel, selectedServiceType, setSelectedServiceType }) {
  const [bikes, setBikes] = useState(FLAT_BIKES_FALLBACK);
  
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [bikeModel, setBikeModel] = useState(selectedBikeModel || '');
  const [serviceType, setServiceType] = useState(selectedServiceType || 'Commuter Essential Care');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [needsPickup, setNeedsPickup] = useState(false);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropAddress, setDropAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  // UI States
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [formError, setFormError] = useState('');

  // Fetch bikes from API on load
  useEffect(() => {
    fetch(`${API_URL}/api/bikes`)
      .then(res => res.json())
      .then(data => {
        const flatList = Object.values(data).flat().map(b => b.name);
        setBikes(flatList);
      })
      .catch(err => console.log("Using local bikes dropdown fallback."));
  }, []);

  // Update field if prop changes
  useEffect(() => {
    if (selectedBikeModel) setBikeModel(selectedBikeModel);
  }, [selectedBikeModel]);

  useEffect(() => {
    if (selectedServiceType) setServiceType(selectedServiceType);
  }, [selectedServiceType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    // Basic Validation
    if (!customerName || !customerPhone || !customerEmail || !bikeModel || !serviceType || !bookingDate || !bookingTime) {
      setFormError('Please fill out all required fields.');
      setSubmitting(false);
      return;
    }

    if (needsPickup) {
      if (!pickupAddress.trim() || !dropAddress.trim()) {
        setFormError('Pickup and Drop-off addresses are required when Pickup option is selected.');
        setSubmitting(false);
        return;
      }
    }

    const payload = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_email: customerEmail,
      bike_model: bikeModel,
      service_type: serviceType,
      booking_date: bookingDate,
      booking_time: bookingTime,
      needs_pickup: needsPickup,
      pickup_address: needsPickup ? pickupAddress : null,
      drop_address: needsPickup ? dropAddress : null,
      special_instructions: specialInstructions || null
    };

    try {
      const response = await fetch(`${API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'Failed to submit booking.');
      }

      const result = await response.json();
      setBookingDetails(result);
      setSubmitSuccess(true);
      
      // Clear selections in parent
      if (setSelectedBikeModel) setSelectedBikeModel('');
      if (setSelectedServiceType) setSelectedServiceType('');
    } catch (err) {
      setFormError(err.message || 'Server connection error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const timeSlots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "01:00 PM - 03:00 PM",
    "03:00 PM - 05:00 PM",
    "05:00 PM - 07:00 PM"
  ];

  if (submitSuccess) {
    return (
      <motion.div 
        className="page-container tech-grid"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}
      >
        <div 
          className="glass-panel text-center" 
          style={{ 
            maxWidth: '550px', 
            padding: '3rem 2rem', 
            border: '2px solid var(--primary)',
            background: 'linear-gradient(180deg, rgba(233,30,99,0.04) 0%, rgba(255,255,255,0.95) 100%)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <CheckCircle color="var(--primary)" size={64} className="animate-bounce" />
          </div>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Thank you, {bookingDetails?.customer_name}. Your service request has been registered in the database.
          </p>

          <div 
            style={{ 
              textAlign: 'left', 
              background: 'rgba(233,30,99,0.02)', 
              border: '1px solid rgba(233,30,99,0.08)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              fontSize: '0.9rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem'
            }}
          >
            <div><strong style={{ color: 'var(--primary)' }}>Booking Reference:</strong> #{bookingDetails?.id}</div>
            <div><strong>Bike Model:</strong> {bookingDetails?.bike_model}</div>
            <div><strong>Service:</strong> {bookingDetails?.service_type}</div>
            <div><strong>Date & Slot:</strong> {bookingDetails?.booking_date} ({bookingDetails?.booking_time})</div>
            <div><strong>Status:</strong> <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{bookingDetails?.status}</span></div>
            {bookingDetails?.needs_pickup && (
              <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(233,30,99,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                  <Navigation size={12} /> Doorstep Pickup Enabled (Bhilwara)
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}><strong>Pickup:</strong> {bookingDetails?.pickup_address}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}><strong>Drop:</strong> {bookingDetails?.drop_address}</div>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setBookingDetails(null);
                setCustomerName('');
                setCustomerPhone('');
                setCustomerEmail('');
                setPickupAddress('');
                setDropAddress('');
                setNeedsPickup(false);
                setSpecialInstructions('');
              }}
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                boxShadow: '0 4px 12px rgba(233,30,99,0.2)'
              }}
            >
              Book Another Service
            </button>
            <a
              href="tel:+919876543210"
              style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(233, 30, 99, 0.2)',
                color: 'var(--primary)',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <PhoneCall size={14} /> Call Support
            </a>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="page-container tech-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div className="brand-badge">
          <Calendar size={14} /> Scheduling Portal
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-heading)' }}>
          Book Your Hero <span style={{ color: 'var(--primary)' }}>Service Slots</span>
        </h1>
        <p style={{ color: 'var(--text-gray)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Schedule a diagnostic checks or overhaul booking below. Select if you'd like our certified pickup technician to retrieve your motorcycle in Bhilwara.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '2.5rem', 
        maxWidth: '1100px', 
        margin: '0 auto', 
        width: '100%',
        alignItems: 'stretch'
      }}>
        
        {/* Left Side: Booking Form */}
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', background: '#ffffff', border: '1px solid rgba(233,30,99,0.08)' }}>
          {formError && (
            <div style={{ background: 'rgba(233, 30, 99, 0.06)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.8rem 1.2rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' }}>
              {formError}
            </div>
          )}

          {/* Customer Detail Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Full Name *</label>
              <input 
                type="text" 
                value={customerName} 
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your name" 
                required
                style={{ padding: '10px', borderRadius: '6px', outline: 'none' }}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Phone Number *</label>
              <input 
                type="tel" 
                value={customerPhone} 
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter mobile number" 
                required
                style={{ padding: '10px', borderRadius: '6px', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Email Address *</label>
              <input 
                type="email" 
                value={customerEmail} 
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Enter email address" 
                required
                style={{ padding: '10px', borderRadius: '6px', outline: 'none' }}
              />
            </div>
          </div>

          {/* Bike & Service Specs Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Select Hero / Hero Honda Model *</label>
              <select 
                value={bikeModel} 
                onChange={(e) => setBikeModel(e.target.value)}
                required
                style={{ padding: '10px', borderRadius: '6px', outline: 'none' }}
              >
                <option value="" disabled>-- Select Bike Model --</option>
                {bikes.map((model, idx) => (
                  <option key={idx} value={model}>{model}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Service Package *</label>
              <select 
                value={serviceType} 
                onChange={(e) => setServiceType(e.target.value)}
                required
                style={{ padding: '10px', borderRadius: '6px', outline: 'none' }}
              >
                <option value="Commuter Essential Care">Commuter Essential Care (₹699)</option>
                <option value="Major Performance Overhaul">Major Performance Overhaul (₹1,499)</option>
                <option value="Premium Xtreme & XPulse Tech">Premium Xtreme & XPulse Tech (₹1,999)</option>
                <option value="Custom Diagnostic Inspection">Custom Diagnostic Inspection</option>
              </select>
            </div>
          </div>

          {/* Date & Time Slot Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Preferred Date *</label>
              <input 
                type="date" 
                value={bookingDate} 
                onChange={(e) => setBookingDate(e.target.value)}
                required
                min={new Date().toISOString().split('T')[0]} 
                style={{ padding: '10px', borderRadius: '6px', width: '100%', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Preferred Time Slot *</label>
              <select 
                value={bookingTime} 
                onChange={(e) => setBookingTime(e.target.value)}
                required
                style={{ padding: '10px', borderRadius: '6px', outline: 'none' }}
              >
                {timeSlots.map((slot, idx) => (
                  <option key={idx} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bike Pickup & Drop Option Slider */}
          <div 
            style={{ 
              background: 'rgba(233, 30, 99, 0.02)', 
              border: '1px solid rgba(233, 30, 99, 0.08)',
              padding: '1.25rem', 
              borderRadius: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <MapPin color="var(--primary)" size={22} className={needsPickup ? "animate-pulse" : ""} />
                <div>
                  <h4 style={{ color: 'var(--text-heading)', fontSize: '0.95rem', fontWeight: '800' }}>Request Bike Pickup & Drop Option</h4>
                  <p style={{ color: 'var(--text-gray)', fontSize: '0.75rem' }}>Retrieval across Bhilwara city coordinates</p>
                </div>
              </div>

              {/* IOS-style Toggle Switch */}
              <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={needsPickup} 
                  onChange={(e) => setNeedsPickup(e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }} 
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundColor: needsPickup ? 'var(--primary)' : '#c0b4b8',
                  transition: '.4s',
                  borderRadius: '34px'
                }}></span>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '18px', width: '18px',
                  left: needsPickup ? '28px' : '4px',
                  bottom: '4px',
                  backgroundColor: 'white',
                  transition: '.4s',
                  borderRadius: '50%',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}></span>
              </label>
            </div>

            <AnimatePresence>
              {needsPickup && (
                <motion.div
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: '1.25rem' }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ height: '1px', backgroundColor: 'rgba(233,30,99,0.08)', marginBottom: '1rem' }}></div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Pickup Address in Bhilwara *</label>
                      <textarea
                        rows="2"
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        placeholder="House no., Landmark, Street detail in Bhilwara..."
                        required={needsPickup}
                        style={{ padding: '8px', borderRadius: '6px', outline: 'none', resize: 'vertical' }}
                      />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                      <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Drop-off Address in Bhilwara *</label>
                      <textarea
                        rows="2"
                        value={dropAddress}
                        onChange={(e) => setDropAddress(e.target.value)}
                        placeholder="Specify if different, or write same as pickup..."
                        required={needsPickup}
                        style={{ padding: '8px', borderRadius: '6px', outline: 'none', resize: 'vertical' }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-gray)', fontWeight: '700' }}>Special Instructions / Complaints</label>
            <textarea
              rows="2"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Describe any engine noises, slipping clutch, electrical issues..."
              style={{ padding: '10px', borderRadius: '6px', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ height: '1px', backgroundColor: 'rgba(233,30,99,0.08)', margin: '0.25rem 0' }}></div>

          {/* Submit Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-gray)' }}>
              <ShieldCheck color="var(--primary)" size={14} />
              <span>Gopal Sukhwal's O.E.M. service warranty protection.</span>
            </div>
            
            <LiquidButton type="submit" className="w-full sm:w-auto">
              {submitting ? "SUBMITTING..." : "CONFIRM SERVICE BOOKING"}
            </LiquidButton>
          </div>
        </form>

        {/* Right Side: 3D Spark Plug Widget & Benefit Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'space-between' }}>
          
          {/* Spark Plug 3D Card */}
          <div 
            className="glass-panel text-center" 
            style={{ 
              padding: '1.5rem', 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,248,249,0.95) 100%)',
              border: '1px solid rgba(233,30,99,0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)', marginBottom: '0.5rem', fontWeight: '800' }}>
              Genuine Spark Igniters
            </h3>
            
            {/* Embedded 3D Spark Plug Canvas */}
            <div style={{ background: 'rgba(0,0,0,0.01)', borderRadius: '10px', overflow: 'hidden', margin: '0.5rem 0' }}>
              <SparkPlugCanvas />
            </div>
            
            <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', lineHeight: '1.4' }}>
              Every engine tune-up at Sukhwal Auto uses custom electrode gapping gauges to set the O.E.M. spark plug gap (0.8mm) exactly, ensuring clean ignition.
            </p>
          </div>

          {/* Booking Guidelines list card */}
          <div className="glass-panel" style={{ padding: '1.75rem', background: '#ffffff', border: '1px solid rgba(233,30,99,0.08)' }}>
            <h4 style={{ color: 'var(--text-heading)', fontSize: '1rem', marginBottom: '1rem', fontWeight: '800' }}>What Happens Next?</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: 'var(--text-gray)' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>1.</span>
                <span>Our manager Gopal Sukhwal assigns a technician to review the slots.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>2.</span>
                <span>You will receive a call confirming the pickup time or workshop slot details.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>3.</span>
                <span>After inspection, a digital job card with parts cost estimates will be shared.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
