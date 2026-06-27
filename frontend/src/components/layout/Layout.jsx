import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-black)' }}>
      <Header />
      <main style={{ flex: 1, marginTop: '80px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
