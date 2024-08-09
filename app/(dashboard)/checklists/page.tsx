"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useState, Suspense, lazy } from "react";

// Lazy load components
const FoundationalChecklists = lazy(
  () => import("../components/foundationalChecklists")
);
const ChecklistDisplay = lazy(() => import("../components/checklistDisplay"));

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
    "foundational"
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

      <div className="flex text-zinc-500 w-full md:w-1/3 border p-1 rounded-xl">
        <button
          className={`flex-1 p-2 py-1 rounded-l-xl ${
            selectedChecklist === "foundational"
              ? "bg-zinc-800/90 border border-zinc-500"
              : "border"
          }`}
          onClick={() => handleButtonClick("foundational")}
        >
          Foundational Checklists
        </button>
        <button
          className={`flex-1 p-2 py-1 rounded-r-xl ${
            selectedChecklist === "specialised"
              ? "bg-zinc-800/90 border border-zinc-500"
              : "border"
          }`}
          onClick={() => handleButtonClick("specialised")}
        >
          Specialised Checklists
        </button>
      </div>

      <div className="flex flex-col py-8">
        <Suspense fallback={<SkeletonLoader />}>
          {selectedChecklist === "foundational" && <FoundationalChecklists />}
          {selectedChecklist === "specialised" && <ChecklistDisplay />}
        </Suspense>
      </div>
    </main>
  );
};

export default Checklists;
