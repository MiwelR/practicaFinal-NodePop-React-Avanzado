import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_DELETED_SUCCESS,
  UI_RESET_ERROR,
} from "./types";

export const defaultState = {
  auth: true,
  adverts: {
    loaded: false,
    data: [],
  },
  ui: {
    isLoading: false,
    error: null,
  },
};

export function auth(authState = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGOUT:
      return false;
    default:
      return authState;
  }
}

export function adverts(advertsState = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERTS_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };
    case ADVERT_CREATED_SUCCESS:
      return { ...advertsState, data: [...advertsState.data, action.payload] };
    case ADVERT_DELETED_SUCCESS:
      return { loaded: false, data: advertsState };
    default:
      return advertsState;
  }
}

export function advert(advertsState = defaultState.adverts, action) {
  switch (action.type) {
    case ADVERT_LOADED_SUCCESS:
      return { loaded: true, data: action.payload };
    default:
      return advertsState;
  }
}

export function ui(uiState = defaultState.ui, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { isLoading: true, error: null };
    case AUTH_LOGIN_SUCCESS:
    case ADVERTS_LOADED_SUCCESS:
      return { isLoading: false, error: null };
    case AUTH_LOGIN_FAILURE:
      return { isLoading: false, error: action.payload };
    case UI_RESET_ERROR:
      return { ...uiState, error: null };
    default:
      return uiState;
  }
}
