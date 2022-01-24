import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setImage } from '../../../utils/images';
import { addNewDeck } from '../../../store/my_decks';
import AddImageCheck from '../../../utils/addCheck';
import ImageInput from '../../../utils/imageInput';
import './NewDeckForm.css';

const NewDeckForm = () => {
  const categoriesObj = useSelector((state) => state.categories);
  const sessionUser = useSelector((state) => state.session.user);

  const categories = [];
  for (let key in categoriesObj) {
    categories.push(categoriesObj[key]);
  }

  // deck states
  const [title, setTitle] = useState('');
  const [cover_photo_url, setCoverPhotoUrl] = useState('');
  const [category_id, setCategoryId] = useState(categories[3].id);
  const [has_image, setHasImage] = useState(false);
  // image preview states
  const [old_url, setOldUrl] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [oldImgPreview, setOldImgPreview] = useState('');

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  if (!sessionUser) {
    history.push('/');
  }

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
    <form className="main-form splash-div" onSubmit={handleSubmit}>
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
      <AddImageCheck
        addImage={has_image}
        setAddImage={setHasImage}
        errors={errors}
        item={'study deck'}
      />
      {has_image ? (
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
        <button type="submit" className="form-submit-button">
          Create Deck
          <span className="bg"></span>
        </button>
      </div>
    </form>
  );
};

export default NewDeckForm;
