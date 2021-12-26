import React from 'react';
import { useSelector } from 'react-redux';

import EditCardButton from './CardEditButton';
import DeleteCardButton from './CardDeleteButton';
import SwitchDeckButton from './SwitchDeckButton';
import CardTileFront from './CardTileFront';
import CardTileBack from './CardTileBack';

import '../CardList.css';

const CardTiles = ({ card, classPass }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const deck_owner_id = useSelector((state) => state.current_deck.owner_id);

  let owner = false;
  if (+sessionUser?.id === +deck_owner_id) {
    owner = true;
  }

  return (
    <div className="card-tile-container">
      {owner ? (
        <div className="card-button-container">
          <EditCardButton card={card} />
          <DeleteCardButton card={card} />
          <SwitchDeckButton card={card} />
        </div>
      ) : null}
      <CardTileFront card={card} classPass={classPass} />
      <CardTileBack card={card} classPass={classPass} />
    </div>
  );
};

export default CardTiles;
