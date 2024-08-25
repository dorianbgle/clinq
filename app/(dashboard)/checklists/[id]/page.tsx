import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import style from "./markdown-styles.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export const revalidate = 60;

export default async function Checklists({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: symptoms } = await supabase
    .from("checklists")
    .select()
    .match({ id });

  if (!symptoms) {
    console.log(symptoms);
  }

  return (
    <>
      <aside className="w-full justify-center items-center flex-col flex gap-2 overflow-hidden overflow-y-auto">
        <h3 className="flex gap-2 flex-col lg:w-2/3 items-center justify-center">
          {symptoms &&
            symptoms?.map(({ checklist_name, checklistjson }) => (
              <>
                <h1 className="pt-10  pb-8 w-full flex gap-3 items-center dotted-bg p-6 text-3xl lg:text-4xl xl:text-5xl">
                  <Link
                    href={"/checklists"}
                    className="w-8 h-8 flex items-center"
                  >
                    <FaArrowLeftLong className="hover:text-zinc-800 h-5 w-5" />
                  </Link>
                  {checklist_name} Checklist
                </h1>
                {checklistjson?.map((i: any) => {
                  <p className="text-justify p-5 dotted-bg">{i.overview}</p>;
                })}

                <table className="overflow-x-auto w-full">
                  <tbody className="border">
                    <>
                      {" "}
                      {checklistjson?.map((i: any) => (
                        <>
                          {i?.content ? (
                            <tr className="p-5">
                              <>
                                <td className="p-5 border align-top uppercase text-sm text-zinc-500 font-semibold">
                                  {i?.subheading}
                                </td>
                                <td className="p-5 border">
                                  <Markdown className={style.reactMarkDown}>
                                    {i?.content}
                                  </Markdown>
                                </td>{" "}
                              </>
                            </tr>
                          ) : (
                            <>
                              <tr className="p-5 items-center flex w-full">
                                <td className=" align-top uppercase text-sm text-zinc-500 font-semibold w-full">
                                  {i?.subheading}
                                </td>
                              </tr>
                            </>
                          )}
                        </>
                      ))}
                    </>
                  </tbody>
                </table>
              </>
            ))}
        </h3>
      </aside>
    </>
  );
}
