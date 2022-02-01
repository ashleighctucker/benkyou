import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DoorBackTwoToneIcon from '@mui/icons-material/DoorBackTwoTone';

import { getCurrentCollection, getAllCards } from '../../../store/current_list';
import CardSlider from '../../StudyDeckPage/StudyView/CardSlider';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const ShuffleStudyDecklistView = () => {
  const { decklistId } = useParams();
  const list = useSelector((state) => state.current_list);
  const cards = useSelector((state) => state.current_list['all_cards']);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getCurrentCollection(decklistId));
      await dispatch(getAllCards(decklistId));
    })();
  }, [dispatch, decklistId]);

  if (cards) {
    shuffleArray(cards);
  }

  return (
    <div className="main splash-div">
      <h1>Studying {list?.title} (shuffled) </h1>
      <h3>
        created by {list.creator} on {new Date(list.created_on).toDateString()}
      </h3>
      {cards?.length > 0 && <CardSlider cards={cards} />}
      <button
        id="return-button"
        className="deck-view-button"
        onClick={() => history.push(`/decklists/${list.id}`)}
      >
        <DoorBackTwoToneIcon /> Return to List Page
      </button>
    </div>
  );
};

export default ShuffleStudyDecklistView;
