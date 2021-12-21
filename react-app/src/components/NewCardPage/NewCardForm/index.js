import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DriveFolderUploadTwoToneIcon from '@mui/icons-material/DriveFolderUploadTwoTone';

import { getDeck } from '../../../store/current_deck';
import { addCardToDeck } from '../../../store/current_deck';
import './NewCardForm.css';

const NewCardForm = () => {
  const { deckId } = useParams();
  const deck = useSelector((state) => state.current_deck);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await dispatch(getDeck(deckId));
    })();
  }, [dispatch, deckId]);

  const [title, setTitle] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [type, setType] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [has_image, setHasImage] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [emoji, setEmoji] = useState('');

  const [old_url, setOldUrl] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [oldImgPreview, setOldImgPreview] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formData = new FormData();
    formData.append('title', title);
    formData.append('pronunciation', pronunciation);
    formData.append('definition', definition);
    formData.append('example', example);
    formData.append('type', type);
    formData.append('has_image', has_image);
    formData.append('image_url', image_url);
    formData.append('emoji', emoji);
    formData.append('user_id', sessionUser.id);
    formData.append('deck_id', deck.id);
    const data = await dispatch(addCardToDeck(formData));
    if (data.errors) {
      return setErrors(data.errors);
    }
    history.push(`/decks/${data}`);
  };

  const setImage = (e) => {
    let file = e.target.files[0];
    setImageUrl(e.target.files[0]);
    if (file) {
      setOldUrl(file);
      file = URL.createObjectURL(file);
      setImgPreview(file);
      setOldImgPreview(file);
    } else {
      setImageUrl(old_url);
      setImgPreview(oldImgPreview);
    }
  };

  const imageInput = () => {
    return (
      <div className="form-input-containers">
        <label className="custom-file-upload" htmlFor="image_url">
          Cover Photo <br />
          {imgPreview ? (
            <img className="img-preview" src={imgPreview} alt={'preview'} />
          ) : (
            <DriveFolderUploadTwoToneIcon
              id="drive-icon"
              className="img-preview"
            />
          )}
        </label>
        <input
          id="image_url"
          className="form-inputs"
          name="image_url"
          type="file"
          accept=".pdf, .png, .jpg, .jpeg, .gif"
          onChange={setImage}
        />
        <p className="error-display">{errors['image_url']}</p>
      </div>
    );
  };
  return (
    <form className="main-form" id="new-card-form" onSubmit={handleSubmit}>
      <h1>Add a card to the {deck.title}</h1>
      <div className="form-input-containers">
        <label htmlFor="title">
          Title<span className="required-input">*</span>
        </label>
        <input
          className="form-inputs"
          name="title"
          type="text"
          placeholder='Title (ex: "cheek")'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="error-display">{errors['title']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="pronunciation">Pronunciation</label>
        <input
          className="form-inputs"
          name="pronunciation"
          type="text"
          placeholder='Pronunciation (ex: "CHēk")'
          value={pronunciation}
          onChange={(e) => setPronunciation(e.target.value)}
        />
        <p className="error-display">{errors['pronunciation']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="type">Type</label>
        <input
          className="form-inputs"
          name="type"
          type="text"
          placeholder='Type (ex: "noun")'
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <p className="error-display">{errors['type']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="definition">
          Definition<span className="required-input">*</span>
        </label>
        <input
          className="form-inputs"
          name="definition"
          type="text"
          placeholder='Definition (ex: "either side of the face below the eye")'
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <p className="error-display">{errors['definition']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="example">Example</label>
        <input
          className="form-inputs"
          name="example"
          type="text"
          placeholder='Example (ex: "tears rolled down her cheeks")'
          value={example}
          onChange={(e) => setExample(e.target.value)}
        />
        <p className="error-display">{errors['example']}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="has_image">Add a photo to this card?</label>
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
        <label htmlFor="emoji">Emoji</label>
        <input
          className="form-inputs"
          name="emoji"
          type="text"
          placeholder="Emoji 🧠👋🏼💡 (add up to 3!)"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        />
        <p className="error-display">{errors['emoji']}</p>
      </div>
      <span className="required-input">*required fields</span>
      <div className="form-button-containers">
        <button type="submit" className="form-sumbit-button">
          Create Card
          <span className="bg"></span>
        </button>
      </div>
    </form>
  );
};

export default NewCardForm;