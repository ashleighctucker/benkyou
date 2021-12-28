import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone';
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded';

import { addCompleteDeck, removeCompleteDeck } from '../../../../store/session';

const CompleteDeckButton = () => {
  const { deckId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const [completed, setCompleted] = useState(
    sessionUser?.completed_decks[deckId] ? true : false
  );


  const handleComplete = async () => {
    await dispatch(addCompleteDeck(sessionUser.id, deckId));
    setCompleted(true);
  };

  const handleRemove = async () => {
    await dispatch(removeCompleteDeck(sessionUser.id, deckId));
    setCompleted(false);
  };

  return (
    <>
      <span>{!completed && 'Feeling Confident?'}</span>
      <button
        onClick={completed ? handleRemove : handleComplete}
        className={`deck-view-button ${completed ? 'complete-button' : null}`}
      >
        {completed ? <EmojiObjectsRoundedIcon /> : <EmojiObjectsTwoToneIcon />}
        {completed ? 'Study Again' : 'Complete Deck'}
      </button>
    </>
  );
};

export default CompleteDeckButton;
