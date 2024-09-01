import { MobileMenu } from "./mobile-menu";
import { RxAvatar } from "react-icons/rx";
import Announcement from "./(data-components)/Announcement";

export const revalidate = 60;

function CurrentDate() {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);

  return <div className=" text-zinc-500">{formattedDate}</div>;
}

export default function Header() {
  return (
    <header className="-ml-4 -mr-4 md:m-0 z-10 px-4 md:pr-0 border-b border-zinc-800 flex justify-between pt-4 pb-2 md:pb-4 items-center sticky top-0 backdrop-filter backdrop-blur-xl select-none">
      <MobileMenu />

      <section className="flex mr-auto justify-center items-center text-zinc-700 text-sm">
        Press Command + K to use our AI Assistant
      </section>
      <section className="flex space-x-2 no-drag ml-auto gap-2 justify-center items-center">
        {/* Date Display */}
        <CurrentDate />
        

        <Announcement />
        {/* Feedback Button */}
        <a
          href="mailto:dorianbgle@icloud.com?subject=ClinQ Feedback"
          className="border hover:text-yellow-500 hover:border-yellow-500 text-zinc-500 hover:bg-yellow-700/30 px-3 rounded-xl text-sm py-1 border-zinc-500"
        >
          Feedback
        </a>
        {/* <RxAvatar className="h-7 w-7" /> */}
      </section>
    </header>
  );
}
