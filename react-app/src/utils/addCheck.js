import React from 'react';

const AddImageCheck = ({ addImage, setAddImage, errors, item }) => {
  return (
    <div className="form-input-containers">
      <label htmlFor="edit_image">Add a cover photo to this {item}?</label>
      <input
        className="check-input"
        name="edit_image"
        type="checkbox"
        value={addImage}
        onChange={() => (addImage ? setAddImage(false) : setAddImage(true))}
      />
      <p className="error-display">{errors['edit_image']}</p>
    </div>
  );
};

export default AddImageCheck;
