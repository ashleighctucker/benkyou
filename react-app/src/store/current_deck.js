const LOAD_DECK = 'deck/LOAD_DECK';
const ADD_CARD = 'card/ADD_CARD';

const load = (deck) => ({
  type: LOAD_DECK,
  deck,
});

const add = (card) => ({
  type: ADD_CARD,
  card,
});

export const getDeck = (id) => async (dispatch) => {
  const response = await fetch(`/api/decks/${id}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const deck = await response.json();
    dispatch(load(deck));
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

export const addCardToDeck = (formData) => async (dispatch) => {
  const response = await fetch('/api/cards/', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    const card = await response.json();
    dispatch(add(card));
    return +card.deck_id;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ['An error occurred.'];
  }
};

const initialState = {};

export default function currentDeckReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_DECK:
      return { ...action.deck };
    case ADD_CARD:
      newState = { ...state };
      newState['cards'][action.card.id] = action.card;
      return newState;
    default:
      return state;
  }
}
