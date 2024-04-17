import { Button, Modal } from "flowbite-react";
import { useDeleteUser } from "../../hooks/api/user/useDeleteUser";

export const DeleteUserModal = ({
  show,
  user,
  setOpenDeleteUserModal,
}) => {
  // Write the use mutate hook here
  const { mutateAsync: deleteUser } = useDeleteUser();
  const onConfirm = async () => {
    if (user && user.email) {
      await deleteUser(user.email);
      setOpenDeleteUserModal(false);
    } else {
      console.error("User ID not found");
    }
  };

  const onCancel = () => {
    setOpenDeleteUserModal(false);
  };

  return (
    <Modal show={show} size="md" onClose={onCancel} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete "<strong>{user.username}</strong>"?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onConfirm}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={onCancel}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
