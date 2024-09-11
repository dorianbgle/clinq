"use client";

import { useState } from 'react';

const symptomsData = [
  { id: 1, name: 'Headache' },
  { id: 2, name: 'Fever' },
  { id: 3, name: 'Cough' },
  { id: 4, name: 'Fatigue' },
  { id: 5, name: 'Sore Throat' },
  { id: 6, name: 'Shortness of Breath' },
  { id: 7, name: 'Nausea' },
  { id: 8, name: 'Dizziness' },
  { id: 9, name: 'Chest Pain' },
  { id: 10, name: 'Back Pain' },
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    if (input.trim() !== '') {
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
    setSearchTerm('');
    setFilteredSymptoms([]);
  };

  const removeSymptom = (symptomId) => {
    setSelectedSymptoms((prevSymptoms) =>
      prevSymptoms.filter((s) => s.id !== symptomId)
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-start justify-start text-white">
      <div className="w-full max-w-lg p-4 relative">
        <h1 className="pt-3 text-2xl">Condition Search</h1>
        <h2 className="text-zinc-500 pb-3">
          Search Conditions by any symptoms specified
        </h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-600 bg-black text-white rounded-2xl shadow-sm focus:outline-none focus:zinc-indigo-500"
          placeholder="Search symptoms..."
        />

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
            <div className="text-zinc-500">Start searching for symptoms</div>
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
      </div>
    </div>
  );
}
