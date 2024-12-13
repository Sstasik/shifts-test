type Props = {
  handleCancelExit: () => void;
  handleConfirmExit: () => void;
};

const UnsavedChangesModal = ({
  handleCancelExit,
  handleConfirmExit,
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-white p-6 rounded-md">
        <h3 className="text-lg font-semibold">
          You have unsaved changes. Do you want to discard all changes?
        </h3>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={handleCancelExit}
            className="bg-gray-300 text-black py-2 px-4 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmExit}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesModal;
