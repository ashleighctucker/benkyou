// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const ADD_COMPLETE_DECK = 'user/ADD_COMPLETE_DECK';
const REMOVE_COMPLETE_DECK = 'user/REMOVE_COMPLETE_DECK';

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const addDeck = (deck) => ({
  type: ADD_COMPLETE_DECK,
  deck,
});

const removeDeck = (id) => ({
  type: REMOVE_COMPLETE_DECK,
  id,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
    return data.id;
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return data.id;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp =
  (user_name, first_name, email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name,
        email,
        password,
        first_name,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
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

export const addCompleteDeck = (user_id, deck_id) => async (dispatch) => {
  const response = await fetch(`/api/users/${user_id}/decks/${deck_id}/add/`, {
    method: 'PUT',
  });
  if (response.ok) {
    const deck = await response.json();
    dispatch(addDeck(deck));
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

export const removeCompleteDeck = (user_id, deck_id) => async (dispatch) => {
  const response = await fetch(
    `/api/users/${user_id}/decks/${deck_id}/remove/`,
    {
      method: 'PUT',
    }
  );
  if (response.ok) {
    const deck = await response.json();
    dispatch(removeDeck(deck['deck_id']));
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

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case ADD_COMPLETE_DECK:
      newState = { ...state };
      newState.user.completed_decks[action.deck.id] = action.deck;
      return newState;
    case REMOVE_COMPLETE_DECK:
      newState = { ...state };
      delete newState.user.completed_decks[action.id];
      return newState;
    default:
      return state;
  }
}
