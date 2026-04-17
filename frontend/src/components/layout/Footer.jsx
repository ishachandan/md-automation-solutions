import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <img 
                src="/logo.png" 
                alt="MD Automation Solutions" 
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Leading provider of industrial automation solutions, empowering Connected Factories to excel in an Industry 4.0 world.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/solutions" className="hover:text-white transition-colors">Process Automation</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Robotics Integration</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">SCADA Systems</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Machine Vision</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">IoT & Industry 4.0</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-white transition-colors">PLCs & Controllers</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">HMI Panels</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Industrial Robots</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Sensors & Actuators</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">Drives & Motors</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              Copyright © {currentYear} MD Automation Solutions. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
