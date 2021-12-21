const LOAD_DECK = 'deck/LOAD_DECK';
const ADD_CARD = 'card/ADD_CARD';
const UPDATE_CARD = 'card/UPDATE_CARD';
const REMOVE_CARD = 'card/REMOVE_CARD';

const load = (deck) => ({
  type: LOAD_DECK,
  deck,
});

const add = (card) => ({
  type: ADD_CARD,
  card,
});

const update = (card) => ({
  type: UPDATE_CARD,
  card,
});

const remove = (id) => ({
  type: REMOVE_CARD,
  id,
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

export const editCard = (formData) => async (dispatch) => {
  const response = await fetch(`/api/cards/${formData.get('card_id')}/`, {
    method: 'PUT',
    body: formData,
  });
  if (response.ok) {
    const card = await response.json();
    dispatch(update(card));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ['An error occurred.'];
  }
};

export const deleteCard = (id) => async (dispatch) => {
  const response = await fetch(`/api/cards/${id}/`, {
    method: 'DELETE',
  });
  if (response.ok) {
    const message = await response.json();
    await dispatch(remove(id));
    return message;
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
    case UPDATE_CARD:
      newState = { ...state };
      newState['cards'][action.card.id] = action.card;
      return newState;
    case REMOVE_CARD:
      newState = { ...state };
      delete newState['cards'][action.id];
      return newState;
    default:
      return state;
  }
}
