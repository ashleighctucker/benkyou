import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './DeckList.css';

const DeckList = () => {
  const decklist = useSelector((state) => state.current_list);
  const decks = useSelector((state) => state.current_list.decks);

  const history = useHistory();

  return (
    <div id="card-view" className="deck-view">
      {decks ? (
        <div id="card-count">
          <h1>
            Decks in {decklist.title} ({decks.length})
          </h1>
        </div>
      ) : null}
      {decks?.map((deck) => (
        <div
          onClick={() => history.push(`/decks/${deck.id}`)}
          key={deck.id}
          className="deck-tile"
        >
          <div className="deck-tile-title">
            <h1>{deck.title}</h1>
            <p>
              Created By: {deck.creator} on{' '}
              {new Date(deck.created_on).toDateString()}
            </p>
            <p>Cards: {deck.cards_amount}</p>
          </div>
          {deck.has_image ? (
            <div
              className="card-sticker deck-sticker"
              style={{
                backgroundImage: `url(${deck.cover_photo_url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default DeckList;
