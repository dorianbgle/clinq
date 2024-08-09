import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { FaRegCheckSquare } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";

export const revalidate = 60;

export default async function Case({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: cases } = await supabase
    .from("cases")
    .select()
    .match({ id: id });

  if (!cases) {
    console.log(cases);
  }

  const scripts = [
    {
      id: 1,
      name: "Patient Script",
      href: "case",
      icon: <IoDocumentsSharp/>
    },
    {
      id: 2,
      name: "Marking Criteria",
      href: "criteria",
      icon: <FaRegCheckSquare/>
    },
  ];

  return (
    <aside className="w-full gap-2 overflow-hidden overflow-y-auto overscroll-contain select-none">
      <h3 className="flex gap-2 flex-col w-full">
        {cases &&
          cases.map((c) => (
            <section
              key={c.id}
              className="flex items-center justify-center py-3"
            >
              <header className="p-10 font-light lg:w-2/3 grid grid-cols-1 xl:grid-cols-3 justify-evenly gap-3">
                <div className="grid col-span-2">
                  <h3 className="text-3xl py-5 flex items-center gap-2">
                    <Link
                      href={`/specialty/` + `${c.specialty_name}`}
                      className="active:scale-90"
                    >
                      <MdArrowBackIos className="hover:text-zinc-500 text-xl" />
                    </Link>
                    &nbsp;{c.casejson.case_name}
                  </h3>
                  <h4 className="py-2 text-sm font-semibold text-zinc-500 uppercase">
                    {" "}
                    Candidate Instructions
                  </h4>
                  <p className="text-zinc-500">
                    1{")"} {c.casejson?.case_instructions}{" "}
                  </p>
                  <p className="text-zinc-500">
                    2{")"} You have been permitted {c.casejson.time_alloted}{" "}
                    minutes to complete this case
                  </p>
                  {c.casejson.additional_questions ? (
                    <p className="text-zinc-500">
                      3{")"} {c.casejson.additional_questions}{" "}
                    </p>
                  ) : null}
                </div>

                <div className="py-5 gap-4 flex flex-col items-center justify-end">
                  {scripts.map((script) => (
                    <Link
                      key={script.id}
                      href={`/specialty/` + `${script.href}` + `/${c.id}`}
                      className="p-2 border gap-2 hover:border-zinc-500 hover:bg-zinc-800/20 w-4/5 items-center flex justify-center active:scale-90 text-zinc-500"
                    >
                      {script.icon}
                      {script.name}
                    </Link>
                  ))}
                </div>
              </header>
            </section>
          ))}
      </h3>
    </aside>
  );
}
