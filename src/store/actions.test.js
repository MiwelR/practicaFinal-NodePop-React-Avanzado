import { authLoginRequest, authLogin } from "./actions";
import { AUTH_LOGIN_REQUEST } from "./types";

describe("authLoginRequest", () => {
  test("Devolviendo una acción con el tipo: AUTH_LOGIN_REQUEST", () => {
    const expectedResult = {
      type: AUTH_LOGIN_REQUEST,
    };
    const result = authLoginRequest();
    expect(result).toEqual(expectedResult);
  });
});

describe("authLogin", () => {
  const credentials = "credentials";
  const action = authLogin(credentials);
  describe("when login api resolves", () => {
    const api = { auth: { login: jest.fn().mockResolvedValue() } };
    const dispatch = jest.fn();
    const getState = () => {};
    const history = {
      location: {},
      replace: jest.fn(),
    };

    test("should dispatch an AUTH_LOGIN_REQUEST action", () => {
      action(dispatch, getState, { api, history });
      expect(dispatch).toHaveBeenCalledWith({ type: AUTH_LOGIN_REQUEST });
    });
  });
});
