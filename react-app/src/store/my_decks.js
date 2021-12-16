const LOAD_MY_DECKS = 'decks/LOAD_MY_DECKS';

const load = (list) => ({
  type: LOAD_MY_DECKS,
  list,
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

const initialState = {};

export default function myDeckReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MY_DECKS: {
      return { ...action.list };
    }
    default:
      return state;
  }
}
