import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ClinQ - About Us",
  description:
    "Get t",
};

const Page = () => {
  return (
    <div className="container mb-52">
    <div className="mb-40">
      <h1 className="mt-24 font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none text-stroke">
        About 
      </h1>

      <h3 className="font-medium text-center text-[75px] md:text-[170px] mb-2 leading-none">
        Us
      </h3>

      <div className="flex items-center flex-col text-center relative">
        <p className="text-lg mt-4 max-w-[600px]">
          We&apos;re a team of medical students and doctors who are passionate
          about improving medical education. 
        </p>
      </div>
    </div>
  </div>
  )
}

export default Page
