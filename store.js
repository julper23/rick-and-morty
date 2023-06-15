import { createStore } from 'redux';

//Store que almacena en que pagina nos encotramos de las principales y los valores de busqueda de las mismas

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
    case 'UPDATE_BUSQUEDA_LOC':
      return {
        ...state,
        busquedaLoc: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(state);

export default store;