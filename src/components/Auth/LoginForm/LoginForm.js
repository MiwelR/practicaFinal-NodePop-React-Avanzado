import React, { useState } from "react";
import T from "prop-types";
import { connect } from "react-redux";
import { authLogin, authLoginSave, uiResetError } from "../../../store/actions";
import { getUi } from "../../../store/selectors";

// import { useHistory, useLocation, Redirect } from "react-router-dom";
import { Button, Icon, Form, Input, Checkbox } from "semantic-ui-react";
import { validateEmail } from "../../../utils/Validations";
// import { login, loginSave } from "../../../api/service";
// import { AuthContextConsumer } from "../../../routes/context";

import "./LoginForm.scss";

function LoginForm({ onLogin, onLoginSave, ...props }) {
  // const { setSelectedForm } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(defaultValueForm());
  const [rememberLogin, setRememberLogin] = useState(false);
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCheckbox = (ev, data) => {
    setRememberLogin(data.checked);
  };

  // function redirect() {
  //   const { from } = location.state || { from: { pathname: "/" } };
  //   console.log(from);
  //   return history.replace(from);
  // }

  const onSubmit = async (event) => {
    event.preventDefault();

    setFormError({});
    let errors = {};
    let formOk = {};

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }

    if (formData.password.length < 8) {
      errors.password = true;
      formOk = false;
    }
    setFormError(errors);

    if (formOk) {
      setIsLoading(true);

      try {
        if (rememberLogin) {
          // await loginSave(formData);
          await onLoginSave(formData).then(() => {
            console.log("remember login succeed");
          });
        } else {
          // await login(formData);
          await onLogin(formData).then(() => {
            console.log("login succeed");
          });
        }
        setIsLoading(false);
        // console.log(onLogin(formData));
        // onLogin.onLogin();
        // redirect();
      } catch (formError) {
        setFormError(formError);
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-form">
      <h1>Crea tus anuncios</h1>

      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Field>
          <Input
            type="text"
            name="email"
            placeholder="Correo electr??nico"
            icon="mail outline"
            error={formError.email}
          />
          {formError.email && (
            <span className="error-text">
              Por favor, introduce un correo electr??nico v??lido.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Contrase??a"
            error={formError.password}
            icon={
              showPassword ? (
                <Icon
                  name="eye slash outline"
                  link
                  onClick={handlerShowPassword}
                />
              ) : (
                <Icon name="eye" link onClick={handlerShowPassword} />
              )
            }
          />
          {formError.password && (
            <span className="error-text">
              Por favor, introduce una contrase??a correcta.
            </span>
          )}
        </Form.Field>
        <Form.Field>
          <Checkbox
            toggle
            name="remember"
            label="Recordar contrase??a"
            onChange={(ev, data) => onChangeCheckbox(ev, data)}
          />
        </Form.Field>
        <Button type="submit" loading={isLoading}>
          Iniciar Sesi??n
        </Button>
      </Form>

      {/* <div className="login-form__options">
        <p
          onClick={() => {
            setSelectedForm(null);
          }}
        >
          Volver
        </p>
        <p>
          ??No tienes cuenta?{" "}
          <span onClick={() => setSelectedForm("register")}>Reg??strate</span>
        </p>
      </div> */}
    </div>
  );
}

function defaultValueForm() {
  return {
    email: "",
    password: "",
  };
}

LoginForm.propTypes = {
  onLogin: T.func.isRequired,
};

// const ConnectedLoginPage = (props) => (
//   <AuthContextConsumer>
//     {(auth) => <LoginForm onLogin={auth.handleLogin} {...props} />}
//   </AuthContextConsumer>
// );

const mapStateToProps = (state) => {
  return getUi(state);
};

const mapDispatchToProps = {
  onLogin: authLogin,
  onLoginSave: authLoginSave,
  onResetError: uiResetError,
};

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default ConnectedLoginPage;
