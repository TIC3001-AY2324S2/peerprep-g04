import { React } from "react";
import { useForm, Controller } from "react-hook-form";
import { useCreateQuestion } from "../../hooks/api/question/useCreateQuestion";
import { useEditQuestion } from "../../hooks/api/question/useEditQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CreatableSelect from "react-select/creatable";
import {
  Button,
  Label,
  TextInput,
  Textarea,
  Select,
  Modal,
} from "flowbite-react";

export const QuestionFormModal = ({
  show,
  setOpenQuestionFormModal,
  isEdit,
  selectedQuestion,
}) => {
  // ----------------------------------
  // FORM VALIDATIONS - with ZOD
  // ----------------------------------
  const schema = z.object({
    title: z.string().min(1, "Please enter a title"),
    category: z.string().array().min(1, "Please enter a category"),
    complexity: z.string().min(1, "Please select a complexity"),
    description: z.string().min(1, "Please enter a description"),
  });

  // ----------------------------------
  // FORM SETUP
  // ----------------------------------
  const initialFormValues =
    isEdit && selectedQuestion
      ? {
        title: selectedQuestion.title,
        category: selectedQuestion.category,
        complexity: selectedQuestion.complexity,
        description: selectedQuestion.description,
      }
      : {
        title: "",
        category: "",
        complexity: "Easy",
        description: "",
      };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialFormValues,
  });

  const watchAllFields = watch();

  const options = [
    { value: "Array", label: "Array" },
    { value: "String", label: "String" },
    { value: "Algorithm", label: "Algorithm" },
  ];

  // ----------------------------------
  // SUBMIT HOOK
  // ----------------------------------
  const { mutateAsync: createQuestion } = useCreateQuestion();
  const { mutateAsync: editQuestion } = useEditQuestion();

  const onSubmit = async (data) => {
    if (isEdit && selectedQuestion) {
      await editQuestion({ data, id: selectedQuestion._id });
    } else {
      await createQuestion(data);
    }

    setOpenQuestionFormModal(false);
    reset();
  };

  const onCancel = () => {
    setOpenQuestionFormModal(false);
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
            {isEdit ? "Edit Question" : "Add a new question"}
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
                <Controller
                  control={control}
                  name="category"
                  render={({
                    field: { onChange, onBlur, name },
                    formState,
                  }) => (
                    <CreatableSelect
                      isClearable
                      closeMenuOnSelect={false}
                      isMulti
                      options={options}
                      onBlur={onBlur}
                      name={name}
                      value={
                        formState.values &&
                        formState.values[name].map((val) =>
                          options.find((option) => option.value === val)
                        )
                      }
                      onChange={(option) =>
                        onChange(option ? option.map((o) => o.value) : [])
                      }
                    />
                  )}
                  
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
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
