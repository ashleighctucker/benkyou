import React from 'react';
import { useSelector } from 'react-redux';

import CardTiles from './CardTiles';
import './CardList.css';

const CardList = () => {
  const cards = useSelector((state) => state.current_deck.cards);

  const makeTiles = () => {
    const tiles = [];
    for (let key in cards) {
      tiles.push(<CardTiles key={key} card={cards[key]} />);
    }
    return tiles;
  };

  return (
    <div id="card-view">
      {cards ? <h1>Cards ({Object.keys(cards).length})</h1> : null}
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
