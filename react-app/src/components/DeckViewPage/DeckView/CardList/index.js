import React from 'react';
import { useSelector } from 'react-redux';

import CardTiles from './CardTiles';
import './CardList.css';

const CardList = () => {
  const deck = useSelector((state) => state.current_deck);
  const cardsObj = useSelector((state) => state.current_deck.cards);
  const cards = [];
  for (let key in cardsObj) {
    cards.push(cardsObj[key]);
  }

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
      {cards ? (
        <div id="card-count">
          <h1>
            Cards in {deck.title} ({cards.length})
          </h1>
        </div>
      ) : null}
      {cards ? makeTiles() : null}
    </div>
  );
};

export default CardList;
