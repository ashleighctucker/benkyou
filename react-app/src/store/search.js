const LOAD_RESULTS = 'search/LOAD_RESULTS';

const load = (list) => ({
  type: LOAD_RESULTS,
  list,
});

export const searchDecks = (term) => async (dispatch) => {
  const response = await fetch(`/api/search/${term}`, {
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
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

const initialState = {};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_RESULTS: {
      return { ...action.list };
    }
    default:
      return state;
  }
}
