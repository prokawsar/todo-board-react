import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/SubmitButton";
import { supabase } from "../db/supabase";
import { useState } from "react";
import { useUserStore } from "../store";
import { toast } from "sonner";

const initialData = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setData] = useState(initialData);
  const [isSubmit, setSubmit] = useState(false);
  const { setUser } = useUserStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData({
      ...loginData,
      [name]: value,
    });
  };

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmit) return;

    setSubmit(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    });
    if (!error) {
      console.log(data.user);
      setUser(data.user);
      navigate("/dashboard");
      toast.success("Login in successful");
    } else {
      toast.error(error.message);
    }
    setSubmit(false);
  };

  document.title = "Login";

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        onSubmit={signIn}
        className="animate-in flex w-full flex-1 flex-col justify-center gap-2"
      >
        {/* {searchParams?.message && (
          <p className="mt-4 border border-red-500 bg-red-100 p-4 text-center text-slate-600">
            {searchParams.message}
          </p>
        )}
        {searchParams?.success && (
          <p className="mt-4 border border-teal-500 bg-purple-100 p-4 text-center text-slate-600">
            {searchParams.success}
          </p>
        )} */}

        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="mb-6 rounded-md border bg-inherit px-4 py-2 invalid:border-red-500 focus:outline-none"
          name="email"
          type="email"
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
          onChange={handleChange}
          autoComplete="off"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          disabled={isSubmit}
          isSubmit={isSubmit}
          className="mb-2 rounded-md bg-slate-500 px-4 py-2 disabled:cursor-not-allowed text-white hover:bg-slate-600"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        <p className="text-center">
          Haven't account?{" "}
          <Link className=" text-sky-600" to="/signup">
            Sign up{" "}
          </Link>{" "}
          now.
        </p>
      </form>
    </div>
  );
}
