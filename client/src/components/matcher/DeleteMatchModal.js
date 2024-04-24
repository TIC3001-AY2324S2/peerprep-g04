import { Button, Modal } from 'flowbite-react';
import { useDeleteMatch } from '../../hooks/api/match/useDeleteMatch';

export const DeleteMatchModal = ({
  show,
  match,
  userId,
  setOpenDeleteMatchModal,
  leaveRoom,
}) => {
  // Write the use mutate hook here
  const { mutate: deleteMatch } = useDeleteMatch(userId);

  console.log('match', match);

  const onConfirm = async () => {
    leaveRoom();
    if (match && match._id) {
      await deleteMatch(match._id);
      setOpenDeleteMatchModal(false);
    } else {
      console.error('match ID not found');
    }
  };

  const onCancel = () => {
    setOpenDeleteMatchModal(false);
  };

  return (
    <Modal show={show} size="md" onClose={onCancel} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Leaving room will exit match, are you sure?
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
