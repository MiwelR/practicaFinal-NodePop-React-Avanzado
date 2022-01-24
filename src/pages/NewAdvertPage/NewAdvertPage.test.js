import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import NewAdvertPage from "./NewAdvertPage";

describe("NewAdvertPage", () => {
  test("snapshot test", () => {
    const store = {
      getState: () => ({ auth: true }),
      subscribe: () => {},
      dispatch: () => {},
    };
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <NewAdvertPage />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
