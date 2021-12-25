const LOAD_LIST = 'decklist/LOAD_DECK_LIST';
const LOAD_CARDS = 'decklist/LOAD_ALL_CARDS';
const ADD_DECK = 'decklist/ADD_DECK';

const load = (decklist) => ({
  type: LOAD_LIST,
  decklist,
});

const loadCards = (list) => ({
  type: LOAD_CARDS,
  list,
});

const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
});

export const getDecklist = (id) => async (dispatch) => {
  const response = await fetch(`/api/decklists/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const decklist = await response.json();
    dispatch(load(decklist));
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
  const response = await fetch(`/api/decklists/cards/${id}/`, {
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

const initialState = {};

export default function currentDecklistReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_LIST:
      return { ...action.decklist };
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
    default:
      return state;
  }
}
