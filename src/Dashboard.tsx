import React, { useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      // Replace with your actual backend API endpoint
      const response = await axios.post('http://localhost:5000/scan', { domain });
      setResults(response.data);
    } catch (error) {
      console.error("Scan failed", error);
      alert("Scan failed. Check console for details.");
    }
    setLoading(false);
  };

  return (
    <div className="dashboard">
      <h1>OneForAll Scan Dashboard</h1>
      <input
        type="text"
        placeholder="Enter domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
      <button onClick={handleScan} disabled={loading}>
        {loading ? "Scanning..." : "Start Scan"}
      </button>
      {results && (
        <div className="results">
          <h2>Scan Results</h2>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
