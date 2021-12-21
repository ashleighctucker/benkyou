import React, { useState } from 'react';

const EditCardForm = ({ card, close }) => {
  // card states
  const [title, setTitle] = useState(card.title);
  const [pronunciation, setPronunciation] = useState(card.title);
  const [type, setType] = useState(card.type);
  const [definition, setDefinition] = useState(card.definition);
  const [example, setExample] = useState(card.example);
  const [has_image, setHasImage] = useState(card.has_image);
  const [image_url, setImageUrl] = useState(card.image_url);
  const [emoji, setEmoji] = useState(card.emoji);
  // image radio boolean states
  const [editImage, setEditImage] = useState(false);
  const [addImage, setAddImage] = useState(false);
  // image preview states
  const [old_url, setOldUrl] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [oldImgPreview, setOldImgPreview] = useState('');

  const [errors, setErrors] = useState({});

  return (
    <form className="modal-form">
      <h1>Edit Card:</h1>
      <h3>{title}</h3>
    </form>
  );
};

export default EditCardForm;
