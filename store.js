import { createStore } from 'redux';

const initialState = {
  pagina: 0,
  busquedaCap:'',
  busquedaLoc:''
};


const state = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PAGINA':
      return {
        ...state,
        pagina: action.payload,
      };
    case 'UPDATE_BUSQUEDA_CAP':
    return {
      ...state,
      busquedaCap: action.payload,
    };
    default:
      return state;
  }
};

// Crea el almacén (store) de Redux
const store = createStore(state);

export default store;