import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DoorBackTwoToneIcon from '@mui/icons-material/DoorBackTwoTone';

import { getDecklist, getAllCards } from '../../../store/current_list';
import CardSlider from '../../StudyDeckPage/StudyView/CardSlider';

const DecklistStudyView = () => {
  const { decklistId } = useParams();
  const list = useSelector((state) => state.current_list);
  const cards = useSelector((state) => state.current_list['all_cards']);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getDecklist(decklistId));
      await dispatch(getAllCards(decklistId));
    })();
  }, [dispatch, decklistId]);

  return (
    <div className="main">
      <h1>Studying {list?.title} </h1>
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

export default DecklistStudyView;
