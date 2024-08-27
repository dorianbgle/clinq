import Link from "next/link";
import supabase from "@/packages/lib/supabase/client";

export const revalidate = 60;

const SpecialtyDisplay = async () => {
  const { data: specialties } = await supabase
    .from("specialties")
    .select("id, title")
    .order("title", { ascending: true });

  // const { data: cases } = await supabase
  // .from("cases")
  // .select();

  // const totalCasesLength = cases ? cases.length : 0
  return (
    <>
      <span className="p-5 gap-5 select-none">
        <h1 className="text-2xl font-medium">Browse Cases by Specialty</h1>
        <p className="text-zinc-500">
          Select from the following specialties to view our collection of cases.
          {/* View our {totalCasesLength} cases.  */}
        </p>
      </span>
      <section className="w-full items-center grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 p-3 border justify-center select-none text-zinc-500">
        {specialties &&
          specialties.map((s, index) => (
            <Link
              href={`/specialty/${s.id}`}
              key={s.id}
              className={` hover:bg-zinc-800/20 p-2 py-3 items-center w-full flex justify-center border hover:border-zinc-500 border-zinc-800 hover:border active:scale-95 hover:text-zinc-300 ${
                index % 2 === 0 ? "bg-zinc-950" : "bg-zinc-950/10"
              }`}
              // onClick={(e) => {
              //   // Prevent the default action to manage navigation manually
              //   e.preventDefault();

              //   // Disable all links
              //   document.querySelectorAll("a").forEach((link) => {
              //     link.classList.add("disabled");
              //   });

              //   // Enable the clicked link and add loading class
              //   e.currentTarget.classList.remove("disabled");
              //   e.currentTarget.classList.add("loading");

              //   // Redirect after setting loading state
              //   window.location.href = e.currentTarget.href;
              // }}
            >
              <p>{s.title}</p>{" "}
              {/* <span className="ml-2 hidden loading:inline-block">
                <svg
                  aria-hidden="true"
                  className="inline w-5 h-5 text-zinc-800 animate-spin dark:text-zinc-800 fill-zinc-800 dark:fill-zinc-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </span> */}
            </Link>
          ))}
      </section>
    </>
  );
};

export default SpecialtyDisplay;
