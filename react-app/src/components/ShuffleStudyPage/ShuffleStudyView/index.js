import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DoorBackTwoToneIcon from '@mui/icons-material/DoorBackTwoTone';

import { getDeck } from '../../../store/current_deck';
import CardSlider from '../../StudyDeckPage/StudyView/CardSlider';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const ShuffleStudyView = () => {
  const { deckId } = useParams();
  const deck = useSelector((state) => state.current_deck);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getDeck(deckId));
    })();
  }, [dispatch, deckId]);

  const cardsArr = [];
  for (let key in deck.cards) {
    cardsArr.push(deck.cards[key]);
  }

  shuffleArray(cardsArr);

  return (
    <div className="main">
      <h1>Studying {deck?.title} (shuffled) </h1>
      <h3>
        created by {deck.creator} on {new Date(deck.created_on).toDateString()}
      </h3>
      <CardSlider cards={cardsArr} />
      <button
        id="return-button"
        className="deck-view-button"
        onClick={() => history.push(`/decks/${deck.id}`)}
      >
        <DoorBackTwoToneIcon /> Return to Deck Page
      </button>
    </div>
  );
};

export default ShuffleStudyView;
