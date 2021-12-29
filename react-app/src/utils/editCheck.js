import React from 'react';

const EditImageCheck = ({ editImage, setEditImage, errors }) => {
  return (
    <div className="form-input-containers">
      <label htmlFor="has_image">Edit your image?</label>
      <input
        className="check-input"
        name="has_image"
        type="checkbox"
        value={editImage}
        onChange={() => (editImage ? setEditImage(false) : setEditImage(true))}
      />
      <p className="error-display">{errors?.has_image}</p>
    </div>
  );
};

export default EditImageCheck;
