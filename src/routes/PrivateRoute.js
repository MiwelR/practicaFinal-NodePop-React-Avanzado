import { connect } from "react-redux";
import { Redirect, Route } from "react-router";
import { getIsLogged } from "../store/selectors";
// import { useAuth } from "./context";

const PrivateRoute = ({ isLogged, ...props }) => {
  // const { isLogged } = useAuth();

  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: "/auth", state: { from: location } }} />
      )}
    </Route>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    isLogged: getIsLogged(state),
  };
};

const connectedToStore = connect(mapStateToProps);
export default connectedToStore(PrivateRoute);
