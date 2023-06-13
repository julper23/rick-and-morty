import { createStore } from 'redux';

const initialState = {
  pagina: 0,
};


const pagina = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PAGINA':
      return {
        ...state,
        pagina: action.payload,
      };
    default:
      return state;
  }
};

// Crea el almacén (store) de Redux
const store = createStore(pagina);

export default store;