import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

import { removeDeckFromList } from '../../../../store/current_collection';
import './DeckList.css';

const DeckList = ({ decklist, decksObj, owner }) => {
  const dispatch = useDispatch();
   let options = {
     weekday: 'long',
     year: 'numeric',
     month: 'long',
     day: 'numeric',
   };

  const makeList = () => {
    let list = [];
    for (let key in decksObj) {
      let tile = (
        <div key={decksObj[key].id} className="deck-tile-container">
          {owner && (
            <div className="deck-button-container">
              <button
                onClick={() =>
                  dispatch(removeDeckFromList(decklist.id, decksObj[key].id))
                }
                className="deck-view-button"
              >
                <RemoveCircleTwoToneIcon /> Remove From List
              </button>
            </div>
          )}
          <div
            onClick={() => history.push(`/decks/${decksObj[key].id}`)}
            className="deck-tile"
            style={{ border: `5px solid #${decksObj[key].color}` }}
          >
            <div className="deck-tile-title">
              <h1>{decksObj[key].title}</h1>
              <p>
                Created By: {decksObj[key].creator} on{' '}
                {new Date(decksObj[key].created_on).toLocaleDateString(
                  'en-US',
                  options
                )}
              </p>
              <p>Cards: {decksObj[key].cards_amount}</p>
            </div>
            {decksObj[key].has_image ? (
              <div
                className="card-sticker deck-sticker"
                style={{
                  backgroundImage: `url(${decksObj[key].cover_photo_url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
            ) : null}
          </div>
        </div>
      );
      list.push(tile);
    }
    return list;
  };

  const history = useHistory();

  return (
    <div id="card-view" className="deck-view">
      {decksObj && Object.keys(decksObj).length > 0 ? (
        <div id="card-count">
          <h1>
            Decks in {decklist.title} ({Object.keys(decksObj).length})
          </h1>
        </div>
      ) : null}
      {makeList()}
    </div>
  );
};

export default DeckList;
