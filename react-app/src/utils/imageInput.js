import React from 'react';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';

const ImageInput = ({ imgPreview, handleSetImage, errors }) => {
  return (
    <div className="form-input-containers">
      <label className="custom-file-upload" htmlFor="cover_photo_url">
        Cover Photo <br />
        {imgPreview ? (
          <img className="img-preview" src={imgPreview} alt={'preview'} />
        ) : (
          <AddPhotoAlternateTwoToneIcon id="drive-icon" />
        )}
      </label>
      <input
        id="cover_photo_url"
        className="form-inputs"
        name="cover_photo_url"
        type="file"
        accept=".pdf, .png, .jpg, .jpeg, .gif"
        onChange={handleSetImage}
      />
      <p className="error-display">{errors['cover_photo_url']}</p>
    </div>
  );
};

export default ImageInput;
