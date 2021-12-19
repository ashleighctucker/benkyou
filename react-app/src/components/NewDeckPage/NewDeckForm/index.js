import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addNewDeck } from '../../../store/my_decks';
import './NewDeckForm.css'

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
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const data = await dispatch(
      addNewDeck(title, cover_photo_url, category_id, sessionUser.id)
    );
    if (data.errors) {
      return setErrors(data.errors);
    }
    history.push(`/decks/${data}`);
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
        <label htmlFor="cover_photo_url">Cover Photo Url (Optional)</label>
        <input
          className="form-inputs"
          name="cover_photo_url"
          type="text"
          placeholder="Cover Photo URL"
          value={cover_photo_url}
          onChange={(e) => setCoverPhotoUrl(e.target.value)}
        />
        <p className="error-display">{errors['cover_photo_url']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="category_id">Category</label>
        <select
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
