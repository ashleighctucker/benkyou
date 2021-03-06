import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// components
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import SplashPage from './components/SplashPage';

import NewCollectionPage from './components/NewCollectionPage';
import NewDeckPage from './components/NewDeckPage';
import NewCardPage from './components/NewCardPage';

import DeckViewPage from './components/DeckViewPage';
import CollectionViewPage from './components/CollectionViewPage';
import SearchResultsPage from './components/SearchResultsPage';
import ProfilePage from './components/ProfilePage';

import StudyDeckPage from './components/StudyDeckPage';
import ShuffleStudyDeckPage from './components/ShuffleStudyPage';
import StudyCollectionPage from './components/StudyCollectionPage';
import ShuffleStudyCollectionPage from './components/ShuffleStudyCollectionPage';
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
          <Route path="/benkyou/search-results/:term">
            <SearchResultsPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
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
          <Route path="/new-collection">
            <NewCollectionPage />
          </Route>
          <Route exact={true} path="/collections/:collectionId">
            <CollectionViewPage />
          </Route>
          <Route exact={true} path="/collections/:collectionId/study">
            <StudyCollectionPage />
          </Route>
          <Route exact={true} path="/collections/:collectionId/shuffled-study">
            <ShuffleStudyCollectionPage />
          </Route>
          <Route path="/">
            <SplashPage />
          </Route>
        </Switch>
      </div>
      <Footer className="footer" />
    </BrowserRouter>
  );
}

export default App;
