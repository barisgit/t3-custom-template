// app/components/SignInForm.tsx
import Link from "next/link";
import { FormEvent } from "react";
import { useSignIn } from "@clerk/nextjs";

interface SignInFormProps {
  signInWithEmail: ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => void;
  clerkError: string;
}

const SigninForm = ({ signInWithEmail, clerkError }: SignInFormProps) => {
  const { signIn } = useSignIn();

  const signInWithGoogle = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      console.error("Error signing in with Google", err);
    }
  };

  return (
    <div className="mt-12 grid justify-center justify-items-center md:mt-20">
      <div className="h-auto w-80 rounded-xl bg-blue-700 md:w-96 md:rounded-3xl">
        <div className="p-6 md:p-8">
          <h1 className="mb-6 text-3xl font-light text-white">Sign In</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                email: { value: string };
                password: { value: string };
              };
              const email = target.email.value;
              const password = target.password.value;
              signInWithEmail({ emailAddress: email, password: password });
            }}
          >
            <input
              name="email"
              className="h-37 mb-3 block w-full border-0 border-b-2 border-slate-600 bg-transparent pb-4 pl-4 text-sm font-light text-white caret-slate-700 focus:border-white"
              placeholder="Email address"
              type="email"
              required
            />
            <input
              name="password"
              className="h-37 mb-3 block w-full border-0 border-b-2 border-slate-600 bg-transparent pb-4 pl-4 text-sm font-light text-white caret-slate-700 focus:border-white"
              placeholder="Password"
              type="password"
              required
            />
            <h2 className="mb-8 text-slate-700">
              {clerkError && <p>{clerkError}</p>}
            </h2>
            <button
              className="mb-6 h-12 w-full rounded-md bg-slate-700 text-sm font-light text-white hover:bg-white hover:text-blue-900"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <button
            onClick={signInWithGoogle}
            className="mb-6 h-12 w-full rounded-md bg-white text-sm font-light text-blue-900 hover:bg-slate-200"
          >
            Sign in with Google
          </button>
          <p className="text-center text-sm font-light text-white">
            Don&apos;t have an acccount?
            <Link className="ml-2 text-slate-200" href="/sign-up">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
