import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editDeck } from '../../../../../store/my_decks';
import { getDeck } from '../../../../../store/current_deck';
import { setImage } from '../../../../../utils/images';
import AddImageCheck from '../../../../../utils/addCheck';
import EditImageCheck from '../../../../../utils/editCheck';
import ImageInput from '../../../../../utils/imageInput';
import './EditDeckForm.css';

const EditDeckForm = ({ close }) => {
  const categories = useSelector((state) => state.categories);
  const current_deck = useSelector((state) => state.current_deck);

  // deck states
  const [title, setTitle] = useState(current_deck.title);
  const [cover_photo_url, setCoverPhotoUrl] = useState(
    current_deck.cover_photo_url
  );
  const [category_id, setCategoryId] = useState(current_deck.category_id);
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
    formData.append('category_id', category_id);
    formData.append('deck_id', current_deck.id);
    formData.append('edit_image', editImage);
    formData.append('add_image', addImage);
    const data = await dispatch(editDeck(formData));
    if (data.errors) {
      return setErrors(data.errors);
    }
    await dispatch(getDeck(current_deck.id));
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
      <h1>Edit Deck:</h1>
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
      {current_deck.has_image ? (
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
      <div className="form-input-containers">
        <label htmlFor="category_id">Category</label>
        <select
          className="dropdown"
          name="category_id"
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <p className="error-display">{errors['category_id']}</p>
      </div>
      <div className="form-button-containers">
        <button type="submit" className="modal-buttons">
          Edit Deck
        </button>
      </div>
    </form>
  );
};

export default EditDeckForm;
