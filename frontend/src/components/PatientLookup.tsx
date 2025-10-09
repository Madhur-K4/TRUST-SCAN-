import React, { useState } from 'react';

const PatientLookup: React.FC = () => {
  const [patientCode, setPatientCode] = useState('');
  const [searching, setSearching] = useState(false);
  const [patient, setPatient] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientCode) return;

    setSearching(true);
    // TODO: Implement actual patient lookup logic
    setTimeout(() => {
      setSearching(false);
      setPatient({
        code: patientCode,
        name: 'John Doe',
        documents: [
          { id: 1, type: 'LAB_REPORT', date: '2024-01-15' },
          { id: 2, type: 'SCAN', date: '2024-01-10' }
        ]
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Patient Lookup</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input
            type="text"
            value={patientCode}
            onChange={(e) => setPatientCode(e.target.value)}
            placeholder="Enter patient code"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={searching}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md transition-colors"
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {patient && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Patient: {patient.name}</h3>
          <p className="text-gray-600 mb-4">Code: {patient.code}</p>
          
          <div>
            <h4 className="text-lg font-medium mb-3">Available Documents</h4>
            <div className="space-y-2">
              {patient.documents.map((doc: any) => (
                <div key={doc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{doc.type.replace('_', ' ')}</span>
                    <span className="text-gray-600 ml-2">- {doc.date}</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientLookup;
