import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';

import { addNewDeck } from '../../../store/my_decks';
import './NewDeckForm.css';

const NewDeckForm = () => {
  const categories = useSelector((state) => state.categories);
  const catList = [];
  for (let category in categories) {
    catList.push(categories[category]);
  }
  const sessionUser = useSelector((state) => state.session.user);

  const [title, setTitle] = useState('');
  const [cover_photo_url, setCoverPhotoUrl] = useState('');
  const [category_id, setCategoryId] = useState(catList[3].id);
  const [has_image, setHasImage] = useState(false);

  const [old_url, setOldUrl] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [oldImgPreview, setOldImgPreview] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

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
    formData.append('user_id', sessionUser.id);
    formData.append('has_image', has_image);
    const data = await dispatch(addNewDeck(formData));
    if (data.errors) {
      return setErrors(data.errors);
    }
    history.push(`/decks/${data}`);
  };

  const imageInput = () => {
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
          onChange={setImage}
        />
        <p className="error-display">{errors['cover_photo_url']}</p>
      </div>
    );
  };

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <h1>Create a New Study Deck</h1>
      <div className="form-input-containers">
        <label htmlFor="title">Title</label>
        <input
          className="form-inputs"
          name="title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="error-display">{errors['title']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="has_image">Add a cover photo to this study deck?</label>
        <input
          className="form-inputs"
          name="has_image"
          type="checkbox"
          value={has_image}
          onChange={() => (has_image ? setHasImage(false) : setHasImage(true))}
        />
        <p className="error-display">{errors['has_image']}</p>
      </div>
      {has_image ? imageInput() : null}
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
        <button type="submit" className="form-sumbit-button">
          Create Deck
          <span className="bg"></span>
        </button>
      </div>
    </form>
  );
};

export default NewDeckForm;
