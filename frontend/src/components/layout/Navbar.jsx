import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const megaMenus = {
    solutions: {
      title: 'Solutions',
      items: [
        { name: 'Process Automation', path: '/solutions' },
        { name: 'Robotics Integration', path: '/solutions' },
        { name: 'SCADA Systems', path: '/solutions' },
        { name: 'Machine Vision', path: '/solutions' },
        { name: 'IoT & Industry 4.0', path: '/solutions' },
        { name: 'Energy Management', path: '/solutions' },
      ],
      cta: { name: 'View All Solutions', path: '/solutions' }
    },
    products: {
      title: 'Products',
      items: [
        { name: 'PLCs & Controllers', path: '/products' },
        { name: 'HMI Panels', path: '/products' },
        { name: 'Industrial Robots', path: '/products' },
        { name: 'Sensors & Actuators', path: '/products' },
        { name: 'Drives & Motors', path: '/products' },
        { name: 'Safety Devices', path: '/products' },
      ],
      cta: { name: 'Browse All Products', path: '/products' }
    },
    services: {
      title: 'Services',
      items: [
        { name: 'System Integration', path: '/contact' },
        { name: 'Technical Support', path: '/contact' },
        { name: 'Training & Consulting', path: '/contact' },
        { name: 'Maintenance Plans', path: '/contact' },
      ],
      cta: { name: 'Contact Us', path: '/contact' }
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-[60] shadow-sm">
      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="MD Automation Solutions" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1 relative z-50">
            {/* Solutions Mega Menu */}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1">
                Solutions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">By Category</h3>
                    <div className="space-y-2">
                      {megaMenus.solutions.items.map((item, idx) => (
                        <Link key={idx} to={item.path} className="mega-menu-item">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help Choosing?</h3>
                    <p className="text-sm text-gray-600 mb-4">Our experts can help you find the right automation solution for your needs.</p>
                    <Link to={megaMenus.solutions.cta.path} className="mega-menu-highlight inline-block">
                      {megaMenus.solutions.cta.name} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Mega Menu */}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1">
                Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Product Categories</h3>
                    <div className="space-y-2">
                      {megaMenus.products.items.map((item, idx) => (
                        <Link key={idx} to={item.path} className="mega-menu-item">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Components</h3>
                    <p className="text-sm text-gray-600 mb-4">From world-leading manufacturers like Siemens, ABB, Schneider Electric, and more.</p>
                    <Link to={megaMenus.products.cta.path} className="mega-menu-highlight inline-block">
                      {megaMenus.products.cta.name} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Mega Menu */}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1">
                Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[700px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Our Services</h3>
                    <div className="space-y-2">
                      {megaMenus.services.items.map((item, idx) => (
                        <Link key={idx} to={item.path} className="mega-menu-item">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
                    <p className="text-sm text-gray-600 mb-4">Get expert assistance whenever you need it.</p>
                    <Link to={megaMenus.services.cta.path} className="mega-menu-highlight inline-block">
                      {megaMenus.services.cta.name} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Regular Links */}
            <Link to="/about" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
              About
            </Link>
            <Link to="/case-studies" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
              Case Studies
            </Link>
            <Link to="/partners" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium">
              Partners
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {user ? (
              <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-primary-600 hover:text-primary-700 font-medium">
                {user.name}
              </Link>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Login
              </Link>
            )}
            <Link to="/contact" className="btn-primary">
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-6 space-y-4">
            <Link to="/solutions" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">Solutions</Link>
            <Link to="/products" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">Products</Link>
            <Link to="/case-studies" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">Case Studies</Link>
            <Link to="/about" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">About</Link>
            <Link to="/partners" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">Partners</Link>
            <Link to="/contact" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">Contact</Link>
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="block py-2 text-primary-600 font-medium">Dashboard</Link>
                <button onClick={handleLogout} className="block py-2 text-red-600 font-medium">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block py-2 text-primary-600 font-medium">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
