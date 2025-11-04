const ScreenshotModal = ({ imageUrl, onClose }) => {
  return (
    <div className="modal" onClick={onClose}>
      <span className="modal-close" onClick={onClose}>&times;</span>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageUrl} alt="Screenshot" />
      </div>
    </div>
  );
};

export default ScreenshotModal;

