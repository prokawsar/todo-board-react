import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { SubmitButton } from "../components/SubmitButton";
import { supabase } from "../db/supabase";
import { useUserStore } from "../store";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFields, loginSchema } from "../types/types";
import { ErrorMessage } from "../components/ErrorMessage";

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { setUser } = useUserStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  // console.log(errors);

  const signIn: SubmitHandler<LoginFields> = async (payload) => {
    if (isSubmitting || Object.keys(errors).length) return;

    const { data, error } = await supabase.auth.signInWithPassword(payload);
    if (!error) {
      const { id, email } = data.user,
        user = { id, email };

      setUser(user);
      toast.success("Login in successful");
      navigate("/dashboard");
    } else {
      toast.error(error.message);
    }
  };

  document.title = "Login";

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <form
        onSubmit={handleSubmit(signIn)}
        className="animate-in flex w-full flex-1 flex-col justify-center gap-2"
      >
        {/* {searchParams?.message && (
          <p className="mt-4 border border-red-500 bg-red-100 p-4 text-center text-slate-600">
            {searchParams.message}
          </p>
        )} */}
        {params.size && params.get("success") ? (
          <p className="mt-4 border border-teal-500 bg-green-100/50 rounded p-4 text-center text-slate-600">
            {params.get("success")}
          </p>
        ) : (
          ""
        )}

        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className={`rounded-md border bg-inherit px-4 py-2 focus:outline-none ${
              errors.email && "border-red-500"
            }`}
            type="email"
            {...register("email")}
            placeholder="you@example.com"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className={`rounded-md border bg-inherit px-4 py-2 focus:outline-none ${
              errors.password && "border-red-500"
            }`}
            type="password"
            autoComplete="off"
            {...register("password")}
            placeholder="••••••••"
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>
        <SubmitButton
          disabled={isSubmitting}
          isSubmit={isSubmitting}
          className="my-2 rounded-md bg-slate-500 px-4 py-2 disabled:cursor-not-allowed text-white hover:bg-slate-600"
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
