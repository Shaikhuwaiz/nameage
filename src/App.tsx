import { useState, useEffect } from "react";

function App() {
  const [status, setStatus] = useState("❌ Not connected");

  const checkBackend = async () => {
    try {
      const res = await fetch("https://simplebackend-production.up.railway.app/users");
      if (res.ok) {
        setStatus("✅ Successfully connected to backend");
      } else {
        setStatus("❌ Backend responded with error");
      }
    } catch (err) {
      setStatus("❌ Not connected to backend");
    }
  };

  useEffect(() => {
    checkBackend(); // initial check
    const interval = setInterval(checkBackend, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-xl font-bold">Backend Status</h1>
        <p
          className={`mt-2 text-sm ${
            status.startsWith("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          Status: {status}
        </p>
      </div>
    </div>
  );
}

export default App;
