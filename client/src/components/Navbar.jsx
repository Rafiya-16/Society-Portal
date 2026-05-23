import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  };

  const navLinkStyle = (path) =>
    `px-4 py-2 rounded-lg transition duration-200 ${
      location.pathname === path
        ? 'bg-indigo-600 text-white'
        : 'text-gray-700 hover:bg-indigo-100'
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600"
          >
            Clubs Portal
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className={navLinkStyle('/')}
            >
              Home
            </Link>

            <Link
              to="/events"
              className={navLinkStyle('/events')}
            >
              Events
            </Link>

            <Link
              to="/announcements"
              className={navLinkStyle('/announcements')}
            >
              Announcements
            </Link>

            {user && (
              <Link
                to="/members"
                className={navLinkStyle('/members')}
              >
                Members
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={navLinkStyle('/admin')}
              >
                Admin
              </Link>
            )}

            {user ? (
              <>
                <Link
                  to="/profile"
                  className={navLinkStyle('/profile')}
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={navLinkStyle('/login')}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block text-gray-700 hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/events"
            className="block text-gray-700 hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link>

          <Link
            to="/announcements"
            className="block text-gray-700 hover:text-indigo-600"
            onClick={() => setMenuOpen(false)}
          >
            Announcements
          </Link>

          {user && (
            <Link
              to="/members"
              className="block text-gray-700 hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Members
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="block text-gray-700 hover:text-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          {user ? (
            <>
              <Link
                to="/profile"
                className="block text-gray-700 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-indigo-600"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;