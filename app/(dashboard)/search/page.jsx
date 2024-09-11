"use client";

import { useState, useEffect } from "react";
import supabase from "@/packages/lib/supabase/client";

// Conditions data with associated symptoms
const conditionsData = [
  {
    id: 1,
    name: "Flu",
    symptoms: ["Fever", "Cough", "Fatigue", "Sore Throat"],
  },
  {
    id: 2,
    name: "Migraine",
    symptoms: ["Headache", "Nausea", "Dizziness"],
  },
  {
    id: 3,
    name: "COVID-19",
    symptoms: ["Fever", "Cough", "Shortness of Breath", "Fatigue"],
  },
  {
    id: 4,
    name: "Heart Attack",
    symptoms: ["Chest Pain", "Shortness of Breath", "Fatigue"],
  },
  {
    id: 5,
    name: "Back Strain",
    symptoms: ["Back Pain", "Fatigue"],
  },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [symptomsData, setSymptomsData] = useState([]);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch symptoms from Supabase
  const getSymptoms = async () => {
    const { data, error } = await supabase
      .from("symptoms") // Replace with your table name
      .select("id, title, symptomjson") // Adjust column names if needed
      .order("title", { ascending: true });

    if (error) {
      console.error("Error fetching symptoms:", error);
    } else {
      const formattedSymptoms = data.map((item) => ({
        id: item.id,
        name: item.title,
      }));
      setSymptomsData(formattedSymptoms);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSymptoms();
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input.trim() !== "") {
      const filtered = symptomsData.filter(
        (symptom) =>
          symptom.name.toLowerCase().includes(input.toLowerCase()) &&
          !selectedSymptoms.some((s) => s.id === symptom.id)
      );
      setFilteredSymptoms(filtered);
    } else {
      setFilteredSymptoms([]);
    }
  };

  const addSymptom = (symptom) => {
    setSelectedSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);
    setSearchTerm("");
    setFilteredSymptoms([]);
  };

  const removeSymptom = (symptomId) => {
    setSelectedSymptoms((prevSymptoms) =>
      prevSymptoms.filter((s) => s.id !== symptomId)
    );
  };

  // Find conditions related to the selected symptoms (only show if all selected symptoms are in the condition)
  const relevantConditions = conditionsData.filter((condition) =>
    selectedSymptoms.every((selectedSymptom) =>
      condition.symptoms.includes(selectedSymptom.name)
    )
  );

  return (
    <div className="min-h-screen flex flex-col items-start justify-start text-white px-4">
      <div className="w-full p-4 relative">
        <h1 className="pt-3 text-2xl">Condition Search</h1>
        <h2 className="text-zinc-500 pb-3">
          Search Conditions by any symptoms specified
        </h2>

        {/* Conditionally render the input field or a loading message */}
        {loading ? (
          <div className="w-full p-2 border border-zinc-500 bg-black text-zinc-500 rounded-2xl shadow-sm flex justify-center">
            <svg
              aria-hidden="true"
              className="inline w-5 h-5 text-zinc-800 animate-spin dark:text-zinc-800 fill-zinc-800 dark:fill-zinc-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full p-2 border px-4 text-sm border-gray-600 bg-transparent text-white rounded-2xl shadow-sm focus:outline-none focus:border-zinc-500"
            placeholder="Search symptoms..."
          />
        )}

        {filteredSymptoms.length > 0 && (
          <div className="border border-zinc-600 mt-1 rounded-lg bg-zinc-800 text-white shadow-lg max-h-60 overflow-y-auto absolute z-10 w-full">
            {filteredSymptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                onClick={() => addSymptom(symptom)}
              >
                {symptom.name}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap">
          {selectedSymptoms.length === 0 ? (
            <div className="text-zinc-500">No symptoms selected</div>
          ) : (
            selectedSymptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="flex items-center bg-zinc-900 rounded-full px-4 py-2 m-1"
              >
                {symptom.name}
                <button
                  onClick={() => removeSymptom(symptom.id)}
                  className="ml-2 text-sm hover:text-gray-200"
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {/* Relevant conditions section */}
        <div className="mt-6">
          {selectedSymptoms.length === 0 ? (
            <div className="text-zinc-500">
              Select Symptoms to view associated conditions
            </div>
          ) : relevantConditions.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-3">Possible Conditions</h3>
              <div>
                {relevantConditions.map((condition) => (
                  <div
                    key={condition.id}
                    className="flex justify-between items-center border p-2 px-4 border-zinc-800 text-white rounded-lg"
                  >
                    <div>{condition.name}</div>
                    {/* Symptoms displayed horizontally at the end, sorted alphabetically */}
                    <div className="flex space-x-2">
                      {condition.symptoms
                        .sort((a, b) => a.localeCompare(b)) // Sort the symptoms alphabetically
                        .map((symptom, index) => {
                          // Check if this symptom is selected by the user
                          const isSelected = selectedSymptoms.some(
                            (s) => s.name === symptom
                          );
                          return (
                            <div
                              key={index}
                              className={`px-2 py-1 rounded-full text-sm ${
                                isSelected
                                  ? "bg-green-500 text-white"
                                  : "bg-zinc-700 text-white"
                              }`}
                            >
                              {symptom}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-zinc-500">
              There are no conditions that satisfy these symptoms
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
