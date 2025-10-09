import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Patient Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, {user?.username}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">My Documents</h3>
          <p className="text-gray-600 mb-4">
            View and manage your medical documents
          </p>
          <Link
            to="/documents"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            View Documents
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-green-600">Upload Document</h3>
          <p className="text-gray-600 mb-4">
            Upload new medical reports or scans
          </p>
          <Link
            to="/upload"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Upload Now
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">Share Access</h3>
          <p className="text-gray-600 mb-4">
            Share your documents with healthcare providers
          </p>
          <Link
            to="/share"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Manage Access
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
