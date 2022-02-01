import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// reducers
import session from './session';
import categoryReducer from './categories';
import myDeckReducer from './my_decks';
import collectionReducer from './collections';
import searchReducer from './search';
import currentDeckReducer from './current_deck';
import currentDecklistReducer from './current_list';

const rootReducer = combineReducers({
  session,
  categories: categoryReducer,
  my_decks: myDeckReducer,
  collections: collectionReducer,
  search_results: searchReducer,
  current_deck: currentDeckReducer,
  current_list: currentDecklistReducer,
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
