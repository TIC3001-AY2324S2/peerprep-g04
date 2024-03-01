"use client";

import { Button, Modal } from "flowbite-react";

export const DeleteQuestionModal = ({
  show,
  question,
  setOpenDeleteQuestionModal,
}) => {
  // Write the use mutate hook here

  const onConfirm = () => {
    console.log(question);
    setOpenDeleteQuestionModal(false);
  };

  const onCancel = () => {
    setOpenDeleteQuestionModal(false);
  };

  return (
    <Modal show={show} size="md" onClose={onCancel} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
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
