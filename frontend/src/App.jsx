import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layout
import Layout from './components/layout/Layout';

// Features
import Home from './features/home/Home';
import Bikes from './features/bikes/Bikes';
import GenuineParts from './features/parts/GenuineParts';
import Services from './features/services/Services';
import BookService from './features/booking/BookService';
import AboutUs from './features/about/AboutUs';
import ContactUs from './features/contact/ContactUs';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout containing Header and Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hero-bikes" element={<Bikes />} />
          <Route path="genuine-parts" element={<GenuineParts />} />
          <Route path="services" element={<Services />} />
          <Route path="book-service" element={<BookService />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="contact-us" element={<ContactUs />} />
          
          {/* Fallback routing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
