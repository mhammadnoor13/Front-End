import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

export default function GuestLayout() {
  return (
    <>
      <Navbar>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </Navbar>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
}
