import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/SubmitButton";
import { supabase } from "../db/supabase";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFields, signupSchema } from "../types/types";
import { ErrorMessage } from "../components/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });

  const signUp: SubmitHandler<SignupFields> = async (payload) => {
    if (isSubmitting) return;

    const { email, password } = payload;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_VERCEL_URL
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : "http://localhost:3000",
      },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    // navigate("/login?success=Check email to continue sign in process");
    navigate("/dashboard");
  };
  console.log(errors);
  document.title = "Signup";

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        onSubmit={handleSubmit(signUp)}
        className="animate-in flex w-full flex-1 flex-col justify-center gap-2"
      >
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            {...register("email")}
            className={`rounded-md border bg-inherit px-4 py-2 focus:outline-none ${
              errors.email && "border-red-500"
            }`}
            type="email"
            autoComplete="off"
            placeholder="you@example.com"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            {...register("password")}
            className={`rounded-md border bg-inherit px-4 py-2 focus:outline-none ${
              errors.password && "border-red-500"
            }`}
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            placeholder="••••••••"
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute right-1 top-10"
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              size="xs"
            />
          </button>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col mb-6 gap-2">
          <label className="text-md" htmlFor="confirm_password">
            Confirm Password
          </label>
          <input
            {...register("confirm_password")}
            className={`rounded-md border bg-inherit px-4 py-2 focus:outline-none ${
              errors.confirm_password && "border-red-500"
            }`}
            type="password"
            autoComplete="off"
            placeholder="••••••••"
          />
          {errors.confirm_password && (
            <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>
          )}
        </div>
        <SubmitButton
          disabled={isSubmitting}
          isSubmit={isSubmitting}
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
