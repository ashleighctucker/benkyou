const LOAD_MY_DECK_LISTS = 'decklists/LOAD_MY_DECK_LISTS';
const ADD_LIST = 'decklists/ADD_LIST';
const EDIT_LIST = 'decklists/EDIT_LIST';

const load = (list) => ({
  type: LOAD_MY_DECK_LISTS,
  list,
});

const add = (decklist) => ({
  type: ADD_LIST,
  decklist,
});

const update = (decklist) => ({
  type: EDIT_LIST,
  decklist,
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

export const addNewDeckList = (formData) => async (dispatch) => {
  const response = await fetch('/api/decklists/', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    const decklist = await response.json();
    dispatch(add(decklist));
    return +decklist.id;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ['An error occurred.'];
  }
};

export const editDecklist = (formData) => async (dispatch) => {
  const response = await fetch(
    `/api/decklists/${formData.get('decklist_id')}/`,
    {
      method: 'PUT',
      body: formData,
    }
  );
  if (response.ok) {
    const decklist = await response.json();
    dispatch(update(decklist));
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

const initialState = {};

export default function myDeckListReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD_MY_DECK_LISTS: {
      const normalDeckLists = {};
      action.list.forEach((list) => (normalDeckLists[list.id] = list));
      return { ...normalDeckLists };
    }
    case ADD_LIST:
      return { ...state, [action.decklist.id]: action.deck };
    case EDIT_LIST:
      newState = { ...state };
      newState[action.decklist.id] = action.decklist;
      return newState;
    default:
      return state;
  }
}
