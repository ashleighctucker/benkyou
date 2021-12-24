import React from 'react';

const CardTileBack = ({ card, classPass }) => {
  return (
    <div className={`card-tile-back ${classPass}`}>
      <p className="back-info"> Definition: {card.definition}</p>
      {card.example ? (
        <p className="back-info">Example: {card.example}</p>
      ) : null}
      {card.type ? <p className="back-info">Type: {card.type}</p> : null}
    </div>
  );
};

export default CardTileBack;
