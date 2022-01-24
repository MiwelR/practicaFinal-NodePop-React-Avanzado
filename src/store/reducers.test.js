import { adverts, defaultState } from "./reducers";
import { ADVERTS_LOADED_SUCCESS } from "./types";

describe("ADVERTS", () => {
  test("should manage ADVERTS_LOADED_SUCCESS action", () => {
    const payload = ["advert_demo"];
    const action = {
      type: ADVERTS_LOADED_SUCCESS,
      payload,
    };
    const expectedState = {
      loaded: true,
      data: payload,
    };
    expect(adverts(defaultState.adverts, action)).toEqual(expectedState);
  });
});
