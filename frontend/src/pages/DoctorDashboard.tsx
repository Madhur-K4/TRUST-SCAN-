import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Doctor Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, Dr. {user?.username}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">Patient Lookup</h3>
          <p className="text-gray-600 mb-4">
            Find and access patient documents
          </p>
          <Link
            to="/lookup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Lookup Patient
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-green-600">Upload Report</h3>
          <p className="text-gray-600 mb-4">
            Upload diagnoses, prescriptions, or reports
          </p>
          <Link
            to="/upload"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Upload Report
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">My Patients</h3>
          <p className="text-gray-600 mb-4">
            View your patient list and recent activity
          </p>
          <Link
            to="/patients"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            View Patients
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
