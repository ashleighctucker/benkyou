const LOAD_DECK = 'deck/LOAD_DECK';

const load = (deck) => ({
  type: LOAD_DECK,
  deck,
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

const initialState = {};

export default function currentDeckReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DECK:
      return { ...action.deck };
    default:
      return state;
  }
}
