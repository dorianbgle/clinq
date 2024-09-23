import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export const revalidate = 60;

const CaseFiles = async () => {
  const { data: case_files } = await supabase
    .from("case_files")
    .select()
    .order("id", { ascending: true });
  return (
    <>
      <span className="p-5 gap-5 w-2/3 relative select-none">
        <h1 className="text-2xl">Long Stay Patient Files</h1>
        <h3 className="text-zinc-500">
          This section is designed to expose students to the complexities of
          medicine and encourage them to think of appropriate steps to take in
          situations.
        </h3>
      </span>

      <section className="grid grid-cols-1 justify-evenly gap-2 p-2 xl:w-2/3 select-none">
        {case_files &&
          case_files.map((i: any, index) => (
            <>
              <Link
                className="h-28 border group dotted-bg hover:border-zinc-400 text-zinc-500 p-5 flex flex-col justify-center text-3xl font-light active:ml-3"
                key={index}
                href={`/cases/files/${i.id}`}
              >
                <span className="flex items-center group-hover:text-zinc-400">
                  Case Study #{i.casefilesjson.id}&nbsp;
                  {i.casefilesjson.patient_name}
                  {i.casefilesjson.age}
                  &nbsp;
                  <FaArrowRight className="h-5 w-5" />
                </span>
                <div
                  className=" line-clamp-1 text-base truncate
                "
                >
                  {i.casefilesjson.snippet}
                </div>
              </Link>
            </>
          ))}
      </section>
    </>
  );
};

export default CaseFiles;
