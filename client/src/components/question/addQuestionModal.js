import { React } from "react";
import { useForm } from "react-hook-form";
import { useCreateQuestion } from "../../hooks/api/useCreateQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  Modal,
} from "flowbite-react";

export const AddQuestionModal = ({ show, setOpenAddQuestionModal }) => {
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
    setOpenAddQuestionModal(false);
  };

  const onCancel = () => {
    setOpenAddQuestionModal(false);
  };

  // ----------------------------------
  // RETURN BLOCK
  // ----------------------------------
  return (
    <Modal show={show} size="4xl" onClose={onCancel} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="w-full">
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Add a new question
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <Label htmlFor="title" value="Question Title" />
                <TextInput
                  type="text"
                  name="title"
                  id="title"
                  color={`${errors.title ? "failure" : "gray"}`}
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
                <Label htmlFor="Category" value="Category" />
                <TextInput
                  type="text"
                  name="category"
                  id="category"
                  color={`${errors.category ? "failure" : "gray"}`}
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
                <Label htmlFor="Complexity" value="Complexity" />
                <Select
                  id="complexity"
                  defaultValue={"Easy"}
                  color={`${errors.complexity ? "failure" : "gray"}`}
                  {...register("complexity")}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </Select>
                {errors?.complexity && (
                  <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.complexity.message}
                  </small>
                )}
              </div>

              <div className="sm:col-span-2">
                <Label htmlFor="Description" value="Description" />
                <Textarea
                  id="description"
                  placeholder="Your description here"
                  required
                  color={`${errors.description ? "failure" : "gray"}`}
                  rows={8}
                  {...register("description")}
                />
                {errors?.description && (
                  <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.description.message}
                  </small>
                )}
              </div>
            </div>
            <Button type="submit">Add Question</Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
