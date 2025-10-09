// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  FileText, 
  Users, 
  Upload, 
  Download,
  ArrowRight,
  Star
} from 'lucide-react';
import PatientCodeChecker from '../components/PatientCodeChecker';

const HomePage: React.FC = () => {
  const [showChecker, setShowChecker] = useState(false);

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Access",
      description: "Your medical documents are protected with bank-level security"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Digital Records",
      description: "Access all your medical documents in one secure place"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Doctor Collaboration",
      description: "Share documents securely with your healthcare providers"
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Easy Upload",
      description: "Upload new reports and scans with just a few clicks"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Your Health Records, 
          <span className="text-blue-600"> Secure & Accessible</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Manage your medical documents securely and share them with healthcare 
          professionals whenever you need. Your health information, always available.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button
            onClick={() => setShowChecker(!showChecker)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center"
          >
            Check Patient Code
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          
          <Link
            to="/register"
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Create Account
          </Link>
        </div>

        {showChecker && (
          <div className="max-w-md mx-auto">
            <PatientCodeChecker />
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Platform
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white rounded-2xl p-8 mb-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">10,000+</div>
            <div className="text-blue-100">Patients Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-blue-100">Healthcare Providers</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">99.9%</div>
            <div className="text-blue-100">Uptime Reliability</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex mb-4">
                {[...Array(5)].map((_, star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                "This platform made it so easy to access my medical records. 
                No more carrying around paper copies!"
              </p>
              <div className="text-sm text-gray-500">- Sarah Johnson, Patient</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;