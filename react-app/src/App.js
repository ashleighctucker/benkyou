import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// components
import NavBar from './components/Navbar';
import Footer from './components/Footer';

import NewDeckListPage from './components/NewDeckListPage';
import NewDeckPage from './components/NewDeckPage';
import NewCardPage from './components/NewCardPage';

import DeckViewPage from './components/DeckViewPage';
import DeckListViewPage from './components/DeckListViewPage';

import StudyDeckPage from './components/StudyDeckPage';
import ShuffleStudyDeckPage from './components/ShuffleStudyPage';
import StudyDecklistPage from './components/StudyDecklistPage';
import ShuffleStudyDecklistPage from './components/ShuffleStudyDecklistPage';
// thunks
import { authenticate } from './store/session';
import { getCategories } from './store/categories';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
        .then(() => dispatch(getCategories()))
        .then(() => setLoaded(true));
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="content">
        <NavBar id="nav-grid" />
        <Switch>
          <Route path="/new-deck">
            <NewDeckPage className="main-grid" />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            <DeckViewPage />
          </Route>
          <Route exact={true} path="/decks/:deckId/add-card">
            <NewCardPage />
          </Route>
          <Route exact={true} path="/decks/:deckId/study">
            <StudyDeckPage />
          </Route>
          <Route exact={true} path="/decks/:deckId/shuffled-study">
            <ShuffleStudyDeckPage />
          </Route>
          <Route path="/new-deck-list">
            <NewDeckListPage />
          </Route>
          <Route exact={true} path="/decklists/:decklistId">
            <DeckListViewPage />
          </Route>
          <Route exact={true} path="/decklists/:decklistId/study">
            <StudyDecklistPage />
          </Route>
          <Route exact={true} path="/decklists/:decklistId/shuffled-study">
            <ShuffleStudyDecklistPage />
          </Route>
          <Route path="/">
            <h1 className="main-grid">Home Page</h1>
          </Route>
        </Switch>
      </div>
      <Footer className="footer" />
    </BrowserRouter>
  );
}

export default App;
