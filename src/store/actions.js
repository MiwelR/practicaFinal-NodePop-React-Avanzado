import { areAdvertsLoaded, getAdvert } from "./selectors";
import {
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  UI_RESET_ERROR,
} from "./types";

export function authLoginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
}

export function authLoginSuccess() {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
}

export function authLoginFailure(error) {
  return {
    type: AUTH_LOGIN_FAILURE,
    error: true,
    payload: error,
  };
}

export function authLogin(credentials) {
  // This function will be a redux action
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.service.login(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
}

export function authLoginSave(credentials) {
  // This function will be a redux action
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.service.loginSave(credentials);
      dispatch(authLoginSuccess());
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function authLogoutUser() {
  // This function will be a redux action
  return async function (dispatch, getState, { api, history }) {
    dispatch(authLoginRequest());
    try {
      await api.service.logout();
      dispatch(authLogout());
      const { from } = history.location.state || { from: { pathname: "/" } };
      history.replace(from);
    } catch (error) {
      console.log(error);
    }
  };
}

export function advertsLoaded(adverts) {
  return {
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts,
  };
}

export function loadAdverts() {
  return async function (dispatch, getState, { api }) {
    if (areAdvertsLoaded(getState())) {
      return;
    }
    // dispatch loadTweetsRequest
    try {
      const adverts = await api.service.getLatestAdverts();
      dispatch(advertsLoaded(adverts));
    } catch (error) {
      // dispatch loadTweetsFailure
    }
  };
}

export function advertLoaded(advert) {
  return {
    type: ADVERT_LOADED_SUCCESS,
    payload: advert,
  };
}

export function loadAdvert(advertId) {
  return async function (dispatch, getState, { api }) {
    // if (areAdvertsLoaded(getState())) {
    //   return;
    // }
    // dispatch loadTweetsRequest
    try {
      const advert = await api.service.getAdvert(advertId);
      dispatch(advertLoaded(advert));
    } catch (error) {
      // dispatch loadTweetsFailure
    }
  };
}

// export function loadAdvert(advertId) {
//   return async function (dispatch, getState, { api }) {
//     const advert = getAdvert(getState(), advertId);
//     if (advert) {
//       return;
//     }
//     // dispatch loadTweetRequest
//     try {
//       const advert = await api.service.getAdvert(advertId);
//       dispatch(advertLoaded(advert));
//     } catch (error) {
//       // dispatch(loadTweetFailure(error));
//       // if (error.status === 404) {
//       //   history.push('/404');
//       // }
//     }
//   };
// }

export function advertCreated(advert) {
  return {
    type: ADVERT_CREATED_SUCCESS,
    payload: advert,
  };
}

export function createAdvert(advert) {
  return async function (dispatch, getState, { api, history }) {
    // dispatch createTweetRequest
    try {
      const newAdvert = await api.service.createAdvert(advert);
      // this call is neede because the created tweet is incomplete (sparrest)
      const createdAdvert = await api.service.getAdvert(newAdvert.id);
      dispatch(advertCreated(createdAdvert));
      history.push(`/adverts/${createdAdvert.id}`);
    } catch (error) {
      // dispatch(createTweetFailure(error));
      // if (error.status === 401) {
      //   history.push('/login');
      // }
    }
  };
}

export function uiResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
