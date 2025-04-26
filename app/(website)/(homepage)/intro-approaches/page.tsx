import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClinQ - Approach Guide",
  description:
    "Guide to approach a wide range of symptoms. Symptom overview, pathophysiology, differential diagnosis, and more. ",
};

const Page = () => {
  return (
    <div className="container mb-52">
      <div className="mb-40">
        <h1 className="mt-24 font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none text-stroke">
          Approaching
        </h1>

        <h3 className="font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none">
          Symptoms
        </h3>

        <div className="flex items-center flex-col text-center relative">
          <p className="text-lg mt-4 max-w-[600px]">
            Our comprehensive modules provide information on how to approach an
            extensive array of symptoms.
          </p>
        </div>
      </div>

      <div className="flex items-center flex-col text-center relative mt-36">
        <>
          <h4 className="font-medium text-xl md:text-2xl mb-4">
            Symptom Approach
          </h4>
          <p className="text-[#878787] text-sm">
            1. A general overview of the symptom and the approach to it.
            <br /> 2. A general overview of the symptom pathophysiology. <br />
            3. Differential tables with pertinent information on the clinical
            features.
            <br />
            4. A general approach to history taking and management.
          </p>
        </>
      </div>
    </div>
  );
};

export default Page;
