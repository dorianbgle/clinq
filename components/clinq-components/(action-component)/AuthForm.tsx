"use client"

import { login, signup } from '@/app/(website)/(auth)/signin/actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdArrowRightAlt } from 'react-icons/md'
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from 'react-icons/fa6'
import supabaseBrowser from '@/packages/lib/supabase/browserAlt'

const AuthForm = ({ type }: { type: string }) => {
    const router = useRouter();
    const handleLoginWithOAuth = (provider: "github" | "google") => {
        const supabase = supabaseBrowser()
        supabase.auth.signInWithOAuth({
            provider, 
            options: {
                redirectTo: location.origin + "auth/callback", 
            }
        })
    }

  return (
    <section className="items-center h-screen w-full">
      {/* <main className="h-full flex justify-center items-center w-full">
        <form className="flex flex-col p-10 rounded-lg items-center gap-3 relative">
        <Link className="text-4xl p-8 bg-gradient-to-r from-cyan-400 via-purple-300 to-cyan-300 inline-block text-transparent bg-clip-text font-medium" href={"/"}>ClinQ</Link>
          {type === 'signin' ? <h1 className='text-white text-2xl text-bold'>Sign In</h1> : <h1>Sign Up</h1>}
          <label htmlFor="email"></label>
          <input id="email" name="email" type="email" required  className="rounded rounded-lg p-1" placeholder="Email"/>
          <label htmlFor="password"></label>
          <input id="password" name="password" type="password" required className="rounded rounded-lg p-1" placeholder="Password"/>
          <section className="flex gap-4 p-5 flex-col">
            <button formAction={login} className="border p-2 bg-green-300 text-green-500 rounded rounded-lg hover:scale-105 flex items-center">Log into your account&nbsp;<MdArrowRightAlt /></button>

            {type === "signin" ? <p>Don{"'"}t have an account yet? <Link href="/signup">Sign up</Link></p> : null}
            <button formAction={signup} className="border p-2 bg-orange-300 text-orange-500 rounded rounded-lg hover:scale-105">Sign up</button>
            
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
            <div className='flex flex-col gap-5'>
            <Button className='items-center gap-2 w-full flex' variant="outline" onClick={() => handleLoginWithOAuth("github")}><FaGithub/>Github</Button>
            <Button className='items-center gap-2 w-full flex' variant="outline" onClick={() => handleLoginWithOAuth("google")}><FcGoogle />Google</Button>
            </div>

            <div className='animatedBackground'></div>
          </section>
        </form>
      </main> */}


      <div>
      <header className="w-full fixed left-0 right-0">
        <div className="ml-5 mt-4 md:ml-10 md:mt-10">
        <Link className="text-4xl p-3 bg-gradient-to-r from-cyan-400 via-purple-300 to-cyan-300 inline-block text-transparent bg-clip-text font-medium" href={"/"}>ClinQ</Link>
        </div>
      </header>

      <div className="flex min-h-screen justify-center items-center overflow-hidden p-6 md:p-0">
        <div className="relative z-20 m-auto flex w-full max-w-[380px] flex-col py-8">
          <div className="flex w-full flex-col relative">
            <div className="pb-4 bg-gradient-to-r from-primary dark:via-primary dark:to-[#848484] to-[#000] inline-block text-transparent bg-clip-text">
              <h1 className="font-medium pb-1 text-3xl">Login to ClinQ.</h1>
            </div>

            <p className="font-medium pb-1 text-2xl text-[#878787]">
              Prepare for clinical exams, <br /> stay organized, make
              <br />
              studying effective
              <br />and effortless.
            </p>

            <div className="pointer-events-auto mt-6 flex flex-col mb-6 gap-3">
            <Button className='items-center gap-2 w-full flex' variant="outline" onClick={() => handleLoginWithOAuth("google")}><FcGoogle />Google</Button>
            <Button className='items-center gap-2 w-full flex' variant="outline" onClick={() => handleLoginWithOAuth("github")}><FaGithub/>Github</Button>
            </div>

            <p className="text-xs text-[#878787]">
              By clicking continue, you acknowledge that you have read and agree
              to ClinQ&apos;s{" "}
              <a href="https://midday.ai/terms" className="underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="https://midday.ai/policy" className="underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>

    </div>
    </section>
  )
}

export default AuthForm
