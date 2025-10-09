import React, { useState } from 'react';

const PatientCodeChecker: React.FC = () => {
  const [patientCode, setPatientCode] = useState('');
  const [exists, setExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const checkCode = async () => {
    if (!patientCode.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/patients/check-code/${patientCode.trim()}`
      );
      const data = await response.json();
      setExists(data.exists);
    } catch (error) {
      console.error('Error checking patient code:', error);
      setExists(false);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">Check Patient Registration</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={patientCode}
          onChange={(e) => setPatientCode(e.target.value.toUpperCase())}
          placeholder="Enter patient code (e.g., PT123456)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={checkCode}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </div>

      {exists !== null && (
        <div className={`text-center p-3 rounded-md ${
          exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {exists 
            ? '✅ Patient is registered in our system'
            : '❌ Patient code not found. Please check the code or register.'
          }
        </div>
      )}
    </div>
  );
};

export default PatientCodeChecker;