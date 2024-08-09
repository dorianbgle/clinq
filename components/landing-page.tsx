import Link from "next/link"
import { CarouselItem, CarouselContent, CarouselPrevious, CarouselNext, Carousel } from "@/components/ui/carousel"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Image from "next/image"
import { JSX, SVGProps } from "react"
import { sideLinks } from "../packages/constants/sideLinks.js"
import SplineAnimation from "./clinq-components/(layout-components)/SplineAnimation"

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-[#007bff] to-[#0056b3] bg-repeat bg-gray-100 w-full">
      <header className="px-4 lg:px-1 h-20 flex items-center">
        <Link
          className="text-4xl bg-gradient-to-r from-cyan-400 via-purple-300 to-cyan-300 inline-block text-transparent bg-clip-text font-medium"
          href={"/"}
        >
          ClinQ
        </Link>
        
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {sideLinks.map((sideLink) => {
            return (
              <>
                {
                  <Link
                    className="text-sm font-medium text-white hover:underline underline-offset-4 hidden sm:block"
                    href={sideLink.path}
                    key={sideLink.id}
                  >
                    {sideLink.name}
                  </Link>
                }
              </>
            );
          })}
        </nav>
      </header>

      <main className="flex-1 overflow-auto">
        <section className="w-full py-12 md:py-24 lg:py-44 bg-gradient-to-br from-[#007bff] to-[#2368b2] text-white animate-fadeIn">
          <div className="container grid gap-6 px-6 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#1d88da]">
                  Elevate Your Clinical Skills <br /> with OSCE Practice
                </span>
                {"\n                          "}
              </h1>
              <p className="max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Unlock your full potential as a healthcare professional with our
                comprehensive OSCE practice platform. Gain confidence and master
                essential clinical skills through realistic simulation
                scenarios.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-white text-[#3c6fa5] px-8 text-sm font-medium shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0056b3] disabled:pointer-events-none disabled:opacity-50"
                  href="#"
                >
                  Get Started
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent text-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white hover:text-[#007bff] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  href="/login"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <SplineAnimation />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#007bff] to-[#0056b3] text-white animate-fadeIn">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Realistic OSCE Simulation Scenarios
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Experience true-to-life clinical scenarios that challenge your
                decision-making and communication skills. Prepare for your OSCE
                exams with confidence.
              </p>
            </div>
            <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 animate-fadeIn">
              <div className="rounded-lg bg-white p-6 shadow-sm text-[#007bff]">
                <StethoscopeIcon className="mb-4 h-8 w-8" />
                <h3 className="text-xl font-bold">Patient Interaction</h3>
                <p className="text-gray-500">
                  Hone your bedside manner and communication skills through
                  realistic patient encounters.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm text-[#007bff]">
                <ClipboardIcon className="mb-4 h-8 w-8" />
                <h3 className="text-xl font-bold">Clinical Procedures</h3>
                <p className="text-gray-500">
                  Master essential clinical skills, from suturing to
                  administering injections, in a safe environment.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm text-[#007bff]">
                <MicroscopeIcon className="mb-4 h-8 w-8" />
                <h3 className="text-xl font-bold">Diagnostic Reasoning</h3>
                <p className="text-gray-500">
                  Develop your critical thinking and problem-solving abilities
                  through case-based scenarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#007bff] to-[#0056b3] text-white animate-fadeIn">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Personalized Performance Tracking
              </h2>
              <p className="text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Receive detailed feedback and analytics on your performance,
                allowing you to identify strengths and areas for improvement.
              </p>
            </div>
            <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 animate-fadeIn">
              <div className="rounded-lg bg-white p-6 shadow-sm text-[#007bff]">
                <BarChartIcon className="mb-4 h-8 w-8" />
                <h3 className="text-xl font-bold">Progress Tracking</h3>
                <p className="text-gray-500">
                  Monitor your progress over time and see how you&apos;re
                  improving in key clinical areas.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm text-[#007bff]">
                <ClipboardIcon className="mb-4 h-8 w-8" />
                <h3 className="text-xl font-bold">Detailed Feedback</h3>
                <p className="text-gray-500">
                  Receive comprehensive feedback from experts to help you
                  identify areas for growth.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm text-[#007bff]">
                <LightbulbIcon className="mb-4 h-8 w-8" />
                <h3 className="text-xl font-bold">Personalized Insights</h3>
                <p className="text-gray-500">
                  Gain personalized insights to tailor your learning and
                  development.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#007bff] to-[#0056b3] text-white animate-fadeIn">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Universities Using Our OSCE Practice Platform
              </h2>
              <p className="text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform is trusted by leading medical schools and
                universities around the world.
              </p>
            </div>
            <Carousel className="w-full max-w-5xl">
              <CarouselContent>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      alt="University Logo"
                      className="aspect-[2/1] object-contain"
                      height="60"
                      src="/placeholder.svg"
                      width="120"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      alt="University Logo"
                      className="aspect-[2/1] object-contain"
                      height="60"
                      src="/placeholder.svg"
                      width="120"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      alt="University Logo"
                      className="aspect-[2/1] object-contain"
                      height="60"
                      src="/placeholder.svg"
                      width="120"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      alt="University Logo"
                      className="aspect-[2/1] object-contain"
                      height="60"
                      src="/placeholder.svg"
                      width="120"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      alt="University Logo"
                      className="aspect-[2/1] object-contain"
                      height="60"
                      src="/placeholder.svg"
                      width="120"
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="flex items-center justify-center">
                    <Image
                      alt="University Logo"
                      className="aspect-[2/1] object-contain"
                      height="60"
                      src="/placeholder.svg"
                      width="120"
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#007bff] to-[#0056b3] text-white animate-fadeIn">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Medical Student Reviews
              </h2>
              <p className="text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from our satisfied medical student users about their
                experience with our OSCE practice platform.
              </p>
            </div>
            <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 animate-fadeIn">
              <div className="rounded-lg bg-white p-6 shadow-sm text-[#007bff]">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage alt="@shadcn" src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-500">Medical Student</p>
                  </div>
                </div>
                <blockquote className="text-sm leading-relaxed">
                  &ldquo;The OSCE practice platform has been an invaluable tool
                  in\n preparing me for my exams. The realistic scenarios and\n
                  detailed feedback have really helped me improve my clinical\n
                  skills.&rdquo;
                </blockquote>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-sm text-[#007bff] dark:text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-10 h-10 border" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function BarChartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  )
}


function ClipboardIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}


function HospitalIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 6v4" />
      <path d="M14 14h-4" />
      <path d="M14 18h-4" />
      <path d="M14 8h-4" />
      <path d="M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18" />
    </svg>
  )
}


function LightbulbIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}


function MicroscopeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  )
}


function StethoscopeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  )
}


function SunIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}
