const LOAD_COLLECTION = 'collection/LOAD_COLLECTION';
const LOAD_CARDS = 'collection/LOAD_ALL_CARDS';
const ADD_DECK = 'decklist/ADD_DECK';
const REMOVE_DECK = 'decklist/REMOVE_DECK';

const load = (collection) => ({
  type: LOAD_COLLECTION,
  collection,
});

const loadCards = (list) => ({
  type: LOAD_CARDS,
  list,
});

const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
});

const removeDeck = (id) => ({
  type: REMOVE_DECK,
  id,
});

export const getCurrentCollection = (id) => async (dispatch) => {
  const response = await fetch(`/api/collections/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const collection = await response.json();
    dispatch(load(collection));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const getAllCards = (id) => async (dispatch) => {
  const response = await fetch(`/api/collections/cards/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const cards = await response.json();
    dispatch(loadCards(cards['cards']));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const addDeckToDeckList = (decklist_id, deck_id) => async (dispatch) => {
  const response = await fetch(
    `/api/decklists/${decklist_id}/add/${deck_id}/`,
    {
      method: 'PATCH',
    }
  );
  if (response.ok) {
    const deck = await response.json();
    dispatch(addDeck(deck));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const removeDeckFromList =
  (decklist_id, deck_id) => async (dispatch) => {
    const response = await fetch(
      `/api/decklists/${decklist_id}/remove/${deck_id}/`,
      {
        method: 'PATCH',
      }
    );
    if (response.ok) {
      const deckId = await response.json();
      await dispatch(removeDeck(deckId['id']));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.'];
    }
  };

const initialState = {};

export default function currentCollectionReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_COLLECTION:
      return { ...action.collection };
    case LOAD_CARDS:
      const cards = [];
      action.list.forEach((arr, i) => cards.push(...action.list[i]));
      newState = { ...state };
      newState['all_cards'] = cards;
      return newState;
    case ADD_DECK:
      newState = { ...state };
      newState['decks'][action.deck.id] = action.deck;
      return newState;
    case REMOVE_DECK:
      newState = { ...state };
      delete newState['decks'][action.id];
      return newState;
    default:
      return state;
  }
}
