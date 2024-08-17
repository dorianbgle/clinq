import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { IoIosReturnRight } from "react-icons/io";
import { IoDocumentTextSharp } from "react-icons/io5";

export const revalidate = 60;

// interface Case {
//   id: string;
//   case_name: string;
//   presenting_symptom: string;
//   diagnosis: string;
//   specialty_name: string;
//   casejson: CaseJson; 
// }

// interface CaseJson {
//     hopc: string;
//     case_name: string,
//     diagnosis: string;
//     social_hx: string;
//     case_title: string;
//     medical_hx: string;
//     references: string;
//     station_type: string;
//     time_alloted: number;
//     marking_table: string;
//     medication_hx: string;
//     systems_review: string;
//     case_discussion: string;
//     clinical_pearls: string;
//     case_instructions: string;
//     presenting_symptom: string;
//     additional_questions: string;
// } 

// interface Specialty {
//   id: string;
//   title: string;
// }

// interface CaseProps {
//   id: string;
// }

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

  const sortedCases = cases
    ? [...cases].sort((a, b) => a.case_name.localeCompare(b.case_name))
    : [];
  const casesLength = cases ? cases.length : 0;

  const { data: specialty } = await supabase
    .from("specialties")
    .select()
    .match({ id });

  const specialtyName = specialty && specialty.map((item) => item.title);

  return (
    <>
      <aside className="w-full gap-2 overflow-hidden overflow-y-auto border m-2 select-none">
        <h1 className="p-8 text-3xl flex gap-3 items-center dotted-bg">
          <Link href={"/specialty"} className="h-5 w-5 active:scale-90">
            <MdArrowBackIos className="hover:text-zinc-500 sm:text-xl text-lg" />
          </Link>{" "}
          <header className="flex flex-col">
            {specialtyName && specialtyName[0] === "General Practice"
              ? `${specialtyName} Clinic`
              : `${specialtyName} Ward List`}
            <p className="text-xs sm:text-sm text-zinc-500">
              Patients on our ward change often. Keep up to date with our
              patients&apos; journies. See the {casesLength} patients on this
              ward.
            </p>
          </header>
        </h1>



        <div className="">
        <div className="p-3 grid grid-cols-10 gap-4 items-center uppercase text-sm font-semibold text-zinc-500 border-b border-zinc-800">
        <div className="col-span-2 sm:col-span-1">Bed</div>
        <div className="col-span-3 sm:col-span-2">Patient Name</div>
        <div className="col-span-2 hidden sm:flex">Age</div>
        <div className="col-span-2 hidden sm:flex">Presenting Complaint</div>
        <div className="col-span-3">Diagnosis</div>
      </div>
      {sortedCases && sortedCases.map((c, index) => (
        <Link
          key={c.id}
          className={`block ${index % 2 === 0 ? 'bg-zinc-950 active:ml-3 hover:bg-zinc-800/20 border hover:border-zinc-500 border-zinc-800 text-zinc-500' : 'active:ml-3 hover:bg-zinc-800/20 hover:border-zinc-500 border border-zinc-800 text-zinc-500'}`}
          href={`/specialty/preview/${c.id}`}
        >
          <div className="p-3 grid grid-cols-10 gap-4 items-center">
            <div className="flex items-center col-span-2 sm:col-span-1">
          <IoIosReturnRight className="h-3 w-3 mr-2" />
              <IoDocumentTextSharp className="h-4 w-4 text-zinc-500 mr-2" />
            {index + 1}
            </div>
            <div className="col-span-3 flex sm:col-span-2">
              {c.case_name}
              </div>
            <div className="col-span-2 hidden sm:flex">{c.casejson?.age}</div>
            <div className="col-span-2 hidden sm:flex">{c.casejson?.presenting_symptom || ""}</div>
            <div className="col-span-2">{c.casejson?.diagnosis || ""}</div>
          </div>
        </Link>
      ))}
    </div>
      </aside>
    </>
  );
}
