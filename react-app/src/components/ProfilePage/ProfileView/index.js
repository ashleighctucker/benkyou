import React from 'react';
import { useSelector } from 'react-redux';

const ProfileView = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return null;
};

export default ProfileView;
