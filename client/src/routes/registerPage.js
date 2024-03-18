import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useAuth } from "../components/common/AuthProvider";
import { Link } from "react-router-dom";
import { useRegisterUser } from "../hooks/api/user/useRegisterUser";

export default function RegisterPage() {
  const navigate = useNavigate();
  // dispatch and navigate
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { mutateAsync: registerUser } = useRegisterUser();

  // ----------------------------------
  // FORM VALIDATIONS
  // ----------------------------------
  const schema = z.object({
    username: z
      .string()
      .min(1, "Username is required")
      .max(50, { message: "Username must be less than 50 characters" }),
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, { message: "Password must have at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password.")
      .min(8, { message: "Password must have at least 8 characters" }),
  });

  // ----------------------------------
  // FORM SETUP
  // ----------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  //const watchAllFields = watch(); // Watching all fields

  // ----------------------------------
  // TODO: ON SUBMIT REGISTER USER HOOK
  // ----------------------------------
  const onSubmit = async (data) => {
    try {
      const { username, email, password } = data;
      await registerUser({
        username,
        email,
        password,
      });
      login({ email, password });
      // Only navigate after a successful login
      navigate("/");
    } catch (error) {
      // Handle the error if login failed
      console.error("Failed to login: ", error);
    }
  };

  return (
    <Card className="max-w-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <h1 className="mb-4 font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
          Register your account
        </h1>
        Join our community of designers and developers to get access to hundreds
        of UI components, plugins, resources, and design systems.
        <br />
        <br />
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput
            id="username"
            type="username"
            placeholder="John"
            color={`${errors.username ? "failure" : "gray"}`}
            shadow
            {...register("username")}
          />
          <small className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.username && errors.username.message}
          </small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            color={`${errors.email ? "failure" : "gray"}`}
            shadow
            {...register("email")}
            autoComplete="off"
          />
          <small className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.email && errors.email.message}
          </small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            type="password"
            placeholder="***"
            color={`${errors.email ? "failure" : "gray"}`}
            shadow
            {...register("password")}
          />
          <small className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.password && errors.password.message}
          </small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeatPassword" value="Repeat password" />
          </div>
          <TextInput
            id="confirmPassword"
            type="password"
            placeholder="***"
            color={`${errors.confirmPassword ? "failure" : "gray"}`}
            shadow
            {...register("confirmPassword")}
          />
          <small className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.confirmPassword && errors.confirmPassword.message}
          </small>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" {...register("agree")} />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link
              href="#"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit">Register new account</Button>
      </form>
    </Card>
  );
}
