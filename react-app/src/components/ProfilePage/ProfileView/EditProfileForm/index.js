import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editProfile } from '../../../../store/session';

import { setImage } from '../../../../utils/images';
import AddImageCheck from '../../../../utils/addCheck';
import EditImageCheck from '../../../../utils/editCheck';
import ImageInput from '../../../../utils/imageInput';

const EditProfileForm = ({ close }) => {
  const sessionUser = useSelector((state) => state.session.user);

  const [first_name, setFirstName] = useState(sessionUser.first_name);
  const [user_name, setUsername] = useState(sessionUser.user_name);
  const [email, setEmail] = useState(sessionUser.email);
  const [has_image, setHasImage] = useState(sessionUser.has_image);
  const [profile_picture, setProfilePicte] = useState(
    sessionUser.profile_picture
  );

  const [addImage, setAddImage] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const [old_url, setOldUrl] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const [oldImgPreview, setOldImgPreview] = useState('');

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (addImage) {
      setHasImage(true);
    }
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('user_name', user_name);
    formData.append('email', email);
    formData.append('has_image', has_image);
    formData.append('user_id', sessionUser.id);
    formData.append('profile_picture', profile_picture);
    formData.append('edit_image', editImage);
    formData.append('add_image', addImage);
    const data = await dispatch(editProfile(formData));
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
      setProfilePicte,
      setOldUrl,
      setImgPreview,
      setOldImgPreview
    );
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <h1>Edit Profile</h1>
      <div className="form-input-containers">
        <label htmlFor="first_name">First Name</label>
        <input
          className="form-inputs"
          name="first_name"
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <p className="error-display">{errors?.first_name}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="user_name">User Name</label>
        <input
          className="form-inputs"
          name="user_name"
          type="text"
          value={user_name}
          onChange={(e) => setUsername(e.target.value)}
        />
        <p className="error-display">{errors?.user_name}</p>
      </div>
      <div className="form-input-containers">
        <label htmlFor="email">Email</label>
        <input
          className="form-inputs"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="error-display">{errors?.email}</p>
      </div>
      {sessionUser.has_image ? (
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
          item={'profile'}
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
          Edit Profile
          <span className="bg"></span>
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
