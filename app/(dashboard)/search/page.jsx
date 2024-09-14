"use client";

import { useState, useEffect } from "react";
import supabase from "@/packages/lib/supabase/client";

// Quick start symptoms
const quickStartSymptoms = ["Fever", "Chest Pain", "Headache", "Abdominal Pain", "Haematuria"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [symptomsData, setSymptomsData] = useState([]);
  const [conditionsData, setConditionsData] = useState([]);
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loadingSymptoms, setLoadingSymptoms] = useState(true);
  const [loadingConditions, setLoadingConditions] = useState(true);
  const [showGuide, setShowGuide] = useState(false); // State to control guide visibility

  // Fetch symptoms from Supabase
  const getSymptoms = async () => {
    const { data, error } = await supabase
      .from("allsymptoms")
      .select("id, symptoms")
      .order("symptoms", { ascending: true });

    if (error) {
      console.error("Error fetching symptoms:", error);
    } else {
      const formattedSymptoms = data.map((item) => ({
        id: item.id,
        name: item.symptoms,
      }));
      setSymptomsData(formattedSymptoms);
    }
    setLoadingSymptoms(false);
  };

  // Fetch conditions from Supabase
  const getConditions = async () => {
    const { data, error } = await supabase
      .from("allconditions")
      .select("id, name, symptoms, rarity");

    if (error) {
      console.error("Error fetching conditions:", error);
    } else {
      setConditionsData(data);
    }
    setLoadingConditions(false);
  };

  useEffect(() => {
    getSymptoms();
    getConditions();
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
    if (!selectedSymptoms.some((s) => s.name === symptom.name)) {
      setSelectedSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);
    }
    setSearchTerm("");
    setFilteredSymptoms([]);
  };

  const removeSymptom = (symptomId) => {
    setSelectedSymptoms((prevSymptoms) =>
      prevSymptoms.filter((s) => s.id !== symptomId)
    );
  };

  // Sort conditions by rarity and then alphabetically within each rarity
  const sortConditionsByRarity = (conditions) => {
    const commonConditions = conditions
      .filter((condition) => condition.rarity === "common")
      .sort((a, b) => a.name.localeCompare(b.name));

    const uncommonConditions = conditions
      .filter((condition) => condition.rarity === "uncommon")
      .sort((a, b) => a.name.localeCompare(b.name));

    const rareConditions = conditions
      .filter((condition) => condition.rarity === "rare")
      .sort((a, b) => a.name.localeCompare(b.name));

    return [...commonConditions, ...uncommonConditions, ...rareConditions];
  };

  // Find conditions related to the selected symptoms (only show if all selected symptoms are in the condition)
  const relevantConditions = sortConditionsByRarity(
    conditionsData.filter((condition) =>
      selectedSymptoms.every((selectedSymptom) =>
        condition.symptoms.includes(selectedSymptom.name)
      )
    )
  );

  // Add quick start symptom directly by name
  const addQuickStartSymptom = (symptomName) => {
    const symptom = symptomsData.find((s) => s.name.toLowerCase() === symptomName.toLowerCase());
    if (symptom) {
      addSymptom(symptom);
    }
  };

  // Function to determine the rarity classes
  const getRarityBorderClasses = (rarity) => {
    switch (rarity) {
      case "common":
        return "border-l-4 border-green-500";
      case "uncommon":
        return "border-l-4 border-yellow-500";
      case "rare":
        return "border-l-4 border-red-500";
      default:
        return "border-l-4 border-gray-500 border-white"; // Default fallback for unknown rarity
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-start justify-start gap-2 py-5 select-none">

      <h1 className="text-2xl md:text-2xl">Condition Search</h1>
      <h2 className="text-zinc-500 pb-3 text-sm md:text-base">
        Search Conditions by any symptoms specified
      </h2>

      {/* Conditionally render the input field or a loading message */}
      <div className="relative w-full">
        {loadingSymptoms ? (
          <div className="w-full p-2 border border-zinc-500 bg-transparent text-zinc-500 rounded-2xl shadow-sm flex justify-center">
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
            className="w-full p-2 border px-4 text-sm border-zinc-600 bg-transparent text-white rounded-2xl shadow-sm focus:outline-none focus:border-zinc-500"
            placeholder="Search symptoms..."
          />
        )}

{filteredSymptoms.length > 0 && (
          <div className="absolute z-10 w-full mt-1 border rounded-lg bg-zinc-800 text-white shadow-lg max-h-60 overflow-y-auto">
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
      </div>


          {selectedSymptoms.length === 0 && (
       <div className="pt-3 flex items-center w-full">
       <div className="flex flex-wrap gap-2 py-2">
         {quickStartSymptoms.map((symptom, index) => (
           <button
             key={index}
             onClick={() => addQuickStartSymptom(symptom)}
             className="bg-zinc-800 hover:bg-yellow-900/10 text-sm py-1 px-3 rounded-full hover:text-yellow-600 border hover:border-yellow-600"
           >
             {symptom}
           </button>
         ))}
       </div>
       {/* Spacing for the 'Help' button */}
       <div className="ml-auto">
         <button
           onClick={() => setShowGuide(!showGuide)}
           className="hover:bg-yellow-900 text-xs text-uppercase rounded-full border bg-yellow-900/10 text-yellow-600 border-yellow-600 px-4 py-2 ml-2"
         >
           Help
         </button>
       </div>
     </div>
     
     
      )}

      {/* Show the guide when showGuide is true */}
      {showGuide && (
        <div className="flex flex-col items-start justify-center text-yellow-600 text-sm border border-yellow-600 bg-yellow-900/10 rounded-xl px-4 py-4 w-full mt-4">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold">Condition Search Guide</h3>
          </div>
          <div className="">
            <ol className="list-decimal list-inside">
              <li>Start by selecting a general symptom to explore possible conditions.</li>
              <li className="mt-2">Add more specific symptoms to narrow down the list.</li>
              <li className="mt-2">Combine various symptoms to get more accurate suggestions and understand differentials.</li>
            </ol>
          </div>
        </div>
      )}
  
  <div className="mt-4 flex flex-wrap w-full justify-start">
        {selectedSymptoms.map((symptom) => (
          <div
            key={symptom.id}
            className="group flex items-center bg-zinc-900 rounded-full px-4 py-1 text-sm transition-all group-hover:bg-red-500 gap-2"
          >
            {symptom.name}
            <button
              onClick={() => removeSymptom(symptom.id)}
              className="ml-2 text-xs hover:text-white rounded-full p-1"
            >
              &times;
            </button>
          </div>
        ))}
      </div>


        {/* Relevant conditions section */}
        {selectedSymptoms.length > 0 && relevantConditions.length > 0 && (
  <div className="mt-6 border p-3 rounded-xl w-full py-5">
    <div>
      {relevantConditions.map((condition, index) => (
        <div
          key={condition.id}
          className={`flex justify-between items-center p-2 px-4 ${
            index === 0 ? "rounded-tl-lg" : ""
          } ${index === relevantConditions.length - 1 ? "rounded-bl-lg" : ""} 
          ${getRarityBorderClasses(condition.rarity)} ${
            index % 2 === 1 ? "" : "bg-zinc-950"
          }`}
        >
          <div className="text-md">{condition.name}</div>
          <div className="flex flex-wrap space-x-1">
            {condition.symptoms
              .sort((a, b) => a.localeCompare(b))
              .map((symptom, index) => {
                const isSelected = selectedSymptoms.some(
                  (s) => s.name === symptom
                );
                return (
                  <div
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs md:text-sm ${
                      isSelected
                        ? "bg-zinc-500 text-white border border-white"
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
    {/* Centered div with explanatory text */}
    <div className="text-center mt-4 text-sm text-zinc-500">
      Colours correlate to the rarity of the condition.
    </div>
  </div>
)}



    </div>
  );
}
