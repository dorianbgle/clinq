import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import { FaFileAlt } from "react-icons/fa";
import { IoIosReturnRight } from "react-icons/io";
import Image from "next/image";

export const revalidate = 60;

export default async function Case({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: cases } = await supabase
    .from("case_files")
    .select()
    .match({ id });

  // var caseFileArray = cases && cases.casefilesjson[id]
  // var publicURL = caseFileArray.images

  const { data: imageUrlObject } = await supabase.storage
    .from('scans')
    .getPublicUrl('asdfgm.jpeg');

  // const imageUrl =
  //   "https://xfnubpskcjerbulvywkd.supabase.co/storage/v1/object/public/scans/asdfgm.jpeg";

  // https://xfnubpskcjerbulvywkd.supabase.co/storage/v1/object/public/scans/asdfssds.jpeg

  return (
    <>
      <aside className="lg:w-2/3 gap-2 overflow-hidden overflow-y-auto select-none">
        {/* <Image src={`${data.publicUrl}`} alt="CXR" width={500} height={500}/> */}
        <Link
          className="text-zinc-500 hover:underline underline-offset-4 flex w-full justify-end p-3"
          href={"/cases"}
        >
          Browse Cases
        </Link>
        <section className="w-full">
          {cases &&
            cases.map(({ id, files, casefilesjson, index }) => (
              <>
                <h1 className="text-3xl p-4 py-8 text-zinc-500 dotted-bg border">
                  Case Study # {casefilesjson.id}&nbsp;{casefilesjson.patient_name}
                  {casefilesjson.age}
                </h1>
              
                {files.map((i: any) => (
                  <>
                    <Link
                      className={`flex gap-2 items-center text-zinc-500 border p-2 px-3 hover:bg-zinc-900 hover:underline underline-offset-4 hover:border-zinc-500 ${
                        i.id % 2 === 0 ? "bg-zinc-950" : "bg-zinc-900/50"
                      }`}
                      key={index}
                      href={'/cases/' + i?.href + `/` + id}
                    >
  
                      <IoIosReturnRight className="h-5 w-5" />
                      <FaFileAlt className="h-5 w-5" />
                      <>{i.file}</>
                    </Link>
                  </>
                ))}
              </>
            ))}
              <section className="p-10 w-full flex justify-center">

            {/* Add this in the radiology section */}
            {/* <Image
              src={imageUrlObject.publicUrl} // Access the publicUrl property of the imageUrl object
              alt="Description of the image"
              width={300} // Adjust the width
              height={300} // Adjust the height
              className="border-4 hover:border-zinc-200 rounded-xl h-auto max-w-full"
            /> */}
            </section>
        </section>
      </aside>
    </>
  );
}
