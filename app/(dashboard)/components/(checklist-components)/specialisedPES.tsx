import supabase from "@/packages/lib/supabase/client";
import Link from "next/link";
import { IoIosReturnRight } from "react-icons/io";

export const revalidate = 60
const SpecialisedPES = async () => {

  const { data: checklists, error } = await supabase
  .from("checklists")
  .select("checklist_name, id")
  .eq("isBasicChecklist", false)
  .eq("isPES", true)  // Adding the filter for isPES
  .order("checklist_name", { ascending: true });

  return (
    <>
      {checklists &&
        checklists.map((i) => {
          return (
            <Link
              key={i.id}
              href={`/checklists/${i.id}`}
              className="border p-2 px-4 hover:text-zinc-300 text-zinc-500 hover:border-zinc-500 hover:bg-zinc-800/20 flex items-center"
            >
              < IoIosReturnRight className="h-3 w-3"/> &nbsp;&nbsp; 
              <h1 className="">{i.checklist_name}</h1>
            </Link>
          );
        })}
    </>
  );
};

export default SpecialisedPES;
