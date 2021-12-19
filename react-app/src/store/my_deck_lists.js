const LOAD_MY_DECK_LISTS = 'decks/LOAD_MY_DECK_LISTS';

const load = (list) => ({
  type: LOAD_MY_DECK_LISTS,
  list,
});

export const getMyDeckLists = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/users/${user_id}/decklists/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const myDeckLists = await response.json();
    dispatch(load(myDeckLists['decklists']));
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

export default function myDeckListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MY_DECK_LISTS: {
      const normalDeckLists = {};
      action.list.forEach((list) => (normalDeckLists[list.id] = list));
      return { ...normalDeckLists };
    }
    default:
      return state;
  }
}
