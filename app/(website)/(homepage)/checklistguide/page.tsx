import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClinQ - Checklists",
  description:
    "Don't waste time checklists for phsyical examinations and history taking. Use our pre-made checklists to practice.",
};

const Page = () => {
  return (
    <div className="container mb-52">
      <div className="mb-40">
        <h1 className="mt-24 font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none text-stroke">
          Pre-made
        </h1>

        <h3 className="font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none">
          Checklists
        </h3>

        <div className="flex items-center flex-col text-center relative">
          <p className="text-lg mt-4 max-w-[600px]">
            Don&apos;t waste time making checklists to practise. Spend more time
            practising our pre-made checklists.
          </p>
        </div>
      </div>

      <div className="flex items-center flex-col text-center relative mt-28">
        <div className="max-w-[600px]">
          <h4 className="font-medium text-xl md:text-2xl mb-4">
            All the in one place
          </h4>
          <p className="text-[#878787] text-sm">
            All the checklists you need to practise are in one place. Don&apos;t
            waste time formating, finding information or even making them. Just
            pick the one you need and start practising.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
