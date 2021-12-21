const LOAD_CATEGORIES = 'categories/LOAD_CATEGORIES';

const load = (list) => ({
  type: LOAD_CATEGORIES,
  list,
});

export const getCategories = () => async (dispatch) => {
  const response = await fetch('/api/categories/', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    const categories = await response.json();
    dispatch(load(categories['categories']));
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

const initialState = [];

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CATEGORIES: {
      return [...action.list];
    }
    default:
      return state;
  }
}
