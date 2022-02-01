const LOAD = 'collections/LOAD';
const ADD = 'collections/ADD_LIST';
const EDIT_LIST = 'decklists/EDIT_LIST';
const REMOVE_LIST = 'decklist/REMOVE_LIST';

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (collection) => ({
  type: ADD,
  collection,
});

const update = (decklist) => ({
  type: EDIT_LIST,
  decklist,
});

const remove = (id) => ({
  type: REMOVE_LIST,
  id,
});

export const getMyCollections = (user_id) => async (dispatch) => {
  const response = await fetch(`/api/users/${user_id}/collections/`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const myCollections = await response.json();
    dispatch(load(myCollections['collections']));
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

export const addNewCollection = (formData) => async (dispatch) => {
  const response = await fetch('/api/collections/', {
    method: 'POST',
    body: formData,
  });
  if (response.ok) {
    const collection = await response.json();
    dispatch(add(collection));
    return +collection.id;
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

export const deleteDecklist = (id) => async (dispatch) => {
  const response = await fetch(`/api/decklists/${id}/`, {
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

export default function collectionReducer (state = initialState, action) {
  let newState;
  switch (action.type) {
    case LOAD: {
      const normalCollections = {};
      action.list.forEach((list) => (normalCollections[list.id] = list));
      return { ...normalCollections };
    }
    case ADD:
      return { ...state, [action.collection.id]: action.collection };
    case EDIT_LIST:
      newState = { ...state };
      newState[action.decklist.id] = action.decklist;
      return newState;
    case REMOVE_LIST:
      newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}
