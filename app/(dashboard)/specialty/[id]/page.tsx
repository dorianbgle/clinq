import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { IoIosReturnRight } from "react-icons/io";
import { IoDocumentTextSharp } from "react-icons/io5";

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

  const sortedCases = cases ? [...cases].sort((a, b) => a.case_name.localeCompare(b.case_name)) : [];



  return (
    <>
      <aside className="w-full gap-2 overflow-hidden overflow-y-auto border m-2 select-none">
        <h1 className="p-8 text-3xl flex gap-3 items-center dotted-bg">
          <Link href={"/specialty"} className="h-5 w-5 active:scale-90">
            <MdArrowBackIos className="hover:text-zinc-500 text-xl" />
          </Link>{" "}
          <header className="flex flex-col">
            Patient List
            <p className="text-sm text-zinc-500">Patients on our ward change often. Keep up to date with our patients&apos; journies.</p>
          </header>
        </h1>

        <h3 className="grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 border select-none">
          {sortedCases &&
            sortedCases.map((c, index) => (
              <Link
                key={c.id}
                className="active:scale-90"
                href={`/specialty/preview/${c.id}`}
              >
                <h3 className={ index % 2 === 0 ? `bg-zinc-950 hover:bg-zinc-800/20 border hover:border-zinc-500 border-zinc-800 text-zinc-500`: "hover:bg-zinc-800/20 hover:border-zinc-500 border border-zinc-800 text-zinc-500"}>
                  <div className="p-3 flex items-center">
                    < IoIosReturnRight className="h-3 w-3"/> &nbsp;&nbsp; 
                    <IoDocumentTextSharp className="h-4 w-4 text-zinc-500"/> &nbsp;&nbsp;  
                    {c.case_name}
                  </div>
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
