import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://backend1-production-3e01.up.railway.app/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(`✅ ${data.message}`);
        setName("");
        setAge("");
      } else {
        setStatus(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("❌ Failed to connect to backend.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm text-center">
        <h1 className="text-xl font-bold">User Form</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
          <input
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded w-full"
          >
            Submit
          </button>
        </form>
        <p className="text-sm mt-2">{status}</p>
      </div>
    </div>
  );
}

export default App;
