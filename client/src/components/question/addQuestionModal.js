import { React } from "react";
import { useForm } from "react-hook-form";
import { useCreateQuestion } from "../../hooks/api/useCreateQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const AddQuestionModal = () => {
  // ----------------------------------
  // FORM VALIDATIONS - with ZOD
  // ----------------------------------
  const schema = z.object({
    title: z.string().min(1, "Please enter a title"),
    category: z.string().min(1, "Please enter a category"),
    complexity: z.string().min(1, "Please select a complexity"),
    description: z.string().min(1, "Please enter a description"),
  });

  // ----------------------------------
  // FORM SETUP
  // ----------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  // ----------------------------------
  // SUBMIT HOOK
  // ----------------------------------
  const { mutateAsync: createQuestion } = useCreateQuestion();

  const onSubmit = async (data) => {
    await createQuestion(data);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new question
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Question Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className={`block w-full rounded-lg p-2.5 text-sm text-gray-900 bg-gray-50
                        ${
                          errors.title
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                placeholder="ie: Reverse an array"
                {...register("title")}
              />
              {errors?.title && (
                <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.title.message}
                </small>
              )}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                className={`block w-full rounded-lg p-2.5 text-sm text-gray-900 bg-gray-50
                        ${
                          errors.category
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                placeholder="ie: Array"
                {...register("category")}
              />
              {errors?.category && (
                <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.category.message}
                </small>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Complexity
              </label>
              <select
                id="complexity"
                defaultValue={"Easy"}
                className={`block w-full rounded-lg p-2.5 text-sm text-gray-900 bg-gray-50
                        ${
                          errors.complexity
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                {...register("complexity")}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              {errors?.complexity && (
                <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.complexity.message}
                </small>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                rows="8"
                className={`block w-full rounded-lg p-2.5 text-sm text-gray-900 bg-gray-50
                        ${
                          errors.description
                            ? "border-red-400 focus:border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                placeholder="Your description here"
                {...register("description")}
              ></textarea>
              {errors?.description && (
                <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {errors.description.message}
                </small>
              )}
            </div>
          </div>
          <button
            type="submit"
            className=" mt-5 inline-flex items-center justify-center rounded-lg bg-yellow-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-[#E5AA70] focus:ring-4 focus:ring-[#E5AA70] dark:focus:ring-[#E5AA70]"
          >
            Add Question
          </button>
        </form>
      </div>
    </section>
  );
};
