const LOAD_RESULTS = 'search/LOAD_RESULTS';
const RESET_RESULTS = 'search/RESET_RESULTS';

const load = (list) => ({
  type: LOAD_RESULTS,
  list,
});

const reset = () => ({
  type: RESET_RESULTS,
});

export const searchDecks = (term) => async (dispatch) => {
  if (!term) term = ' ';
  const response = await fetch(`/api/search/${term}/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const search_results = await response.json();
    dispatch(load(search_results['search']));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    dispatch(reset());
    return data;
  } else {
    return ['An error occurred. Please try again.'];
  }
};

const initialState = {};

export default function searchReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_RESULTS: {
      newState = {};
      action.list.forEach((deck) => (newState[deck.id] = deck));
      return newState;
    }
    case RESET_RESULTS:
      return {};
    default:
      return state;
  }
}
