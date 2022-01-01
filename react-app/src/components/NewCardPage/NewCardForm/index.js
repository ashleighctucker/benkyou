import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';

import { getDeck } from '../../../store/current_deck';
import { addCardToDeck } from '../../../store/current_deck';
import { setImage } from '../../../utils/images';
import AddImageCheck from '../../../utils/addCheck';
import ImageInput from '../../../utils/imageInput';
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

  // card states
  const [title, setTitle] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [type, setType] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [has_image, setHasImage] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [emoji, setEmoji] = useState('');
  // image preview states
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

  const handleSetImage = (e) => {
    setImage(
      e,
      old_url,
      oldImgPreview,
      setImageUrl,
      setOldUrl,
      setImgPreview,
      setOldImgPreview
    );
  };

  return (
    <div className="splash-div">
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
        <AddImageCheck
          addImage={has_image}
          setAddImage={setHasImage}
          errors={errors}
          item={'card'}
        />
        {has_image ? (
          <ImageInput
            imgPreview={imgPreview}
            handleSetImage={handleSetImage}
            errors={errors}
          />
        ) : null}
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
      <div id="back-button-container">
        <button
          onClick={() => history.push(`/decks/${deck.id}`)}
          className="deck-view-button"
        >
          <ArrowBackTwoToneIcon /> Back to {deck.title} Page
        </button>
        <span>This action will cancel card creation</span>
      </div>
    </div>
  );
};

export default NewCardForm;
