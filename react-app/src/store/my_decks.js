const LOAD_MY_DECKS = 'decks/LOAD_MY_DECKS';
const ADD_DECK = 'decks/ADD_DECK';
const EDIT_DECK = 'decks/EDIT_DECK';
const REMOVE_DECK = 'decks/REMOVE_DECK';


const load = (list) => ({
  type: LOAD_MY_DECKS,
  list,
});

const add = (deck) => ({
  type: ADD_DECK,
  deck,
});

const update = (deck) => ({
  type: EDIT_DECK,
  deck,
});

const remove = (id) => ({
  type: REMOVE_DECK,
  id,
});

export const getMyDecks = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/users/${user_id}/decks/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const myDecks = await response.json();
    dispatch(load(myDecks['decks']));
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

export const addNewDeck = (formData) => async (dispatch) => {
  const response = await fetch('/api/decks/', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    const deck = await response.json();
    dispatch(add(deck));
    return +deck.id;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ['An error occurred.'];
  }
};

export const editDeck = (formData) => async (dispatch) => {
  const response = await fetch(`/api/decks/${formData.get('deck_id')}/`, {
    method: 'PUT',
    body: formData,
  });
  if (response.ok) {
    const deck = await response.json();
    dispatch(update(deck));
    return +deck.id;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ['An error occurred.'];
  }
};

export const deleteDeck = (id) => async (dispatch) => {
  const response = await fetch(`/api/decks/${id}/`, {
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

export default function myDeckReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_MY_DECKS: {
      const normalDecks = {};
      action.list.forEach((deck) => (normalDecks[deck.id] = deck));
      return { ...normalDecks };
    }
    case ADD_DECK: {
      return { ...state, [action.deck.id]: action.deck };
    }
    case EDIT_DECK: {
      newState = { ...state };
      newState[action.deck.id] = action.deck;
      return newState;
    }
    case REMOVE_DECK: {
      newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    default:
      return state;
  }
}
