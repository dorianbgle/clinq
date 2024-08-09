import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import Markdown from "markdown-to-jsx";
import { HiChevronLeft } from "react-icons/hi";
import { FaCircle } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const revalidate = 60;

export default async function Case({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data: symptoms } = await supabase
    .from("symptoms")
    .select()
    .match({ id });

  if (!symptoms) {
    console.log(symptoms);
  }

  return (
    <>
      <aside className="gap-2 overflow-hidden overflow-y-auto border p-7 md:px-20 select-none">
        <h3 className="flex gap-2 flex-col pb-5">
          {symptoms &&
            symptoms.map((i: any) => (
              <>
                {/* Consider ways to reduce the repetition of the current code */}
                <span className="flex gap-7 items-center py-3 pb-6">
                  <Link href={"/approaches"} className="w-8 h-8 active:scale-90">
                    <HiChevronLeft className="w-8 h-8 rounded-full hover:bg-zinc-800 border text-zinc-300" />
                  </Link>
                  <h1 className="text-3xl">Approach to {i.title}</h1>
                  {i.symptomjson.isHighYield ? (
                    <p className=" bg-red-800/20 text-xs border px-3 py-1 rounded-full border-red-600/80 text-red-600/80 flex items-center justify-center">
                      High Yield
                    </p>
                  ) : (
                    ""
                  )}
                </span>

                <Accordion type="single" collapsible defaultValue="item-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Overall Approach</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-md leading-6 text-justify">
                        <Markdown>{i?.symptomjson.overallapproach}</Markdown>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Differentials</AccordionTrigger>
                    <AccordionContent>
                      <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-5">
                        <table className="w-full text-sm text-left rtl:text-right bg-transparent border">
                        {i.differentialtable ? (
                          ""
                        ) : (
                          <p className="text-center text-zinc-500 p-10">
                            This will be filled in soon.
                          </p>
                        )}
                          {i.differentialtable?.map((d: any) => (
                            <>
                              <thead className="uppercase bg-transparent p-10">
                                {d.heading ? (
                                  <tr>
                                    <th className="p-8">{d.heading}</th>
                                    <th></th>
                                  </tr>
                                ) : null}
                                {d.subheading ? (
                                  <tr>
                                    <th className="p-3">{d.subheading}</th>
                                    <th></th>
                                  </tr>
                                ) : null}
                              </thead>
                              <tbody className="border">
                                <tr>
                                  <td className="px-6 py-4 flex gap-2 items-center">
                                    {(() => {
                                      switch (d.rarity) {
                                        case "rare":
                                          return (
                                            <FaCircle className="text-red-600" />
                                          );
                                        case "common":
                                          return (
                                            <FaCircle className="text-green-600" />
                                          );
                                        case "uncommon":
                                          return (
                                            <FaCircle className="text-yellow-600" />
                                          );
                                        default:
                                          return (
                                            <FaCircle className="text-grey-800" />
                                          );
                                      }
                                    })()}
                                    {d.condition}
                                  </td>
                                </tr>
                              </tbody>
                            </>
                          ))}
                        </table>
                        <p className="text-zinc-500 text-xs p-5 text-center">
                            Colours represent how commonly each condition
                            arises. Red represents rare, orange uncommon and
                            green common.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Approach to Hx</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-md leading-6 text-justify">
                        <Markdown>
                        {i?.symptomjson.hx}
                        </Markdown>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Approach to PES</AccordionTrigger>
                    <AccordionContent>
                      <p>{i?.symptomjson.pes}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Approach to Management</AccordionTrigger>
                    <AccordionContent>
                      <p>{i?.symptomjson.management}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>General Investigations</AccordionTrigger>
                    <AccordionContent>
                      <p><Markdown>{i?.symptomjson.generalinvestigation}</Markdown></p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Specific Investigations</AccordionTrigger>
                    <AccordionContent>
                      <p>{i?.symptomjson.specificinvestigations}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>References</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        <Markdown>{i?.symptomjson.references}</Markdown>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
            ))}
        </h3>
      </aside>
    </>
  );
}
