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
                <span className="flex gap-7 items-center py-3 pb-6 justify-between">
                  <div className="justify-items-start flex items-center gap-5">
                    <Link
                      href={"/approaches"}
                      className="w-8 h-8 active:scale-90"
                    >
                      <HiChevronLeft className="w-8 h-8 rounded-full hover:bg-zinc-800 border text-zinc-300 hover:border-zinc-500" />
                    </Link>
                    <h1 className="text-xl sm:text-3xl">
                      Approach to {i.title && i.title}
                    </h1>
                  </div>
                  {i?.symptomjson?.isHighYield && (
                    <p className=" bg-red-800/20 text-xs border px-3 py-1 rounded-full border-red-600/80 text-red-600/80 flex items-end justify-end">
                      High Yield
                    </p>
                  )}
                </span>

                <Accordion type="single" collapsible defaultValue="item-1">x
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Overall Approach</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-md leading-6 text-justify">
                        <Markdown>{i?.symptomjson?.overallapproach}</Markdown>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Differentials</AccordionTrigger>
                    <AccordionContent>
                      <div className="w-full text-sm text-left rtl:text-right bg-transparent border">
                        {i.differentialtable?.map((d: any, index: number) => (
                          <>
                            <div className="">
                              <div className="grid grid-col-3 ">
                                {d?.heading ? (
                                  <div className="border p-8 text-lg dotted-bg col-span-3 uppercase font-semibold">
                                    {d?.heading}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              {index === 0 && (
                                <div className="grid-cols-3 hidden md:grid">
                    
                                  <div className=" col-start-2 pt-7 uppercase font-semibold p-2">
                                    Characteristics
                                  </div>
                                  <div className="pt-7 uppercase font-semibold p-2">
                                    Associated Features
                                  </div>
                                </div>
                              )}

                              {d?.subheading ? (
                                <div className="p-3 uppercase font-semibold text-sm border">
                                  {d?.subheading}
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 border">
                              <div className="px-6 py-4 flex gap-2 items-center border">
                                {(() => {
                                  switch (d?.rarity) {
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
                                {d?.condition && d?.condition}
                              </div>
                              {d?.characteristics ? (
                                <div className="border p-3">
                                  {d?.characteristics}
                                </div>
                              ) : (
                                ""
                              )}
                              {d.associated_features ? <div className="border p-3">
                                
                                  {d?.associated_features}
                              </div>: ""}
                            </div>
                          </>
                        ))}

                        <p className="text-zinc-500 text-xs p-5 text-center">
                          Colours represent how commonly each condition arises.
                          Red represents rare, orange uncommon and green common.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {i?.symptomjson?.urgent_considerations && (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Urgent Considerations</AccordionTrigger>
                      <AccordionContent>
                        <>
                          <section className="w-full p-5 bg-red-800/20 rounded-xl border border-red-700 text-red-600">
                            {i?.symptomjson?.urgent_considerations}
                          </section>
                        </>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Approach to Hx</AccordionTrigger>
                    <AccordionContent>
                      <>
                        {Array.isArray(i?.historyjson) ? (
                          i.historyjson.map((d: any, index: number) => (
                            <>
                              <section className="grid grid-cols-1 lg:grid-cols-5">
                                <div className="col-span-1 uppercase font-semibold border p-5 dotted-bg text-base">
                                  {d?.question}
                                </div>
                                <div className="col-span-2 p-5 border text-justify">
                                  {d?.overview}
                                </div>

                                <div className="col-span-2 p-5 border text-justify">
                                  <Markdown>{d?.description}</Markdown>
                                </div>
                              </section>
                            </>
                          ))
                        ) : (
                          <p className="text-center text-zinc-500 p-10">
                            This will be filled in soon.
                          </p>
                        )}
                      </>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Approach to PES</AccordionTrigger>
                    <AccordionContent>
                      <>
                        {Array.isArray(i?.pesjson) ? (
                          i?.pesjson?.map((d: any, index: number) => (
                            <>
                              <div className="space-y-5">
                                {index === 0 && (
                                  <div className="border p-5 bg-green-800/20 rounded-xl border-green-800 text-green-700">
                                    {d?.summary}
                                  </div>
                                )}
                                <section className="grid grid-cols-1 md:grid-cols-8">
                                  <div className="col-span-3 p-5 border text-justify uppercase dotted-bg text-lg font-semibold lg:col-span-2">
                                    {d?.subheading}
                                  </div>

                                  <div className="col-span-5 p-5 border text-justify lg:col-span-6">
                                    <Markdown>{d?.description}</Markdown>
                                  </div>
                                </section>
                              </div>
                            </>
                          ))
                        ) : (
                          <p className="text-center text-zinc-500 p-10">
                            This will be filled in soon.
                          </p>
                        )}
                      </>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {i?.symptomjson?.management && (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        Approach to Management
                      </AccordionTrigger>
                      <AccordionContent>
                        <p>{i?.symptomjson?.management}</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Investigations</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid xl:grid-cols-2 grid-cols-1 gap-5">
                        <section className="col-span-1">
                          <h1 className="w-full dotted-bg text-xl p-5 border uppercase font-semibold">
                            General Investigations
                          </h1>
                          <div className="grid grid-cols-3 ">
                            {i?.investigationjson ? (
                              i?.investigationjson?.map((d: any) => (
                                <>
                                  <div className="col-span-1 border p-3 uppercase font-semibold">
                                    {d?.investigation}
                                  </div>{" "}
                                  <div className="col-span-2 border p-3 text-justify">
                                    {d?.description}
                                  </div>
                                </>
                              ))
                            ) : (
                              <p className="text-zinc-500">Check back soon</p>
                            )}{" "}
                          </div>
                        </section>
                        <section className="col-span-1">
                          <h1 className="w-full dotted-bg text-xl p-5 uppercase font-semibold border">
                            Specific Investigations
                          </h1>
                          <div className="grid grid-cols-3">
                            {i?.specificinvestigationjson ? (
                              i?.specificinvestigationjson?.map((d: any) => (
                                <>
                                  <div className="col-span-1 border p-3 uppercase font-semibold">
                                    {d?.investigation}
                                  </div>{" "}
                                  <div className="col-span-2 border p-3 text-justify">
                                    {d?.description}
                                  </div>
                                </>
                              ))
                            ) : (
                              <p className="text-zinc-500">Check back soon</p>
                            )}
                          </div>
                        </section>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>References</AccordionTrigger>
                    <AccordionContent>
                      <>
                        <div className="border p-5 rounded-xl dotted-bg">
                          <Markdown>
                            {i?.symptomjson?.references
                              ? i.symptomjson?.references
                              : "Check back soon"}
                          </Markdown>
                        </div>
                        <p className="text-zinc-500 w-full justify-center flex p-3">
                          This is referenced using the APA referencing style
                        </p>
                      </>
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
