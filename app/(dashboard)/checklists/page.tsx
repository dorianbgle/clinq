"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useState, Suspense, lazy } from "react";

// Lazy load components
const FoundationalPES = lazy(() => import("../components/(checklist-components)/foundationalPES"));
const FoundationalHx = lazy(() => import("../components/(checklist-components)/foundationalHx"));
const SpecialisedHx = lazy(() => import("../components/(checklist-components)/specialisedHx"));
const SpecialisedPES = lazy(() => import("../components/(checklist-components)/specialisedPES"));

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      <Skeleton className="w-2/3 h-[20px] rounded-full animate-pulse" />
      <Skeleton className="w-2/4 h-[20px] rounded-full animate-pulse" />
      <Skeleton className="w-1/4 h-[20px] rounded-full animate-pulse" />{" "}
    </div>
  );
};

const Checklists = () => {
  const [selectedChecklist, setSelectedChecklist] = useState<string | null>(
    "foundationalHx"
  );

  // Memoized click handler
  const handleButtonClick = (type: string) => {
    setSelectedChecklist(type);
  };

  return (
    <main className="select-none p-5">
      <header className="mb-4">
        <h1 className="text-2xl">Checklists</h1>
        <h3 className="text-zinc-500">
          Study our approaches section to formulate your own approach to each
          symptom
        </h3>
      </header>

      <div className="grid grid-cols-2 gap-1 w-full border p-1 rounded-xl md:grid-cols-4 text-zinc-500">
  <button
    className={`p-2 py-1 rounded-tl-xl md:rounded-l-xl ${
      selectedChecklist === "foundationalHx"
        ? "bg-zinc-800/60 border border-zinc-500"
        : "border"
    }`}
    onClick={() => handleButtonClick("foundationalHx")}
  >
    Foundational Hx
  </button>
  <button
    className={`p-2 py-1 rounded-tr-xl md:rounded-none ${
      selectedChecklist === "foundationalPES"
        ? "bg-zinc-800/60 border border-zinc-500"
        : "border"
    }`}
    onClick={() => handleButtonClick("foundationalPES")}
  >
    Foundational PES
  </button>
  <button
    className={`p-2 py-1 rounded-bl-xl md:rounded-none ${
      selectedChecklist === "specialisedHx"
        ? "bg-zinc-800/60 border border-zinc-500"
        : "border"
    }`}
    onClick={() => handleButtonClick("specialisedHx")}
  >
    Specialised Hx
  </button>
  <button
    className={`p-2 py-1 rounded-br-xl md:rounded-r-xl ${
      selectedChecklist === "specialisedPES"
        ? "bg-zinc-800/60 border border-zinc-500"
        : "border"
    }`}
    onClick={() => handleButtonClick("specialisedPES")}
  >
    Specialised PES
  </button>
</div>


      <div className="flex flex-col py-8">
        <Suspense fallback={<SkeletonLoader />}>
          {selectedChecklist === "foundationalHx" && <FoundationalHx />}
          {selectedChecklist === "foundationalPES" && <FoundationalPES />}
          {selectedChecklist === "specialisedHx" && <SpecialisedHx />}
          {selectedChecklist === "specialisedPES" && <SpecialisedPES />}
        </Suspense>
      </div>
    </main>
  );
};

export default Checklists;
