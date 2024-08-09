import { Suspense, lazy } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

const FactDisplay = lazy(() => import("@/components/clinq-components/(data-components)/FactDisplay"));
const DashboardDisplay = lazy(() => import("@/components/clinq-components/(data-components)/DashboardDisplay"));
const UserData = lazy(() => import("@/components/clinq-components/(data-components)/UserData"));

export default function DashBoard() {
  return (
    <section className="flex flex-col w-full h-full p-5 gap-2 text-slate-300 overflow-y-auto overflow-hidden select-none">
      <div className="flex w-full p-2 ">
        <div className="flex justify-end items-end gap-3 w-full">
          <article className=" bg-zinc-950 items-center p-3 px-5 flex justify-center hover:border-zinc-600 border rounded-full delay-300 duration-150 ease-in-out">
            <FaArrowTrendUp />
            &nbsp; Performance
          </article>
        </div>
      </div>
      
      <article className="w-full px-7 p-5 bg-gradient-to-r large-dotted-bg md:h-72 h-96 flex flex-col justify-end overflow-clip relative">
        <h3 className="text-black/30 md:text-[25rem] text-[16rem] font-bold text-end -right-52 md:-right-8 absolute md:-top-32 -z-10">ClinQ</h3>
        <h1 className="text-2xl md:text-3xl py-2">Clinical Medicine Education Suite</h1>
        <p>
          <Suspense fallback={<div>Loading UserData...</div>}>
            <UserData />
          </Suspense>
        </p>
        <div className="">
          <blockquote className="italic">
            <Suspense fallback={<div>Loading FactDisplay...</div>}>
              <FactDisplay />
            </Suspense>
          </blockquote>
        </div>
      </article>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0">
        <Suspense fallback={<div>Loading DashboardDisplay...</div>}>
          <DashboardDisplay />
        </Suspense>
        <div className="w-full border p-7 h-72 text-5xl justify-center flex gradient flex-col bg-gradient-to-r from-zinc-900 to-zinc-300 text-transparent bg-clip-text text-end hover:border-zinc-600 delay-300 duration-300 ease-in-out">
          Prescribing Module <br />
          <span className="items-end flex justify-end">Coming Soon</span>
          <span className="text-sm justify-center p-1 text-zinc-500">Learn More</span>
        </div>
      </div>
    </section>
  );
}
