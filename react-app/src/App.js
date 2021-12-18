import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// components
import NavBar from './components/Navbar';
import NewDeckForm from './components/NewDeckForm';

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
      <NavBar />
      <Switch>
        <Route path="/new-deck">
          <NewDeckForm />
        </Route>
        <Route path="/">
          <h1>Home Page</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
