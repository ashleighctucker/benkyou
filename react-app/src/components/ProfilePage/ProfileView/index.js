import React from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';

const ProfileView = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const badges = useSelector((state) => state.session.user['badges']);

  const makeBadgeTiles = () => {
    let tiles = [];
    for (let key in badges) {
      let tile = <div className={`badge-tile badge-${key}`} key={key}></div>;
      tiles.push(tile);
    }
    return tiles;
  };

  return (
    <div className="profile-container">
      <div className="user-info">
        <div className="user-top">
          {!sessionUser.has_image ? (
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
          <h1>{sessionUser.first_name}</h1>
        </div>
        <div className="user-bottom">
          <h3>My Info:</h3>
          <p>User Name: {sessionUser.user_name}</p>
          <p>Email: {sessionUser.email}</p>
        </div>
        <div className="user-buttons">
          <button>Edit Profile</button>
        </div>
      </div>

      <div className="badge-container">
        <h1>My Badges</h1>
        <div>{makeBadgeTiles()}</div>
      </div>
    </div>
  );
};

export default ProfileView;
