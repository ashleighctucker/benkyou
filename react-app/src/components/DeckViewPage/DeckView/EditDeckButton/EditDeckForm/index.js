import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';

import { editDeck } from '../../../../../store/my_decks';
import { getDeck } from '../../../../../store/current_deck';
import './EditDeckForm.css';

const EditDeckForm = ({ close }) => {
  const categories = useSelector((state) => state.categories);
  const current_deck = useSelector((state) => state.current_deck);
  const catList = [];
  for (let category in categories) {
    catList.push(categories[category]);
  }

  const [title, setTitle] = useState(current_deck.title);
  const [cover_photo_url, setCoverPhotoUrl] = useState(
    current_deck.cover_photo_url
  );
  const [category_id, setCategoryId] = useState(current_deck.category_id);

  const [editImage, setEditImage] = useState(false);
  const [addImage, setAddImage] = useState(false);

  const [old_url, setOldUrl] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [oldImgPreview, setOldImgPreview] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const setImage = (e) => {
    let file = e.target.files[0];
    setCoverPhotoUrl(e.target.files[0]);
    if (file) {
      setOldUrl(file);
      file = URL.createObjectURL(file);
      setImgPreview(file);
      setOldImgPreview(file);
    } else {
      setCoverPhotoUrl(old_url);
      setImgPreview(oldImgPreview);
    }
  };

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

  const imageInput = () => {
    return (
      <div className="form-input-containers">
        <label className="custom-file-upload" htmlFor="cover_photo_url">
          Cover Photo <br />
          {imgPreview ? (
            <img className="img-preview" src={imgPreview} alt={'preview'} />
          ) : (
            <AddPhotoAlternateTwoToneIcon
              id="drive-icon"
            />
          )}
        </label>
        <input
          id="cover_photo_url"
          className="form-inputs"
          name="cover_photo_url"
          type="file"
          accept=".pdf, .png, .jpg, .jpeg, .gif"
          onChange={setImage}
        />
        <p className="error-display">{errors['cover_photo_url']}</p>
      </div>
    );
  };

  const addDeckCheck = () => {
    return (
      <div className="form-input-containers">
        <label htmlFor="edit_image">
          Add a cover photo to this study deck?
        </label>
        <input
          className="form-inputs"
          name="edit_image"
          type="checkbox"
          value={addImage}
          onChange={() => (addImage ? setAddImage(false) : setAddImage(true))}
        />
        <p className="error-display">{errors['edit_image']}</p>
      </div>
    );
  };

  const editDeckCheck = () => {
    return (
      <div className="form-input-containers">
        <label htmlFor="has_image">Edit your image?</label>
        <input
          className="form-inputs"
          name="has_image"
          type="checkbox"
          value={editImage}
          onChange={() =>
            editImage ? setEditImage(false) : setEditImage(true)
          }
        />
        <p className="error-display">{errors['has_image']}</p>
      </div>
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
      {current_deck.has_image ? editDeckCheck() : addDeckCheck()}
      {editImage || addImage ? imageInput() : null}
      <div className="form-input-containers">
        <label htmlFor="category_id">Category</label>
        <select
          className="dropdown"
          name="category_id"
          value={category_id}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          {catList.map((category) => (
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
