function ConfirmationModal({
  title = "Confirm",
  message,
  onConfirm,
  onCancel
}) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button
            className="delete-btn"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>

          <button onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
