import React, { useState } from 'react';
import SideBar from '../SideBar';
import { useSelector, useDispatch } from 'react-redux';
import './SplashPage.css';
import SyncIcon from '@mui/icons-material/Sync';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import SignUpForm from '../Navbar/SignupButtonModal/SignUpForm';
import { login } from '../../store/session';

import CardTileFront from '../DeckViewPage/DeckView/CardList/CardTiles/CardTileFront';
import CardTileBack from '../DeckViewPage/DeckView/CardList/CardTiles/CardTileBack';

const SplashPage = () => {
  const splashCard = useSelector((state) => state.session.splash?.card);
  const sessionUser = useSelector((state) => state.session.user);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const dispatch = useDispatch();
  const demoLogin = async () => {
    await dispatch(login('benkyou@benkyou.com', 'password'));
  };

  return (
    <div className="main-grid main-page-grid-container splash-div">
      <SideBar className="side" />
      <div className="main">
        <h1 className="fade-in-first">
          Welcome to <span id="splash-logo">勉強 benkyou</span>
        </h1>
        <p className="fade-in-first">
          Benkyou is an app to create study decks and flash-cards, like this
          one...
        </p>
        {splashCard && (
          <div className="flip-card-inner fade-in-first">
            <CardTileFront
              card={splashCard}
              classPass={`flip-card-front  ${flipped ? null : 'flipped'}`}
            />
            <CardTileBack
              card={splashCard}
              classPass={`flip-card-back ${flipped ? 'flipped' : null}`}
            />
            <button
              className="flip-button deck-view-button"
              onClick={() => setFlipped(!flipped ? true : false)}
            >
              <SyncIcon /> Flip
            </button>
          </div>
        )}
        <div className="main">
          {sessionUser ? (
            <>
              <p className="fade-in-first">
                Hi {sessionUser.first_name}, we suggest getting started with{' '}
                <NavLink className="benkyou-link" to="/decks/1/study">
                  studing our starter deck
                </NavLink>{' '}
                to see what the app is like.
              </p>
              <p className="fade-in-first">
                Or if you're feeling ready...{' '}
                <NavLink className="benkyou-link" to="new-deck">
                  create a deck.
                </NavLink>
              </p>
            </>
          ) : (
            <>
              <p className="fade-in-first">
                Hi 学生(student), we suggest getting started with{' '}
                <span className="benkyou-link" onClick={demoLogin}>
                  trying our site as a demo user
                </span>{' '}
                to see what the app is like.
              </p>
              <p className="fade-in-first">
                Or if you're feeling ready...{' '}
                <span
                  className="benkyou-link"
                  onClick={() => setShowSignUpModal(true)}
                >
                  sign up for benkyou
                </span>
                {showSignUpModal && (
                  <Modal onClose={() => setShowSignUpModal(false)}>
                    <SignUpForm />
                  </Modal>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
