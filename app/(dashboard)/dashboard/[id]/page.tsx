import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";

export const revalidate = 60;

export default async function Case({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: cases } = await supabase
    .from("cases")
    .select()
    .match({ specialty_name: id });

  if (!cases) {
    console.log(cases);
  }

  return (
    <>
      <Link
        href={"/specialty"}
        className="rounded-b-lg p-3 hover:bg-zinc-800"
      >
        Return to Specialties
      </Link>
      <aside className="w-2/3 gap-2 overflow-hidden overflow-y-auto">
        <h1 className="p-10 text-3xl">Specialty</h1>
        <h3 className="flex gap-2 flex-col p-5">
          {cases &&
            cases.map((c) => (
              <Link key={c.id} className="0" href={`/specialty/${c.id}`}>
                <h3 className="bg-slate-100 hover:bg-cyan-200 rounded-lg p-5">
                  {c.case_name}
                </h3>
              </Link>
            ))}
        </h3>
      </aside>
    </>
  );
}

// export async function generateStaticParams() {
//   const { data: approaches } = await supabase.from('cases').select('id')

//   return approaches?.map(({ id }) => ({
//     id,
//   }))
// }
