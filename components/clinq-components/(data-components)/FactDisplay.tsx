"use client";

import supabase from "@/packages/lib/supabase/client";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FactDisplay = () => {
  const [fact, setFact] = useState<
    { id: string; fact_content: string }[] | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const getFacts = async () => {
      const { data } = await supabase
        .from("random_fact")
        .select("id, fact_content")
        .limit(1);
      setFact(data as { id: string; fact_content: string }[] | null); // Update the type of data
      setLoading(false);
    };
    getFacts();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col gap-2">
        <Skeleton className="w-full h-[20px] rounded-full animate-pulse" />
        <Skeleton className="w-2/3 h-[20px] rounded-full animate-pulse" />
      </section>
    );
  }

  return (
    <>
      {fact &&
        fact.map((f) => (
          <p key={f.id} className="text-justify md:visible text-sm md:text-base">
            {`"`}
            {f.fact_content}
            {`"`}
          </p>
        ))}
    </>
  );
};

export default FactDisplay;
