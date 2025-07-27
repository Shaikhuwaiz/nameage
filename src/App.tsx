import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("⏳ Submitting...");

    try {
      const res = await fetch(
        "https://simplebackend-production.up.railway.app/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ User saved: " + data.user.name);
        setName("");
        setAge("");
      } else {
        setMessage("❌ Error: " + data.message);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setMessage("❌ Failed to fetch: ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold">Add User</h1>
        <input
          type="text"
          placeholder="Name"
          className="w-full px-3 py-2 rounded bg-gray-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Age"
          className="w-full px-3 py-2 rounded bg-gray-700"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 transition py-2 px-4 rounded"
        >
          Submit
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}

export default App;
