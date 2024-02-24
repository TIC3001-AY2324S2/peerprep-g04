import React, { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // Handle your form submission here (e.g., API call)
  };

  // Set up a state to hold the current form values
  const [currentValues, setCurrentValues] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Use watch to subscribe to form value changes
  const watchedValues = watch((value, { name, type }) => {
    setCurrentValues(value); // Update the state with the latest values
  });

  return (
    <Card>
      <pre>{JSON.stringify(currentValues, null, 2)}</pre>
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-lg">
        <h1 className="mb-4 font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        Join our community of designers and developers to get access to hundreds
        of UI components, plugins, resources, and design systems.
        <br />
        <br />
        <div className="mb-5">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="JohnDoe@gmail.com"
            required
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            required
            {...register("password", { required: "Password is required" })}
          />
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
          class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </Card>
  );
}
