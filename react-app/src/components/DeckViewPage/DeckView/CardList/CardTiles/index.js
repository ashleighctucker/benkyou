import React from 'react';

import EditCardButton from './CardEditButton';
import DeleteCardButton from './CardDeleteButton';
import SwitchDeckButton from './SwitchDeckButton';
import CardTileFront from './CardTileFront';
import CardTileBack from './CardTileBack';

import '../CardList.css';

const CardTiles = ({ card, classPass }) => {
  return (
    <div className="card-tile-container">
      <div className="card-button-container">
        <EditCardButton card={card} />
        <DeleteCardButton card={card} />
        <SwitchDeckButton card={card} />
      </div>
      <CardTileFront card={card} classPass={classPass} />
      <CardTileBack card={card} classPass={classPass} />
    </div>
  );
};

export default CardTiles;
