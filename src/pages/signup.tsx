import { Link } from "react-router-dom";
import { SubmitButton } from "../components/SubmitButton";
import { supabase } from "../db/supabase";
import { useState } from "react";

const initialData = {
  email: "",
  password: "",
  confirm_password: "",
};

export default function Signup() {
  const [signupData, setData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData({
      ...signupData,
      [name]: value,
    });
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(signupData);
    return;

    const { error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : "http://localhost:3000",
      },
    });

    if (error) {
      console.log(error);
      // return redirect('/signup?message=Could not signup user. Reason: ' + error.code)
    }

    // return redirect('/login?success=Check email to continue sign in process')
  };

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        onSubmit={signUp}
        className="animate-in flex w-full flex-1 flex-col justify-center gap-2"
      >
        {/* {searchParams?.message && (
          <p className="mt-4 border border-red-500 bg-red-100 p-4 text-center text-slate-600">
            {searchParams.message}
          </p>
        )} */}
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          name="email"
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          autoComplete="off"
          onChange={handleChange}
          name="password"
          placeholder="••••••••"
          minLength={6}
          required
        />
        <label className="text-md" htmlFor="password">
          Confirm Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2"
          type="password"
          autoComplete="off"
          onChange={handleChange}
          name="confirm_password"
          placeholder="••••••••"
          minLength={6}
          required
        />
        <SubmitButton
          className="mb-2 rounded-md border border-slate-400 px-4 py-2 text-slate-800"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        <p className="text-center">
          Already have account?{" "}
          <a className=" text-sky-600" href="/login">
            {"Log in "}
          </a>
          {"here."}
        </p>
      </form>
    </div>
  );
}
