import React from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

export default function LoginPage() {
  // ----------------------------------
  // FORM SETUP
  // ----------------------------------
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  // ----------------------------------
  // FORM VALIDATIONS
  // ----------------------------------
  const validation = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^@ ]+@[^@ ]+\.[^@ ]+$/,
        message: "Invalid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };

  // ----------------------------------
  // TODO: ON SUBMIT HOOK
  // ----------------------------------
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Link
        className="flex items-center space-x-3 rtl:space-x-reverse"
        to={`/`}
      >
        <img src="pplogo.jpg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          PeerPrep
        </span>
      </Link>
      <Card>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mx-auto max-w-lg"
        >
          <h1 className="mb-4 font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          Join our community of designers and developers to get access to
          hundreds of UI components, plugins, resources, and design systems.
          <br />
          <br />
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              name="email"
              className={`block w-full rounded-lg p-2.5 text-sm text-gray-900 bg-gray-50
                        ${
                          errors.email
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
              placeholder="johndoe@gmail.com"
              {...register("email", validation.email)}
            />
            <small className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.email && errors.email.message}
            </small>
          </div>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
              Your password
            </label>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="password"
              className={`block w-full rounded-lg p-2.5 text-sm text-gray-900 bg-gray-50
                        ${
                          errors.password
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
              {...register("password", validation.password)}
            />
            <small className="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors?.password && errors.password.message}
            </small>
          </div>
          <div className="mb-5 flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="remember"
                type="checkbox"
                className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                {...register("remember")}
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <div>
            <Button>Click me</Button>
          </div>
        </form>
        <DevTool control={control} />
      </Card>
    </div>
  );
}
