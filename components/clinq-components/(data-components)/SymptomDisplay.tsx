"use client";

import Link from "next/link";
import supabase from "@/packages/lib/supabase/client";
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";

const SymptomDisplay = () => {
  // Try for future components making them server components to see if it works.
  const [specialties, setSpecialties] = useState<
    { id: string; title: string }[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    getSpecialties();
  }, []);

  const getSpecialties = async () => {
    const { data } = await supabase
      .from("symptoms")
      .select("id, title")
      .order("title", { ascending: true });
    setSpecialties(data);
    setLoading(false);
  };

  const getFromandTo = () => {
    const ITEMSPERPAGE = 10;
    let from = page * ITEMSPERPAGE;
    let to = page * ITEMSPERPAGE + 9;
    return { from, to };
  };

  const [query, setQuery] = useState("");

  const filteredItems = specialties?.filter((item) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });

  let arr = filteredItems?.slice();
  let { from, to } = getFromandTo();
  let displayedResults = arr?.slice(from, to);

  let maxPages = Math.ceil((filteredItems?.length ?? 0) / 10);

  let rightDisabled;

  if (page === maxPages - 1) {
    rightDisabled === true;
  }

  const clearSearch = () => {
    if (query.length > 0) {
      setQuery("");
      setPage(0);
    }
  };

  return (
    <>
      <span className="py-5 gap-2 flex flex-col md:w-2/3 select-none">
        <h1 className="text-2xl">Approaches</h1>
        <h3 className="text-zinc-500">
          Study our approaches section to formulate your own approach to each
          symptom
        </h3>
        <section className="flex gap-2 items-center">
          <input
            type="text"
            value={query}
            className=" flex p-2 bg-transparent border w-full rounded-full text-sm focus:border-zinc-500 focus:outline-none px-4"
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search for Symptoms`}
            onFocus={() => setPage(0)}
          />
          <button
            onClick={clearSearch}
            className="text-zinc-600 rounded-full border hover:bg-zinc-500 flex items-center justify-center h-7 w-7"
            disabled={query === ""}
          >
            x
          </button>
        </section>
      </span>
      <section className="flex lg:w-2/3 items-center flex-col border select-none">
        {loading && (
          <div className=" space-y-8 p-10 justify-center flex flex-col w-full h-screen items-center animate-pulse">
            <Skeleton className="h-4 w-[200px] rounded-full" />
            <Skeleton className="h-4 w-[200px] rounded-full" />
            <Skeleton className="h-4 w-[200px] rounded-full" />
            <Skeleton className="h-4 w-[200px] rounded-full" />
            <Skeleton className="h-4 w-[200px] rounded-full" />
          </div>
        )}
        {displayedResults &&
          displayedResults.map((s) => (
            <Link
              href={`/approaches/${s.id}`}
              key={s.id}
              className="hover:bg-zinc-800/20 py-3 border-b items-center hover:text-zinc-300 w-full flex justify-center rounded-lg border-zinc-800 hover:border text-zinc-500 active:scale-90"
            >
              <p>{s.title}</p>
            </Link>
          ))}
        {displayedResults?.length === 0 ? (
          <h3 className="text-xl text-zinc-500 p-10">No results found</h3>
        ) : (
          ""
        )}
        <footer className="flex gap-2 items-center justify-center">
          <button
            onClick={() => {
              setPage(page - 1);
            }}
            className={`p-5 ${page === 0 ? "invisible" : ""}`}
            disabled={page === 0}
          >
            <FaArrowLeftLong className="text-zinc-500" />
          </button>
          <h2 className="text-zinc-500">Page {page + 1}</h2>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            className={`p-5 ${page + 1 === maxPages ? "invisible" : ""}`}
            disabled={page + 1 === maxPages}
          >
            <FaArrowRightLong className="text-zinc-500" />
          </button>
        </footer>
      </section>
    </>
  );
};

export default SymptomDisplay;
