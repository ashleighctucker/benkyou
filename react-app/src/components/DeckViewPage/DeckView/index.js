import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getDeck } from '../../../store/current_deck';

const DeckView = () => {
  const { deckId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getDeck(deckId));
    })();
  });

  

  return <div>{deckId}</div>;
};

export default DeckView;
