import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { editCard } from '../../../../../../../store/current_deck';
import { setImage } from '../../../../../../../utils/images';
import EditImageCheck from '../../../../../../../utils/editCheck';
import AddImageCheck from '../../../../../../../utils/addCheck';
import ImageInput from '../../../../../../../utils/imageInput';
import './EditCardForm.css';

const EditCardForm = ({ card, close }) => {
  const dispatch = useDispatch();

  // card states
  const [title, setTitle] = useState(card.title);
  const [pronunciation, setPronunciation] = useState(
    card.pronunciation ? card.pronunciation : ''
  );
  const [type, setType] = useState(card.type ? card.type : '');
  const [definition, setDefinition] = useState(card.definition);
  const [example, setExample] = useState(card.example ? card.example : '');
  const [has_image, setHasImage] = useState(card.has_image);
  const [image_url, setImageUrl] = useState(card.image_url);
  const [emoji, setEmoji] = useState(card.emoji ? card.emoji : '');
  // image radio boolean states
  const [editImage, setEditImage] = useState(false);
  const [addImage, setAddImage] = useState(false);
  // image preview states
  const [old_url, setOldUrl] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [oldImgPreview, setOldImgPreview] = useState('');

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (addImage || editImage) {
      setHasImage(true);
    }
    const formData = new FormData();
    formData.append('title', title);
    formData.append('pronunciation', pronunciation);
    formData.append('definition', definition);
    formData.append('example', example);
    formData.append('type', type);
    formData.append('has_image', has_image);
    formData.append('image_url', image_url);
    formData.append('emoji', emoji);
    formData.append('edit_image', editImage);
    formData.append('add_image', addImage);
    formData.append('card_id', card.id);
    const data = await dispatch(editCard(formData));
    if (data) {
      return setErrors(data.errors);
    }
    close();
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
    <form className="modal-form" id="card-edit" onSubmit={handleSubmit}>
      <h1>Edit Card:</h1>
      <h3>{title[0].toUpperCase() + title.slice(1)}</h3>
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
      {card.has_image ? (
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
          item={'card'}
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
      <div className="form-button-containers">
        <button type="submit" className="modal-buttons">
          Edit Card
          <span className="bg"></span>
        </button>
      </div>
    </form>
  );
};

export default EditCardForm;
