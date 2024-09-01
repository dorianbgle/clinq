import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiBellOn } from "react-icons/ci";
import supabase from "@/packages/lib/supabase/client";

const Announcement = async () => {
  const { data: announcements } = await supabase.from("announcements").select();

  return (
    <Sheet>
      <SheetTrigger>
        <div className="rounded-full items-center justify-center border hover:bg-blue-900/40 p-1 hover:text-blue-500 hover:border-blue-500 border-zinc-500 text-zinc-500">
          <CiBellOn className="h-5 w-5" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alerts</SheetTitle>
          <SheetDescription>
            <section className="gap-3 flex flex-col py-5 overflow-y-auto">
              <h2 className="uppercase text-zinc-500 font-semibold">Today</h2>
              {announcements ? (
                announcements?.map((i: any, index) => (
                  <div
                    key={index}
                    className="px-10 py-7 border border-zinc-700"
                  >
                    <h3 className="text-end flex justify-end pb-3">
                      10 hours ago
                    </h3>
                    <h3 className="font-bold text-xl">
                      {i?.announcementjson?.heading}
                    </h3>{" "}
                    <p>{i?.announcementjson?.content}</p>{" "}
                  </div>
                ))
              ) : (
                <p className="text-zinc-500 flex items-center justify-center text-lg w-full py-10">
                  You have no new announcements
                </p>
              )}
            </section>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Announcement;
