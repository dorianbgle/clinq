"use client";

import { useEffect, useState } from "react";
import { signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc"; 
import { FaGithub } from "react-icons/fa"; 

export default function SignInPage() {
  const { data: session, status } = useSession(); 
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
      setLoading(false);
    };
    fetchProviders();
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (loading || status === "loading") {
    return (
      <div className="w-full h-screen flex items-center justify-center font-semibold md:text-7xl text-5xl">
        Clin<span className="animate-pulse text-zinc-500 md:text-7xl text-5xl">Q</span>
      </div>
    );
  }

  return (
    <section className="items-center h-screen w-full">
      {session ? (
        <div className="w-full h-screen flex items-center justify-center font-semibold md:text-7xl text-5xl">
        Clin<span className="animate-pulse text-zinc-500 md:text-7xl text-5xl">Q</span>
      </div>
      ) : (
        <>
          <div>
            <header className="w-full fixed left-0 right-0">
              <div className="ml-5 mt-4 md:ml-10 md:mt-10">
                <Link
                  className="text-4xl fade-in p-3 bg-gradient-to-r from-zinc-400 via-zinc-300 to-zinc-300 inline-block text-transparent bg-clip-text font-medium"
                  href={"/"}
                >
                  ClinQ
                </Link>
              </div>
            </header>
            <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
              <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col py-8">
                <div className="flex w-full flex-col relative">
                  <div className="pb-4 bg-gradient-to-r from-primary dark:via-primary dark:to-[#848484] to-[#000] inline-block text-transparent bg-clip-text">
                    <h1 className="font-medium pb-1 text-3xl">
                      Login to ClinQ.
                    </h1>
                  </div>
                  <p className="font-medium pb-1 text-2xl text-[#878787]">
                    Prepare for clinical exams, <br /> stay organized, make
                    <br />
                    studying effective
                    <br />
                    and effortless.
                  </p>
                  <div className="pointer-events-auto mt-6 flex flex-col mb-6 gap-1">

                {/* Display all providers */}
                    {providers &&
                      Object.values(providers).map((provider: any) => (
                        <div key={provider.name} className="mb-4">
                          <Button
                            onClick={() => signIn(provider.id)}
                            className="items-center gap-2 w-full flex hover:bg-zinc-500"
                            variant="outline"
                          >
                            {provider.name === "Google" && <FcGoogle />} 
                            {provider.name === "GitHub" && <FaGithub />} 
                            Sign in with {provider.name}
                          </Button>
                        </div>
                      ))}
                  </div>

                  <p className="text-xs text-[#878787]">
                    By clicking continue, you acknowledge that you have read and
                    agree to ClinQ&apos;s{" "}
                    <a href="/terms-and-conditions" className="underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy-policy" className="underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
