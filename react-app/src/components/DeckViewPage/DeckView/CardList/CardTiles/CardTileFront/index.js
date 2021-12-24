import React from 'react';

const CardTileFront = ({ card, classPass }) => {
  let upperTitle;
  if (card.title) {
    upperTitle = card.title[0].toUpperCase() + card.title.slice(1);
  }

  return (
    <div className={`card-tile-front ${classPass}`}>
      <div className="front-main">
        <h2 className="card-title">{upperTitle}</h2>

        {card.pronunciation ? <p>Prononciation: {card.pronunciation}</p> : null}
        {card.emoji ? <p>{card.emoji}</p> : null}
      </div>
      <div className="front-side">
        {card.has_image ? (
          <img className="card-sticker" src={card.image_url} alt={'sticker'} />
        ) : null}
      </div>{' '}
    </div>
  );
};

export default CardTileFront;
