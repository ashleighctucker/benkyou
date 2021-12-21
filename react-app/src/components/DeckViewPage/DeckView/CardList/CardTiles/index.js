import React from 'react';

import EditCardButton from './CardEditButton';

import '../CardList.css';

const CardTiles = ({ card, classPass }) => {
  return (
    <div className="card-tile-container">
      <div className="card-button-container">
        <EditCardButton card={card} />
      </div>
      <div className={`card-tile-front ${classPass}`}>
        <div className="front-main">
          <h2 className="card-title">
            {card.title[0].toUpperCase() + card.title.slice(1)}
          </h2>

          {card.pronunciation ? (
            <p>Prononciation: {card.pronunciation}</p>
          ) : null}
          {card.emoji ? <p>{card.emoji}</p> : null}
        </div>
        <div className="front-side">
          {card.has_image ? (
            <img
              className="card-sticker"
              src={card.image_url}
              alt={'sticker'}
            />
          ) : null}
        </div>
      </div>
      <div className={`card-tile-back ${classPass}`}>
        <p> Definition: {card.definition}</p>
        {card.example ? <p>Example: {card.example}</p> : null}
        {card.type ? <p>Type: {card.type}</p> : null}
      </div>
    </div>
  );
};

export default CardTiles;
