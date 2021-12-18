const LOAD_MY_DECKS = 'decks/LOAD_MY_DECKS';
const ADD_DECK = 'decks/ADD_DECK';

const load = (list) => ({
  type: LOAD_MY_DECKS,
  list,
});

const add = (deck) => ({
  type: ADD_DECK,
  deck,
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

export const addNewDeck =
  (title, cover_photo_url, category_id, user_id) => async (dispatch) => {
    if (!cover_photo_url)
      cover_photo_url =
        'https://www.pikpng.com/pngl/m/104-1048710_png-file-svg-smile-icon-clipart.png';

    const response = await fetch('/api/decks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        cover_photo_url,
        category_id,
        user_id,
      }),
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

const initialState = {};

export default function myDeckReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MY_DECKS: {
      const normalDecks = {};
      action.list.forEach((deck) => (normalDecks[deck.id] = deck));
      return { ...normalDecks };
    }
    case ADD_DECK: {
      return { ...state, [action.deck.id]: action.deck };
    }
    default:
      return state;
  }
}
