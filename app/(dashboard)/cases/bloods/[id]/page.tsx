import supabase from "@/packages/lib/supabase/client";
import { Key } from "react";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export const revalidate = 60;

// Consider using Types/Interfaces
interface AdmissionLetterType {
    id: number;
    admissionjson: Record<string, any>;
    created_at: Date;
    case: string;
    letterjson: Record<string, any>; 
}

export default async function Admission({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: caseObject } = await supabase
    .from("case_documents")
    .select()
    .match({ case: id });

  return (
    <>
      {caseObject &&
        caseObject.map(({ admissionjson }, index) => (
          <section
            className="flex md:items-center md:justify-center"
            key={index}
          >
            {admissionjson.map((i: any, index: Key | null | undefined) => (
              <section
                key={index}
                className="lg:w-2/3 sm:w-full p-8 py-10 flex flex-col select-none"
              >
                <Link
                  href={`/cases/files/${id}`}
                  className="w-8 h-8 flex items-center active:scale-90"
                >
                  <FaArrowLeftLong className="hover:text-zinc-800 h-5 w-5 active:scale-90" />
                </Link>
                <br />
                <p className="block text-start">
                  {" "}
                  <h2 className="text-4xl bg-gradient-to-r from-purple-400 to-purple-200 inline-block text-transparent bg-clip-text font-medium">
                    ClinQ
                  </h2>{" "}
                  <span className="text-sm uppercase block">
                    Pathology Lab{" "}
                  </span>
                </p>
                <p className="items-end flex justify-end">{i.address}</p>
                <br />
                <p>Dear&nbsp;{i.clinician},</p>
                <br />
                <br />
                <p className="w-full hyphens-auto text-justify">
                    Thank you for your referral ClinQ Pathology Lab. {` `}
                  <Markdown>{i.admissionletter_contents}</Markdown>
                </p>
                <br />
                <p>
                  Regards,
                  <br />
                  {i.clinician}
                </p>
              </section>
            ))}
          </section>
        ))}
    </>
  );
}
