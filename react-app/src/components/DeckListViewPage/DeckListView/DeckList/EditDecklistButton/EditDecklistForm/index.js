import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editDecklist } from '../../../../../../store/my_deck_lists';
import { getDecklist, getAllCards } from '../../../../../../store/current_list';
import { setImage } from '../../../../../../utils/images';
import AddImageCheck from '../../../../../../utils/addCheck';
import EditImageCheck from '../../../../../../utils/editCheck';
import ImageInput from '../../../../../../utils/imageInput';

const EditDecklistForm = ({ close }) => {
  const current_list = useSelector((state) => state.current_list);

  // decklist states
  const [title, setTitle] = useState(current_list.title);
  const [cover_photo_url, setCoverPhotoUrl] = useState(
    current_list.cover_photo_url
  );
  // image radio boolean states
  const [editImage, setEditImage] = useState(false);
  const [addImage, setAddImage] = useState(false);
  // image preview states
  const [old_url, setOldUrl] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [oldImgPreview, setOldImgPreview] = useState('');

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData();
    formData.append('title', title);
    formData.append('cover_photo_url', cover_photo_url);
    formData.append('decklist_id', current_list.id);
    formData.append('edit_image', editImage);
    formData.append('add_image', addImage);
    const data = await dispatch(editDecklist(formData));
    if (data) {
      return setErrors(data.errors);
    }
    await dispatch(getDecklist(current_list.id));
    await dispatch(getAllCards(current_list.id));
    close();
  };
  const handleSetImage = (e) => {
    setImage(
      e,
      old_url,
      oldImgPreview,
      setCoverPhotoUrl,
      setOldUrl,
      setImgPreview,
      setOldImgPreview
    );
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h1>Edit Deck List:</h1>
      <h3>{title}</h3>
      <div className="form-input-containers">
        <label htmlFor="title">Edit Title</label>
        <input
          className="form-inputs"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="error-display">{errors['title']}</p>
      </div>
      {current_list.has_image ? (
        <EditImageCheck
          editImage={editImage}
          setEditImage={setEditImage}
          errors={errors}
        />
      ) : (
        <AddImageCheck
          addImage={addImage}
          setAddImage={setAddImage}
          errors={errors}
          item={'study deck'}
        />
      )}
      {editImage || addImage ? (
        <ImageInput
          imgPreview={imgPreview}
          handleSetImage={handleSetImage}
          errors={errors}
        />
      ) : null}
      <div className="form-button-containers">
        <button type="submit" className="modal-buttons">
          Edit Deck List
        </button>
      </div>
    </form>
  );
};

export default EditDecklistForm;
