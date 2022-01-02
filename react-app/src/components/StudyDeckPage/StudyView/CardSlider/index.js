import React, { useState } from 'react';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import SyncIcon from '@mui/icons-material/Sync';

import CardTileFront from '../../../DeckViewPage/DeckView/CardList/CardTiles/CardTileFront';
import CardTileBack from '../../../DeckViewPage/DeckView/CardList/CardTiles/CardTileBack';
import './CardSlider.css';

const CardSlider = ({ cards }) => {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const cardsView = () => {
    const res = [];
    for (let i = 0; i < cards.length; i++) {
      let view = (
        <div
          key={`inner ${cards[i].id}`}
          className={`flip-card-inner ${
            i === current ? 'slide active' : 'slide'
          }`}
        >
          {i === current && (
            <>
              <div className="card-num">
                <h2>
                  Card {i + 1} / {cards.length}
                </h2>
              </div>
              <CardTileFront
                key={`front ${cards[i].id}`}
                card={cards[i]}
                classPass={`flip-card-front ${flipped ? null : 'flipped'}`}
              />
              <CardTileBack
                key={`back ${cards[i].id}`}
                card={cards[i]}
                classPass={`flip-card-back ${flipped ? 'flipped' : null}`}
              />
              <button
                className="flip-button deck-view-button"
                onClick={() => setFlipped(!flipped ? true : false)}
              >
                <SyncIcon /> Flip
              </button>
            </>
          )}
        </div>
      );
      res.push(view);
    }
    return res;
  };
  const slides = cardsView();
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
    setFlipped(false);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    setFlipped(false);
  };

  if (!Array.isArray(slides) || length <= 0) {
    return null;
  }

  return (
    <div className="slider-block">
      <div className="slider">
        <ArrowBackTwoToneIcon
          className="left-arrow arrow"
          onClick={prevSlide}
        />
        <ArrowForwardTwoToneIcon
          className="right-arrow arrow"
          onClick={nextSlide}
        />
        {cards ? [...slides] : null}
      </div>
    </div>
  );
};

export default CardSlider;
