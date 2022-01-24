import { getAdverts } from "./selectors";

describe("getAdverts", () => {
  test("should return a advert", () => {
    const data = [
      { id: 1, content: "demo1" },
      { id: 2, content: "demo2" },
    ];
    const state = {
      adverts: {
        data,
      },
    };
    expect(getAdverts(state)).toMatchObject(data);
  });
});
