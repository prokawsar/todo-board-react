import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/SubmitButton";
import { supabase } from "../db/supabase";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";

const initialData = {
  email: "",
  password: "",
  confirm_password: "",
};

export default function Signup() {
  const navigate = useNavigate();
  const [signupData, setData] = useState(initialData);
  const [isSubmit, setSubmit] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData({
      ...signupData,
      [name]: value,
    });
  };

  const signUp = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmit) return;

    setSubmit(true);
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
      toast.error(error.message);
      setSubmit(false);
      return;
    }
    // navigate("/login?success=Check email to continue sign in process");
    navigate("/dashboard");
    setSubmit(false);
  };

  document.title = "Signup";

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        onSubmit={signUp}
        className="animate-in flex w-full flex-1 flex-col justify-center gap-2"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2 invalid:border-red-500 focus:outline-none"
          name="email"
          type="email"
          autoComplete="off"
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2 invalid:border-red-500 focus:outline-none"
          type="password"
          autoComplete="off"
          onChange={handleChange}
          name="password"
          placeholder="••••••••"
          minLength={6}
          required
        />
        <div className="flex flex-col mb-6 gap-2">
          <label className="text-md" htmlFor="confirm_password">
            Confirm Password
          </label>
          <input
            className={`rounded-md border bg-inherit px-4 py-2 invalid:border-red-400 focus:outline-none`}
            type="password"
            autoComplete="off"
            onChange={handleChange}
            name="confirm_password"
            placeholder="••••••••"
            minLength={6}
            required
          />
          {signupData &&
          signupData.confirm_password !== "" &&
          signupData.password !== signupData.confirm_password ? (
            <p className="text-red-400">Password do not match</p>
          ) : (
            ""
          )}
        </div>
        <SubmitButton
          disabled={isSubmit}
          isSubmit={isSubmit}
          className="mb-2 rounded-md border border-slate-400 px-4 py-2 text-slate-800 disabled:cursor-not-allowed"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>
        <p className="text-center">
          Already have account?{" "}
          <Link className=" text-sky-600" to="/login">
            {"Log in "}
          </Link>
          {"here."}
        </p>
      </form>
    </div>
  );
}
