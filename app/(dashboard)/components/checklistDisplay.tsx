import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import { IoIosReturnRight } from "react-icons/io";

export const revalidate = 60

const ChecklistDisplay = async () => {

  const { data: checklists } = await supabase
    .from("checklists")
    .select("checklist_name, id, isPES")
    .eq("isBasicChecklist", false)
    .order("checklist_name", { ascending: true });

  return (
    <>
    {/* Issue with non-Hx and unsure of how to handle larger volumes of records. */}
    {/* Consider filtering by history and by physical examiantioon */}
      {checklists &&
        checklists.map((i) => {
          return (
          <>
              {i.isPES ? (
                <Link
                key={i.id}
                href={`/checklists/${i.id}`}
                className="border p-2 px-4 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800/20 flex items-center"
              >
                                    < IoIosReturnRight className="h-3 w-3"/> &nbsp;&nbsp; 
                {i.checklist_name}
                {/* <h2 className="rounded-full bg-green-500/90 text-sm px-1 w-1/4 items-end flex justify-center text-end">
                  PES
                </h2> */}
                </Link>
              )
              : 
              <Link
                key={i.id}
                href={`/checklists/${i.id}`}
                className="border p-2 px-4 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800/20 items-center flex"
              >
                                    < IoIosReturnRight className="h-3 w-3"/> &nbsp;&nbsp; 
                  {i.checklist_name}
                {/* <h2 className="rounded-full bg-red-500/90 text-sm px-1 w-1/4 items-center flex justify-center">
                  Hx
                </h2> */}
                </Link>
              }
          </>
          );
        })}
    </>
  );
};

export default ChecklistDisplay;
