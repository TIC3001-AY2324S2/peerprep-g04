import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useLoginUser } from "../hooks/api/user/useLoginUser";

export default function LoginPage() {
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
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  // ----------------------------------
  // TODO: ON SUBMIT HOOK
  // ----------------------------------
  const { mutateAsync: loginUser } = useLoginUser();
  const onSubmit = async (data) => {
    await loginUser(data);
    console.log(data);
  };

  return (
    <Card className="max-w-3xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        <h1 className="mb-4 font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
          Sign in to your account
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
            {...register("email")}
          />
          <small className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.email && errors.email.message}
          </small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            color={`${errors.password ? "failure" : "gray"}`}
            {...register("password")}
          />
          <small className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors?.password && errors.password.message}
          </small>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" {...register("remember")} />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
}
