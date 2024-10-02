// app/components/VerifyForm.tsx
import { FormEvent } from "react";

interface VerifyFormProps {
  handleVerify: (e: FormEvent) => void;
  code: string;
  setCode: (value: string) => void;
}

const VerifyForm = ({ handleVerify, code, setCode }: VerifyFormProps) => {
  return (
    <div className="mt-12 flex grid justify-center justify-items-center md:mt-20">
      <div className="h-auto w-80 rounded-xl bg-blue-700 md:w-96 md:rounded-3xl">
        <div className="p-6 md:p-8">
          <h1 className="mb-6 text-3xl font-light text-white">
            Verification Code
          </h1>
          <form onSubmit={handleVerify}>
            <input
              value={code}
              className="h-37 mb-3 block w-full border-0 border-b-2 border-blue-900 bg-transparent pb-4 pl-4 text-sm font-light text-white caret-slate-700 focus:border-white"
              id="code"
              name="code"
              onChange={(e) => setCode(e.target.value)}
            />

            <button
              className="mb-6 h-12 w-full rounded-md bg-slate-700 text-sm font-light text-white hover:bg-white hover:text-blue-900"
              type="submit"
            >
              Complete sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyForm;
