import { Switch, Route, Redirect } from "react-router-dom";
// import { useState } from "react";
// import { logout } from "./api/service";
// import { AuthContextProvider } from "./routes/context";
import PrivateRoute from "./routes/PrivateRoute";
import { connect } from "react-redux";
import { getIsLogged } from "./store/selectors";

// import Auth from "./pages/Auth";
import LoginForm from "./components/Auth/LoginForm";
import AdvertsPage from "./pages/AdvertsPage";
import AdvertDetailsPage from "./pages/AdvertDetailsPage";
import NewAdvertPage from "./pages/NewAdvertPage";

import "./App.scss";

function App({ isLogged }) {
  // const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  // const handleLogin = () => {
  //   setIsLogged(true);
  // };

  // const handleLogout = () => {
  //   logout().then(() => setIsLogged(false));
  // };

  // const authProps = { isLogged, handleLogin, handleLogout };

  return (
    // <Router>
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/adverts/new">
          <NewAdvertPage />
        </PrivateRoute>
        <PrivateRoute path="/adverts/:advertId">
          {(routeProps) => <AdvertDetailsPage {...routeProps} />}
        </PrivateRoute>
        <PrivateRoute exact path="/adverts">
          <AdvertsPage />
        </PrivateRoute>
        <Route exact path="/auth">
          {isLogged
            ? ({ location }) => (
                <Redirect
                  to={{ pathname: "/adverts", state: { from: location } }}
                />
              )
            : (routeProps) => <LoginForm {...routeProps} />}
        </Route>
        <Route exact path="/">
          <Redirect to="/adverts" />
        </Route>
        <Route exact path="/404">
          <div>404 | Not Found Page</div>
        </Route>
        <Route>
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
    // </Router>
  );
}

// export default App;

const mapStateToProps = (state, ownProps) => {
  return {
    isLogged: getIsLogged(state),
  };
};

const connectedToStore = connect(mapStateToProps);
export default connectedToStore(App);
