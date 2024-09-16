import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export const revalidate = 60;

interface ChecklistItem {
  content: string[];
  heading?: string;
  overview?: string;
  subheading?: string; // Made subheading optional
}

interface ChecklistData {
  checklist_name: string;
  checklistjson: ChecklistItem[];
}

export default async function Checklists({ params: { id } }: { params: { id: string } }) {
  const { data: symptoms } = await supabase.from("checklists").select().match({ id });

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
                {/* Header with Centered Checklist Name */}
                <div className="pt-10 pb-8 relative flex items-center justify-center dotted-bg p-6">
                  <Link href={"/checklists"} className="absolute left-6 w-8 h-8 flex items-center">
                    <FaArrowLeftLong className="hover:text-zinc-800 h-5 w-5" />
                  </Link>
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl">{checklist_name} Checklist</h1>
                </div>

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
                          {/* Heading Cell for Desktop View */}
                          {isNewHeading && item.heading && (
                            <td
                              rowSpan={rowSpans[item.heading]}
                              className="p-5 border align-top uppercase text-sm font-semibold hidden sm:table-cell"
                            >
                              {item.heading}
                            </td>
                          )}

                          {/* Mobile View */}
                          <td className="p-5 border align-top uppercase text-sm font-semibold sm:hidden">
                            {isNewHeading && item.heading && (
                              <div className="font-bold py-6 dotted-bg text-xl">{item.heading}</div>
                            )}
                            {item.subheading && <div className="py-5">{item.subheading}</div>}
                            <div className="mt-2">
                              {item.content.map((c: string, idx: number) => (
                                <p
                                  key={idx}
                                  className={`p-3 ${idx % 2 === 0 ? "bg-zinc-950 border" : ""}`}
                                >
                                  {c || "This will be filled in soon"}
                                </p>
                              ))}
                            </div>
                          </td>

                          {/* Desktop View Subheading */}
                          {item.subheading ? (
                            <td className="hidden sm:table-cell p-5 border align-top uppercase text-sm font-semibold">
                              {item.subheading}
                            </td>
                          ) : null}

                          {/* Content Cell for Desktop View */}
                          <td
                            className={`hidden sm:table-cell border`}
                            colSpan={!item.subheading ? 2 : 1} // Set colspan to 2 if subheading is not present
                          >
                            {item.content.map((c: string, idx: number) => (
                              <p
                                key={idx}
                                className={`p-3 ${idx % 2 === 0 ? "bg-zinc-950 border" : ""}`}
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
