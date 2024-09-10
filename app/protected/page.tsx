"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const SearchComponent = () => {
  const [searchText, setSearchText] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", { searchText, year, make, model });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Search for Car Keys</h2>
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for car keys..."
          className="w-full p-2 border rounded"
        />
        <div className="grid grid-cols-3 gap-4">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Year</option>
            {/* Add year options here */}
          </select>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Make</option>
            {/* Add make options here */}
          </select>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Model</option>
            {/* Add model options here */}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Search
        </button>
      </form>
    </div>
  );
};

export default function ProtectedPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      } else {
        router.push('/sign-in');
      }
    };

    fetchUser();
  }, [router, supabase.auth]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-xl mb-8">Hello, {user.email}!</p>
      <SearchComponent />
      <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
          <p>Your account was created on: {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p>No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
}
