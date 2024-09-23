import supabase from "@/packages/lib/supabase/client";
import Markdown from "markdown-to-jsx";
import style from "./markdown-styles.module.css";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";

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

  return (
    <aside className="xl:w-2/3 gap-2 overflow-hidden overflow-y-auto overscroll-contain border select-none">
      <h3 className="flex gap-2 flex-col w-full">
        {cases &&
          cases.map((c) => (
            <section key={c.id} className="">
              <header className="rounded-lg p-5 font-light w-full dotted-bg border">
                <h3 className="text-3xl p-5 flex items-center">
                  <Link href={`/specialty/preview/${id}`}>
                    <MdArrowBackIos className="hover:text-zinc-300 text-xl" />
                  </Link>
                  &nbsp;{c.case_name}
                </h3>
              </header>
              <section className="px-10 py-7 space-y-5 rounded-3xl">
                <Link
                  href={`/specialty/criteria/${id}`}
                  className="text-zinc-500 justify-end flex hover:underline underline-offset-4"
                >
                  View the Marking Criteria
                </Link>

                {/* This needs to be organised */}
                <p>
                  <span className="text-xl py-2">Presenting Complaint</span>
                  <br />
                  {c.casejson?.presenting_complaint}
                </p>
                <p>
                  <span className="text-xl py-2">
                    History of Presenting Complaint
                  </span>
                  <br />
                  {c.casejson?.hopc}
                </p>
                <p>
                  <span className="text-xl py-2">Systems Review</span>
                  <br />
                  {c.casejson?.systems_review}
                </p>
                <p>
                  <span className="text-xl py-2">Past Medical History</span>
                  <br />
                  {c.casejson?.medical_hx}
                </p>
                <p>
                  <span className="text-xl py-2">Medication History</span>
                  <br />
                  {c.casejson?.medication_hx}
                </p>
                <p>
                  <span className="text-xl py-2">Social History</span>
                  <br />
                  <Markdown className={[style.reactMarkdown, ""]}>
                    {c.casejson?.social_hx}
                  </Markdown>
                </p>
                <section className="flex items-center border rounded-xl bg-zinc-950 text-lg text-zinc-500">
                  <h2 className="pl-4 pr-3 py-3 text-start bg-zinc-900 rounded-l-xl">Diagnosis</h2>&nbsp;&nbsp;&nbsp;&nbsp;
                  <p className="">{c.casejson?.diagnosis}</p>
                </section>
              </section>
            </section>
          ))}
      </h3>
    </aside>
  );
}
