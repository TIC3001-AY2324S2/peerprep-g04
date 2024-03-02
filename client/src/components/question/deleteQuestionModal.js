import { Button, Modal } from "flowbite-react";
import { useDeleteQuestion } from "../../hooks/api/question/useDeleteQuestion";

export const DeleteQuestionModal = ({
  show,
  question,
  setOpenDeleteQuestionModal,
}) => {
  // Write the use mutate hook here
  const { mutateAsync: deleteQuestion } = useDeleteQuestion();

  const onConfirm = async () => {
    if (question && question._id) {
      await deleteQuestion(question._id);
      setOpenDeleteQuestionModal(false);
    } else {
      console.error("Question ID not found");
    }
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
            Are you sure you want to delete "<strong>{question.title}</strong>"?
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
