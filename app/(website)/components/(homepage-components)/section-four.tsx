import Image from "next/image";
import inbox from "../../../../public/inbox.png";
import invoicing from "../../../../public/invoicing.png";
import { CopyInput } from "../copy-input"

export function SectionFour() {
  return (
    <section className="flex justify-between space-y-12 md:space-y-0 md:space-x-8 flex-col md:flex-row overflow-hidden mb-12">
      <div className="border border-border basis-1/3 bg-zinc-950 p-10 md:text-center flex flex-col">
        {/* <span className="text-[#F5F5F3] border border-border rounded-full self-start font-medium font-mono px-3 text-xs py-1.5 mb-4 bg-[#1D1D1D]">
          Coming soon
        </span> */}
        <h4 className="font-medium text-xl md:text-2xl mb-4">Simulated Cases</h4>
        <p className="text-[#878787] mb-[35px] text-sm">
          Visit patients from our wards. Cases are structured in a OSCE-style setting with comprehensive marking guides.
        </p>

        <Image
          src={invoicing}
          quality={100}
          className="object-contain mt-auto"
          alt="Invoice"
        />
      </div>

      <div className="border border-border md:basis-2/3 bg-zinc-950 p-10 flex justify-between md:space-x-8 md:flex-row flex-col">
        <div className="flex flex-col md:basis-1/2">
          <h4 className="font-medium text-xl md:text-2xl mb-4">Long Cases</h4>

          <p className="text-[#878787] mb-4 text-sm">
            Our long stay case module is designed to simulate the hospital environment.
          </p>

          <ul className="list-decimal pl-4 space-y-3">
            <li className="text-[#878787] text-sm">
              OSCE-style case can be performed for each patient. 
            </li>
            <li className="text-[#878787] text-sm">
              Sample Admission notes, GP Letters, Important Labs and Imaging. 
            </li>
            <li className="text-[#878787] text-sm">
              Frequently updated to mimic real-life scenarios.
            </li>
          </ul>

          {/* <CopyInput
            value="inbox.f3f1s@midday.ai"
            className="max-w-[240px] mt-8"
          /> */}
        </div>

        <div className="md:basis-1/2 mt-8 md:mt-0 -bottom-[8px] relative">
          <Image
            src={inbox}
            quality={100}
            className="object-contain -bottom-[32px] relative"
            alt="Inbox"
          />
        </div>
      </div>
    </section>
  );
}