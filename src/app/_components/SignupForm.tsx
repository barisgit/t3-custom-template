// app/components/SignUpForm.tsx
import Link from "next/link";

interface SignUpFormProps {
  signUpWithEmail: ({
    emailAddress,
    password,
  }: {
    emailAddress: string;
    password: string;
  }) => void;
  clerkError: string;
}

const SignupForm = ({ signUpWithEmail, clerkError }: SignUpFormProps) => {
  return (
    <div className="mt-12 grid justify-center justify-items-center md:mt-20">
      <div className="h-auto w-80 rounded-xl bg-blue-700 md:w-96 md:rounded-3xl">
        <div className="p-6 md:p-8">
          <h1 className="mb-6 text-3xl font-light text-white">Sign Up</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as typeof e.target & {
                email: { value: string };
                password: { value: string };
              };
              const email = target.email.value;
              const password = target.password.value;
              signUpWithEmail({ emailAddress: email, password: password });
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
            <h2 className="text-red mb-8">
              {clerkError && <p>{clerkError}</p>}
            </h2>
            <button
              className="mb-6 h-12 w-full rounded-md bg-slate-700 text-sm font-light text-white hover:bg-white hover:text-blue-900"
              type="submit"
            >
              Create an account
            </button>
          </form>
          <p className="text-center text-sm font-light text-white">
            Already have an acccount?
            <Link className="ml-2 text-slate-200" href="/sign-in">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
