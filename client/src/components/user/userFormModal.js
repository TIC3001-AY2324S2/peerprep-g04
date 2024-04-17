import { React } from "react";
import { useForm, Controller } from "react-hook-form";
import { useEditUser } from "../../hooks/api/user/useEditUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Label,
  TextInput,
  Checkbox,
  Modal,
} from "flowbite-react";

export const UserFormModal = ({
  show,
  setOpenUserFormModal,
  selectedUser,
}) => {
  // ----------------------------------
  // FORM VALIDATIONS - with ZOD
  // ----------------------------------
  const schema = z.object({
    username: z.string().min(1, "Please enter a username"),
    email: z.string().min(1, "Please enter a email").email({ message: "Invalid email address" }),
    solvedQuestions: z.coerce.number({message:"Please enter only numbers"}).int({message:"Please enter whole numbers"}).min(0, {message:"Please enter positive numbers"}),
    isAdmin: z.boolean()
  });

  // ----------------------------------
  // FORM SETUP
  // ----------------------------------
  const initialFormValues =
    selectedUser
      ? {
        username: selectedUser.username,
        email: selectedUser.email,
        isAdmin: selectedUser.isAdmin,
        solvedQuestions: selectedUser.solvedQuestions,
      }
      : {
        username: "",
        email: "",
        isAdmin: false,
        solvedQuestions: 0,
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

  // ----------------------------------
  // SUBMIT HOOK
  // ----------------------------------
  const { mutateAsync: editUser } = useEditUser();

  const onSubmit = async (data) => {
    let res = true;
    res = await editUser({ data, id: selectedUser._id });
    if (res) {
      setOpenUserFormModal(false);
      reset();
    }
  };

  const onCancel = () => {
    setOpenUserFormModal(false);
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
            Edit User
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <Label htmlFor="username" value="User Name" />
                <TextInput
                  type="text"
                  name="username"
                  id="username"
                  color={`${errors.username ? "failure" : "gray"}`}
                  placeholder="ie: Alice"
                  {...register("username")}
                />
                {errors?.username && (
                  <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.username.message}
                  </small>
                )}
              </div>
              <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                  type="text"
                  name="email"
                  id="email"
                  color={`${errors.email ? "failure" : "gray"}`}
                  placeholder="ie: alice@abc.com"
                  {...register("email")}
                />
                {errors?.email && (
                  <small email="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.email.message}
                  </small>
                )}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="solvedQuestions" value="Solved Questions" />
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number"
                  name="solvedQuestions"
                  id="solvedQuestions"
                  color={`${errors.solvedQuestions ? "failure" : "gray"}`}
                  placeholder="ie: 0"
                  required
                  {...register("solvedQuestions")}
                />
                {errors?.solvedQuestions && (
                  <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.solvedQuestions.message}
                  </small>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="isAdmin" 
                  {...register("isAdmin")}
                />
                <Label htmlFor="isAdmin">isAdmin</Label>
                {errors?.isAdmin && (
                  <small className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errors.isAdmin.message}
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
