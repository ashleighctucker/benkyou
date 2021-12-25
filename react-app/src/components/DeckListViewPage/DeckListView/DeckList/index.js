import React from 'react';
import { useHistory } from 'react-router-dom';

import './DeckList.css';

const DeckList = ({ decklist, decksObj }) => {

  const makeList = () => {
    let list = [];
    for (let key in decksObj) {
      let tile = (
        <div
          onClick={() => history.push(`/decks/${decksObj[key].id}`)}
          key={decksObj[key].id}
          className="deck-tile"
        >
          <div className="deck-tile-title">
            <h1>{decksObj[key].title}</h1>
            <p>
              Created By: {decksObj[key].creator} on{' '}
              {new Date(decksObj[key].created_on).toDateString()}
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
