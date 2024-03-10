import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useAuth } from "../components/common/AuthProvider";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  // dispatch and navigate
  const dispatch = useDispatch();
  const { login } = useAuth();

  // ----------------------------------
  // FORM VALIDATIONS
  // ----------------------------------
  const schema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, { message: "Password must have at least 8 characters" }),
  });

  // ----------------------------------
  // FORM SETUP
  // ----------------------------------
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  const watchAllFields = watch(); // Watching all fields

  // ----------------------------------
  // TODO: ON SUBMIT REGISTER USER HOOK
  // ----------------------------------
  const onSubmit = async (data) => {
    try {
      login(data);
      // Only navigate after a successful login
      navigate("/");
    } catch (error) {
      // Handle the error if login failed
      console.error("Failed to login: ", error);
    }
  };

  return (
    <Card className="max-w-3xl">
      <pre>{JSON.stringify(watchAllFields, null, 2)}</pre>
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
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            required
            color={`${errors.email ? "failure" : "gray"}`}
            shadow
            {...register("email")}
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
            required
            shadow
            {...register("password")}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="repeatPassword" value="Repeat password" />
          </div>
          <TextInput
            id="repeatPassword"
            type="password"
            required
            shadow
            {...register("repeatPassword")}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
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
