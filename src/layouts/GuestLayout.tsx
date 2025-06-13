// src/layouts/GuestLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

export default function GuestLayout() {
  return (
    <>
      {/* No children here—Navbar renders its own links */}
      <Navbar />

      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
}
