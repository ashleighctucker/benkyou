import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ShuffleTwoToneIcon from '@mui/icons-material/ShuffleTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';

import AddDeckButton from './AddDeckButton';
import EditCollectionButton from './EditCollectionButton';
import DeleteCollectionButton from './DeleteCollectionButton';
import { getCurrentCollection, getAllCards } from '../../../store/current_collection';
import DeckList from './DeckList';

const CollectionView = () => {
  const { collectionId } = useParams();
  const collection = useSelector((state) => state.current_collection);
  const sessionUser = useSelector((state) => state.session.user);

  let owner = false;
  if (+collection.owner_id === +sessionUser?.id) {
    owner = true;
  }
   let options = {
     weekday: 'long',
     year: 'numeric',
     month: 'long',
     day: 'numeric',
   };

  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getCurrentCollection(collectionId));
      await dispatch(getAllCards(collectionId));
    })();
  }, [dispatch, collectionId]);

  return (
    <div className="deck-view-container splash-div">
      <div className="deck-info-container">
        <div className="deck-title">
          {collection.has_image ? (
            <div
              className="deck-cover"
              style={{
                backgroundImage: `url(${collection.cover_photo_url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                border: '5px solid #157A6E',
              }}
            />
          ) : null}
          <div>{collection.title}</div>
        </div>
        <div className="study-buttons">
          {collection.all_cards && (
            <h4>{collection.all_cards.length} Cards in Collection</h4>
          )}
          {collection.all_cards && sessionUser ? (
            <button
              onClick={() => history.push(`/collections/${collection.id}/study`)}
              className="deck-view-button"
            >
              <SchoolTwoToneIcon />
              Study Collection
            </button>
          ) : null}
          {collection.all_cards && sessionUser ? (
            <button
              onClick={() =>
                history.push(`/collections/${collection.id}/shuffled-study`)
              }
              className="deck-view-button"
            >
              <ShuffleTwoToneIcon /> Shuffle Collection
            </button>
          ) : null}
        </div>
        <div className="deck-buttons">
          {owner && (
            <>
              <AddDeckButton />
              <EditCollectionButton />
              <DeleteCollectionButton />
            </>
          )}
        </div>
        <div className="deck-maker">
          <p>
            Created by: {collection.creator} on{'  '}
            {new Date(collection.created_on).toLocaleDateString('en-US', options)}
          </p>
        </div>
      </div>
      <div id="buffer-main"></div>
      <div className="card-list-container">
        <DeckList
          decklist={collection}
          decksObj={collection['decks']}
          owner={owner}
        />
      </div>
      <div id="buffer-cards"></div>
    </div>
  );
};

export default CollectionView;
