"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import supabase from "@/packages/lib/supabase/client";
import Markdown from "markdown-to-jsx";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { FaRegCheckSquare } from "react-icons/fa";

export default function Case({ params: { id } }: { params: { id: string } }) {
  const [cases, setCases] = useState<any[]>([]);
  const [tableSize, setTableSize] = useState<number[]>([]);
  const [checkedBoxes, setCheckedBoxes] = useState<Set<number>>(new Set());

  useEffect(() => {
    async function fetchData() {
      const { data: fetchedCases } = await supabase
        .from("cases")
        .select()
        .match({ id: id });

      if (fetchedCases) {
        setCases(fetchedCases);
        setTableSize(fetchedCases.map((c: any) => c.markingtablejson.length));
      }
    }

    fetchData();
  }, [id]);

  const handleCheckboxChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCheckedBoxes(prev => {
      const newCheckedBoxes = new Set(prev);
      if (isChecked) {
        newCheckedBoxes.add(index);
      } else {
        newCheckedBoxes.delete(index);
      }
      return newCheckedBoxes;
    });
  };

  const Checkbox = ({ index }: { index: number }) => {
    return (
      <div className="gap-2 flex items-center border-r p-4">
        <input
          type="checkbox"
          id={`checkbox-${index}`}
          checked={checkedBoxes.has(index)}
          onChange={handleCheckboxChange(index)}
        />
      </div>
    );
  };

  return (
    <aside className="w-full gap-2 overflow-hidden overflow-y-auto overscroll-contain select-none">
      <h3 className="flex gap-2 flex-col w-full">
        {cases &&
          cases.map((c) => (
            <section key={c.id} className="lg:w-2/3 border">
              <p className="space-y-5 rounded-3xl">
                
                  <>
                    <section className="dotted-bg p-8 flex items-center gap-2 border">
                      <Link href={`/specialty/preview/${id}`}>
                        <MdArrowBackIos className="hover:text-zinc-300 text-xl" />
                      </Link>
                      <header className="flex flex-col">
                      <h3 className="text-2xl">Examiner&apos;s Marking Guide</h3>
                      <p className="text-zinc-500 text-sm flex items-center">Gauge and monitor performance with our criteria &nbsp; <FaRegCheckSquare className="h-3 w-3"/></p>
                      </header>
                    </section>

                    <section className="px-10">
                      <Link
                        href={`/specialty/case/${id}`}
                        className="text-zinc-500 justify-end flex hover:underline underline-offset-4 pb-2"
                      >
                        View the Patient Script
                      </Link>
                      
                      {c.casejson.clinical_pearls && (
                      <table className="overflow-x-auto border w-full table-fixed">
                        <tbody className="border w-full">
                          {c.markingtablejson.map((i: any, index: number) => (
                            i.criteria && (
                              <tr key={index}>
                                {i.heading ? <h2 className="uppercase text-sm font-semibold text-zinc-500 p-2">{i.heading}</h2> : ""}
                                <td className="border align-top text-zinc-500 flex gap-2 items-center">
                                  <Checkbox index={index} />
                                  <Markdown>{i.criteria}</Markdown>
                                </td>
                              </tr>
                            )
                          ))}
                          <tr className="p-5 flex w-full">
                            <td className="uppercase text-sm text-zinc-500 font-semibold w-full">
                              Your score is {checkedBoxes.size}/{tableSize.reduce((a, b) => a + b, 0)}
                              {checkedBoxes.size === tableSize.reduce((a, b) => a + b, 0) ? `${" "}Perfect!` : `${" "}Good Effort!`}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      )}
                    </section>
                  </>
                

                <section className="px-10 py-5">
                <Accordion type="single" collapsible defaultValue="item-1">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Case + Pathophysiology Discussion</AccordionTrigger>
                      <AccordionContent>
                        {c.casejson.case_discussion && (
                          <section>
                            <Markdown>{c.casejson.case_discussion}</Markdown>
                          </section>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Clinical Pearls</AccordionTrigger>
                      <AccordionContent>
                        {c.casejson.clinical_pearls && (
                          <section>
                            <Markdown>{c.casejson.clinical_pearls}</Markdown>
                          </section>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>References</AccordionTrigger>
                      <AccordionContent>
                        This is<Markdown>{c.casejson?.references}</Markdown>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>
              </p>
            </section>
          ))}
      </h3>
    </aside>
  );
}
