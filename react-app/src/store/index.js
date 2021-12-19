import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import session from './session';
import categoryReducer from './categories';
import myDeckReducer from './my_decks';
import myDeckListReducer from './my_deck_lists';
import searchReducer from './search';
import currentDeckReducer from './current_deck';

const rootReducer = combineReducers({
  session,
  categories: categoryReducer,
  my_decks: myDeckReducer,
  my_deck_lists: myDeckListReducer,
  search_results: searchReducer,
  current_deck: currentDeckReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
