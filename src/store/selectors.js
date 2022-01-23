export const getIsLogged = (state) => state.auth;

export const getAdverts = (state) => state.adverts.data;
// state.adverts.data.sort((t1, t2) => t2.updatedAt.localeCompare(t1.updatedAt));

export const areAdvertsLoaded = (state) => state.adverts.loaded;

export const getUi = (state) => state.ui;

export const getAdvert = (state, advertId) => state.advert.data;
// state.adverts.data.find((advert) => advert.id === Number(advertId));
