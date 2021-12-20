import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// components
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import NewDeckPage from './components/NewDeckPage';
import DeckViewPage from './components/DeckViewPage';

// thunks
import { authenticate } from './store/session';
import { getCategories } from './store/categories';
import { getMyDecks } from './store/my_decks';
import { getMyDeckLists } from './store/my_deck_lists';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
        .then(async (id) => {
          if (id) {
            await dispatch(getMyDecks(id));
            await dispatch(getMyDeckLists(id));
          }
        })
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
          <Route path="/decks/:deckId">
            <DeckViewPage className="main-grid" />
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
