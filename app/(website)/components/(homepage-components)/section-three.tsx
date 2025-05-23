import Image from "next/image";
import timetracker from "../../../../public/time-tracker.png";

export function SectionThree() {
  return (
    <section className="relative mb-12" id="checklists">
      <div className="border border-border container bg-zinc-950 p-8 md:p-10 md:pb-0 overflow-hidden">
        <div className="flex flex-col md:space-x-12 md:flex-row">
          <div className="mt-6 md:max-w-[40%] md:mr-8 md:mb-8">
            <h3 className="font-medium text-xl md:text-2xl	mb-4">Comprehensive Checklists</h3>

            <p className="text-[#878787] mb-4 text-sm">
              Our Checklists provide students with comprehensive, easy-to-follow
              guides. We encourage students to use our checklists as a
              foundation to build their own checklists.
            </p>

            <div className="flex space-x-2 items-center mt-8 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={13}
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                />
              </svg>
              <span className="text-[#878787]">Structured, Detailed, Organised</span>
            </div>
            <div className="flex space-x-2 items-center mt-1 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={13}
                fill="none"
              >
                <path
                  fill="currentColor"
                  d="M6.55 13 .85 7.3l1.425-1.425L6.55 10.15 15.725.975 17.15 2.4 6.55 13Z"
                />
              </svg>
              <span className="text-[#878787]">Independently reviewed by academics and consultants</span>
            </div>
          </div>

          <Image
            src={timetracker}
            height={400}
            className="-mb-[32px] md:-mb-[1px] object-contain mt-8 md:mt-0"
            quality={100}
            alt="Tracker"
          />
        </div>
      </div>
    </section>
  );
}
