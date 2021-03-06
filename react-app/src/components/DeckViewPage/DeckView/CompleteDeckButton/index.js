import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EmojiObjectsTwoToneIcon from '@mui/icons-material/EmojiObjectsTwoTone';
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded';

import { addCompleteDeck, removeCompleteDeck } from '../../../../store/session';

const CompleteDeckButton = () => {
  const deck = useSelector((state) => state.current_deck);
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      sessionUser.completed_decks[deck.id] &&
      sessionUser.completed_decks[deck.id]['deck_id']
    )
      setCompleted(true);
    else {
      setCompleted(false);
    }
  }, [deck.id, sessionUser, dispatch]);

  const [completed, setCompleted] = useState(false);

  const handleComplete = async () => {
    await dispatch(addCompleteDeck(sessionUser.id, deck.id));
    setCompleted(true);
  };

  const handleRemove = async () => {
    await dispatch(removeCompleteDeck(sessionUser.id, deck.id));
    setCompleted(false);
  };

  let data
  if (!completed) {
    data = 'Complete decks to earn badges!'
  } else {
    data = 'Need to study this deck more?'
  }

  return (
    <>
      <span>{!completed && 'Feeling Confident?'}</span>
      <button data-tooltip={data}
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
