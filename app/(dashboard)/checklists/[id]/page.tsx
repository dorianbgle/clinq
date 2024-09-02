import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export const revalidate = 60;

// Define types for the checklist item
interface ChecklistItem {
  content: string[];
  heading?: string;
  overview?: string;
  subheading: string;
}

// Define types for the response from Supabase
interface ChecklistData {
  checklist_name: string;
  checklistjson: ChecklistItem[];
}

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

  // Helper function to calculate rowSpan
  const calculateRowSpan = (checklistjson: ChecklistItem[]): { [key: string]: number } => {
    const rowSpans: { [key: string]: number } = {};
    let currentHeading: string | null = null;

    checklistjson.forEach((item) => {
      if (item.heading) {
        currentHeading = item.heading;
        rowSpans[currentHeading] = 1; // Initialize rowSpan count
      } else if (currentHeading) {
        rowSpans[currentHeading]++; // Increment count for current heading
      }
    });

    return rowSpans;
  };

  return (
    <>
      <aside className="w-full flex flex-col gap-6 p-6 overflow-hidden overflow-y-auto">
        {symptoms &&
          symptoms.map(({ checklist_name, checklistjson }: ChecklistData) => {
            const rowSpans = calculateRowSpan(checklistjson);
            let currentHeading: string | null = null;

            return (
              <div key={checklist_name} className="w-full">
                <h1 className="pt-10 pb-8 flex gap-3 items-center dotted-bg p-6 text-3xl lg:text-4xl xl:text-5xl">
                  <Link
                    href={"/checklists"}
                    className="w-8 h-8 flex items-center"
                  >
                    <FaArrowLeftLong className="hover:text-zinc-800 h-5 w-5" />
                  </Link>
                  {checklist_name} Checklist
                </h1>

                {/* Overview Paragraph */}
                {checklistjson.map((i: ChecklistItem, idx: number) => (
                  i.overview && (
                    <p key={idx} className="text-justify p-5 dotted-bg">
                      {i.overview}
                    </p>
                  )
                ))}

                {/* Table Content */}
                <table className="w-full border-collapse overflow-x-auto">
                  <tbody>
                    {checklistjson.map((item: ChecklistItem, index: number) => {
                      const isNewHeading = item.heading !== currentHeading;
                      if (isNewHeading) currentHeading = item.heading || null;

                      return (
                        <tr key={index} className="border">
                          {isNewHeading && item.heading && (
                            <td
                              rowSpan={rowSpans[item.heading]}
                              className="p-5 border align-top uppercase text-sm font-semibold hidden sm:table-cell"
                            >
                              {item.heading}
                            </td>
                          )}

                          {/* Responsive layout adjustment for mobile view */}
                          <td className="p-5 border align-top uppercase text-sm font-semibold sm:hidden">
                            {isNewHeading && item.heading && (
                              <div className="font-bold py-6 dotted-bg text-xl">{item.heading}</div>
                            )}
                            <div className="py-5">{item.subheading}</div>
                            <div className="mt-2">
                              {item.content.map((c: string, idx: number) => (
                                <p
                                  key={idx}
                                  className={`p-3 ${
                                    idx % 2 === 0 ? "bg-zinc-950 border" : ""
                                  }`}
                                >
                                  {c || "This will be filled in soon"}
                                </p>
                              ))}
                            </div>
                          </td>

                          {/* Desktop view */}
                          <td className="hidden sm:table-cell p-5 border align-top uppercase text-sm font-semibold">
                            {item.subheading}
                          </td>

                          <td className="hidden sm:table-cell border">
                            {item.content.map((c: string, idx: number) => (
                              <p
                                key={idx}
                                className={`p-3 ${
                                  idx % 2 === 0 ? "bg-zinc-950 border" : ""
                                }`}
                              >
                                {c || "This will be filled in soon"}
                              </p>
                            ))}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
      </aside>
    </>
  );
}
