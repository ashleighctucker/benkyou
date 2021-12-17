import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from './components/Navbar';
import ProtectedRoute from './components/auth/ProtectedRoute';

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
        <ProtectedRoute path="/" exact={true}>
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
