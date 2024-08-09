import AuthForm from "@/components/clinq-components/(action-component)/AuthForm";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const Page = () => {
  return (
    <>
      <AuthForm type="signin"/>

      {/* Error with Clerk JS. Refer to docs*/}
        {/* <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
    </>
  )
};

export default Page