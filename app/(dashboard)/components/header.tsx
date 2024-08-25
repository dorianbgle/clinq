import { CiBellOn } from "react-icons/ci";
import { MobileMenu } from "./mobile-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import supabase from "@/packages/lib/supabase/client";
import { RxAvatar } from "react-icons/rx";

export const revalidate = 60

export async function Header() {
  // Consider improving the appearance of announcement objects.
  const { data: announcements } = await supabase.from("announcements").select();

  return (
    <header className="-ml-4 -mr-4 md:m-0 z-10 px-4 md:pr-0 md:border-b-[1px] flex justify-between pt-4 pb-2 md:pb-4 items-center todesktop:sticky todesktop:top-0  todesktop:border-none sticky md:static top-0 backdrop-filter backdrop-blur-xl md:backdrop-filter md:backdrop-blur-none   ">
      <MobileMenu />
      <section className="flex mr-auto justify-center items-center text-zinc-500 text-sm">Press Command + K to use our AI Assistant</section>
      <section className="flex space-x-2 no-drag ml-auto gap-2 justify-center items-center">
        <Sheet>
          <SheetTrigger>
            <div className="rounded-full items-center justify-center border hover:bg-zinc-800 p-1">
              <CiBellOn className="h-5 w-5" />
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Alerts</SheetTitle>
              <SheetDescription>
                <section className="gap-3 flex flex-col py-5 overflow-y-auto"> 
                <h2 className="uppercase text-zinc-500 font-semibold">Today</h2>
                {announcements ? announcements?.map((i: any, index) => (
                  <div key={index} className="px-10 py-7 border border-zinc-700">
                    <h3 className="text-end flex justify-end pb-3">10 hours ago</h3>
                    <h3 className="font-bold text-xl">{i?.announcementjson?.heading}</h3>{" "}
                    <p>{i?.announcementjson?.content}</p>{" "}
                  </div>
                )) : <p className="text-zinc-500 flex items-center justify-center text-lg w-full py-10">You have no new announcements</p>}
                </section>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <RxAvatar className="h-7 w-7" /> 
      </section>
    </header>
  );
}
