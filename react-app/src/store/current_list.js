const LOAD_LIST = 'deck/LOAD_DECK_LIST';

const load = (decklist) => ({
  type: LOAD_LIST,
  decklist,
});

export const getDecklist = (id) => async (dispatch) => {
  const response = await fetch(`/api/decklist/${id}/`, {
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

const initialState = {};

export default function currentDecklistReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_LIST:
      return { ...action.decklist };
    default:
      return state;
  }
}
