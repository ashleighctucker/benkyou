import React from 'react';
import { useSelector } from 'react-redux';

import CardTiles from './CardTiles';
import './CardList.css';

const CardList = () => {
  const cards = useSelector((state) => state.current_deck.cards);

  const makeTiles = () => {
    const tiles = [];
    for (let i = 0; i < cards.length; i++) {
      let tile = (
        <CardTiles
          key={i}
          card={cards[i]}
          classPass={i % 2 === 0 ? 'even-card' : 'odd-card'}
        />
      );
      tiles.push(tile);
    }
    return tiles;
  };

  return (
    <div id="card-view">
      {cards ? <h1>Cards ({cards.length})</h1> : null}
      {cards ? (
        <div className="card-tile-container">
          <div className="tile-example">
            <h2>Front</h2>
          </div>
          <div className="tile-example">
            <h2>Back</h2>
          </div>
        </div>
      ) : null}
      {cards ? makeTiles() : null}
    </div>
  );
};

export default CardList;
