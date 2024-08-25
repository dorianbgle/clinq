"use client";

import Link from "next/link";
import supabase from "@/packages/lib/supabase/client";
import { useEffect, useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";

const SymptomDisplay = () => {
  const [specialties, setSpecialties] = useState<
    { id: string; title: string }[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [fetchingItemId, setFetchingItemId] = useState<string | null>(null); // Track the ID being fetched
  const [isFetching, setIsFetching] = useState(false); // Track if any item is being fetched
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

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

  const filteredItems = specialties?.filter((item) => {
    return item.title.toLowerCase().includes(query.toLowerCase());
  });

  let arr = filteredItems?.slice();
  let { from, to } = getFromandTo();
  let displayedResults = arr?.slice(from, to);

  let maxPages = Math.ceil((filteredItems?.length ?? 0) / 10);

  let rightDisabled;

  if (page === maxPages - 1) {
    rightDisabled = true;
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
            className=" flex p-2 bg-transparent border w-full  rounded-full text-sm focus:border-zinc-500 focus:outline-none px-4"
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
          displayedResults.map((s, index) => (
            <Link
              href={`/approaches/${s.id}`}
              key={s.id}
              className={`hover:bg-zinc-800/20 py-3 border-b items-center hover:border-zinc-500 hover:text-zinc-300 w-full flex justify-center rounded-lg border-zinc-800 hover:border text-zinc-500 active:ml-5 ${
                index % 2 === 1 ? "bg-zinc-950" : ""
              } ${isFetching ? "pointer-events-none opacity-50" : ""}`} // Disable and style other links when fetching
              onClick={() => {
                setFetchingItemId(s.id); // Set fetchingItemId to current item's ID
                setIsFetching(true); // Set isFetching to true
              }}
            >
              <div className="flex items-center space-x-3">
                <p>{s.title}</p>{" "}
                {fetchingItemId === s.id && ( // Show loader only for the fetching item
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
                )}
              </div>
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
