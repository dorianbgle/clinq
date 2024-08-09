import { MdKeyboardArrowRight } from "react-icons/md";

const interpretationObjects = [
  {
    id: 1, 
    title: "Labs",
    href: "/interpretation/labs"
  },
  {
    id: 2, 
    title: "Imaging",
    href: "/interpretation/imaging"
  },
  {
    id: 3, 
    title: "Bedside Tests",
    href: "/interpretation/besidetests"
  },
  {
    id: 4, 
    title: "Specialised Tests",
    href: "/interpretation/specialisedtests"
  },
]

const Interpretation = () => {
  return (
    <>
      <span className="p-5 gap-5 select-none">
        <h1 className="text-2xl">Interpretation</h1>
        <h3 className="text-zinc-400">
          Guides to Essential procedural skills
        </h3>
        <section className="md:w-2/3 p-2 gap-2 flex flex-col">
          {interpretationObjects.map((i, index) => (
            <h3 key={index} className="hover:bg-zinc-800/20 hover:border border-zinc-500 h-28 items-end flex text-4xl p-2 font-bold text-zinc-700 rounded-xl">
              {i.title} &nbsp;
              <MdKeyboardArrowRight />
            </h3>
          ))}
        </section>
      </span>
    </>
  );
};

export default Interpretation;
