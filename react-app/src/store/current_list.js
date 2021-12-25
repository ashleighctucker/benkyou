const LOAD_LIST = 'decklist/LOAD_DECK_LIST';
const LOAD_CARDS = 'decklist/LOAD_ALL_CARDS';

const load = (decklist) => ({
  type: LOAD_LIST,
  decklist,
});

const loadCards = (list) => ({
  type: LOAD_CARDS,
  list,
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
    default:
      return state;
  }
}
