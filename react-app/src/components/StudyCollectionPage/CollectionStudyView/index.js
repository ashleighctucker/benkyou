import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DoorBackTwoToneIcon from '@mui/icons-material/DoorBackTwoTone';

import { getCurrentCollection, getAllCards } from '../../../store/current_collection';
import CardSlider from '../../StudyDeckPage/StudyView/CardSlider';

const CollectionStudyView = () => {
  const { collectionId } = useParams();
  const collection = useSelector((state) => state.current_collection);
  const cards = useSelector((state) => state.current_collection['all_cards']);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getCurrentCollection(collectionId));
      await dispatch(getAllCards(collectionId));
    })();
  }, [dispatch, collectionId]);

  return (
    <div className="main">
      <h1>Studying {collection?.title} </h1>
      <h3>
        created by {collection.creator} on {new Date(collection.created_on).toDateString()}
      </h3>
      {cards?.length > 0 && <CardSlider cards={cards} />}
      <button
        id="return-button"
        className="deck-view-button"
        onClick={() => history.push(`/collections/${collection.id}`)}
      >
        <DoorBackTwoToneIcon /> Return to Collection Page
      </button>
    </div>
  );
};

export default CollectionStudyView;
