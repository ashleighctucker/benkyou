import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Profile.css';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Modal } from '../../../context/Modal';
import EditProfileForm from './EditProfileForm';
import { NavLink } from 'react-router-dom';

import { authenticate } from '../../../store/session';

const ProfileView = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const badges = useSelector((state) => {
    if (sessionUser) return state.session.user['badges'];
  });
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  if (!sessionUser) {
    history.push('/');
  }

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
    })();
  }, [dispatch]);

  const makeBadgeTiles = () => {
    let tiles = [];
    for (let key in badges) {
      let tile = (
        <div
          className={`badge-tile badge-${key}`}
          key={`badge show ${badges[key].id}`}
        ></div>
      );
      tiles.push(tile);
    }
    return tiles;
  };

  const tiles = makeBadgeTiles();

  return (
    <div className="profile-container splash-div">
      <div className="user-info">
        <div className="user-top">
          {!sessionUser?.has_image ? (
            <div className="profile-logo" />
          ) : (
            <div
              className="deck-cover"
              style={{
                backgroundImage: `url(${sessionUser.profile_picture})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          )}
          <h1>{sessionUser?.first_name}</h1>
        </div>
        <div className="user-bottom">
          <h3>My Info:</h3>
          <p>User Name: {sessionUser?.user_name}</p>
          <p>Email: {sessionUser?.email}</p>
        </div>
        <div className="user-buttons">
          <button
            className="deck-view-button"
            onClick={() => setShowEditModal(true)}
          >
            <EditTwoToneIcon />
            Edit Profile
          </button>
          {showEditModal && (
            <Modal onClose={() => setShowEditModal(false)}>
              <EditProfileForm close={() => setShowEditModal(false)} />
            </Modal>
          )}
        </div>
      </div>

      <div className="profile-container">
        <h1>My Badges</h1>
        <div className="badge-container">
          {tiles.length > 0 ? tiles : <p>Earn badges by completing decks!</p>}
        </div>
      </div>
      <div className="profile-container">
        <h1>My Decks & Lists</h1>
        {sessionUser.decks.map((deck) => (
          <li key={`${deck.id}`}>
            <NavLink className="sidebar-deck-link" to={`/decks/${deck.id}`}>
              {deck.title}
            </NavLink>
          </li>
        ))}
        {sessionUser.lists.map((list) => (
          <li key={`${list.id}`}>
            <NavLink className="sidebar-deck-link" to={`/decklists/${list.id}`}>
              {list.title}
            </NavLink>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;
