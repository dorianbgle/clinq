

import { MobileMenu } from "./mobile-menu";
import { RxAvatar } from "react-icons/rx";
import Announcement from "./(data-components)/Announcement";

export const revalidate = 60;

export default function Header() {
 

  return (
    <header className="-ml-4 -mr-4 md:m-0 z-10 px-4 md:pr-0 border-b border-zinc-800 flex justify-between pt-4 pb-2 md:pb-4 items-center sticky top-0 backdrop-filter backdrop-blur-xl">
      <MobileMenu />

     

      <section className="flex mr-auto justify-center items-center text-zinc-700 text-sm">
        Press Command + K to use our AI Assistant
      </section>
      <section className="flex space-x-2 no-drag ml-auto gap-2 justify-center items-center">
        <Announcement />
        <RxAvatar className="h-7 w-7" />
      </section>
    </header>
  );
}
