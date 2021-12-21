import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getDeck } from '../../../store/current_deck';
import DeleteDeckModal from './DeleteDeckButton';
import EditDeckModal from './EditDeckButton';
import CardList from './CardList';
import './DeckView.css';

const DeckView = () => {
  const { deckId } = useParams();
  const deck = useSelector((state) => state.current_deck);
  const categories = useSelector((state) => state.categories);
  const deckCat = categories[deck.category_id];

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getDeck(deckId));
    })();
  }, [dispatch, deckId]);

  return (
    <div className="deck-view-container">
      <div className="deck-info-container">
        <div className="deck-title">
          {deck.has_image ? (
            <div
              className="deck-cover"
              style={{
                backgroundImage: `url(${deck.cover_photo_url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
          ) : null}
          <div>
            {deck.title}
            <p className="deck-category">
              Category:
              <span style={{ color: `#${deckCat?.color_hex}` }}>
                {'  '}
                {deck.category}
              </span>
            </p>
          </div>
        </div>
        <div className="deck-buttons">
          <EditDeckModal />
          <DeleteDeckModal />
        </div>
        <div className="deck-maker">
          <p>
            Created by: {deck.creator} on{'  '}
            {new Date(deck.created_on).toDateString()}
          </p>
          <div>
            <button>Add Card</button>
          </div>
        </div>
      </div>
      <div className="card-list-container">
        <CardList />
      </div>
    </div>
  );
};

export default DeckView;
