import { React } from "react";

export const Jumbotron = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Practice coding
          </span>
          <span> with friends.</span>
        </h1>
        <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Live coding collaboration, create your own questions. Work on
          solutions together with your friends.
        </p>
        <br />
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <a
            href="https://flowbite.com/"
            className="inline-flex items-center justify-center rounded-lg bg-[#D66B00] px-5 py-3 text-center text-base font-medium text-white hover:bg-[#E5AA70] focus:ring-4 focus:ring-[#E5AA70] dark:focus:ring-[#E5AA70]"
          >
            Start Coding
            <svg
              className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <a
            href="https://flowbite.com/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 sm:ms-4 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};
