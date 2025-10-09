// src/components/Footer.tsx
import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Heart className="h-6 w-6 mr-2 text-blue-400" />
              HealthCare System
            </h3>
            <p className="text-gray-400 mb-4">
              Providing secure and accessible healthcare document management 
              for patients and medical professionals.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="/login" className="hover:text-blue-400 transition-colors">Login</a></li>
              <li><a href="/register" className="hover:text-blue-400 transition-colors">Register</a></li>
              <li><a href="/patient" className="hover:text-blue-400 transition-colors">Patient Portal</a></li>
              <li><a href="/doctor" className="hover:text-blue-400 transition-colors">Doctor Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-HEAL</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@healthcare-system.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Medical Plaza, Healthcare City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 HealthCare System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;