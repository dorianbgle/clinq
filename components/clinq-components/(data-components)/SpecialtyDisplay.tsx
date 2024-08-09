import Link from "next/link";
import supabase from "@/packages/lib/supabase/client";

const SpecialtyDisplay = async () => {
  const { data: specialties } = await supabase
    .from("specialties")
    .select("id, title")
    .order("title", { ascending: true });

  return (
    <>
      <span className="p-5 gap-5 select-none">
        <h1 className="text-2xl font-medium">Browse Cases by Specialty</h1>
        <p className="text-zinc-500">
          Select from the following specialties to view our collection of cases
        </p>
      </span>
      <section className="w-full items-center grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-3 border justify-center select-none text-zinc-500">
        {specialties &&
          specialties.map((s, index) => (
            <Link
              href={`/specialty/${s.id}`}
              key={s.id}
              className={`hover:bg-zinc-800/20 p-2 py-3 items-center w-full flex justify-center border hover:border-zinc-500 border-zinc-800 hover:border active:scale-90 hover:text-zinc-300 ${
                index % 2 === 0 ? "bg-zinc-950" : "bg-zinc-950/10"
              }`}
            >
              <p>{s.title}</p>
            </Link>
          ))}
      </section>
    </>
  );
};

export default SpecialtyDisplay;
