// import { useContext, useState, useEffect } from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// import AuthContext from "../routes/context";
import Logo from "../assets/nodepop-logo.png";
import { Button, Confirm } from "semantic-ui-react";
import { getUser } from "../api/service";
import { connect } from "react-redux";
import { authLogoutUser, uiResetError } from "../store/actions";
import { getUi } from "../store/selectors";
import "./NavBar.scss";

function NavBar({ onLogout, ...props }) {
  // const { handleLogout } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [state, setState] = useState({ open: false });

  useEffect(() => {
    getUser().then((me) => setUser(me.name));
  }, []);

  const show = () => setState({ open: true });

  const handleConfirm = async () => {
    // handleLogout();
    await onLogout().then(() => {
      console.log("logout succeed");
    });
  };

  const handleCancel = () => setState({ open: false });

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={Logo} alt="NodePop" />
        </Link>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <NavLink
              to="/"
              activeClassName="current"
              activeStyle={{ color: "white" }}
            >
              <Button className="button is-link">Anuncios</Button>
            </NavLink>
            <NavLink
              to="/adverts/new"
              className="button is-link"
              activeClassName="current"
              // activeStyle={{ color: "white" }}
            >
              + Crear anuncio
            </NavLink>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <div className="dropdown" id="drop-user">
                <div className="dropdown-trigger">
                  <button
                    className="button is-primary"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <i className="fas fa-user-circle"></i>
                    <strong>{user}</strong>
                  </button>
                </div>
              </div>
              <Button className="button is-primary" onClick={show}>
                Cerrar sesión
              </Button>
              <Confirm
                open={state.open}
                header="Desconectar"
                content="¿Realmente quieres cerrar sesión?"
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                size="tiny"
                cancelButton="Cancelar"
                confirmButton="Cerrar Sesión"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// export default NavBar;

const mapStateToProps = (state) => {
  return getUi(state);
};

const mapDispatchToProps = {
  onLogout: authLogoutUser,
  onResetError: uiResetError,
};

const DisconnectedUser = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default DisconnectedUser;
