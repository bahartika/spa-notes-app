import React, { useContext } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../Context/LocaleContext";

function LoginInput({ login }) {
  const { locale } = useContext(LocaleContext);
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-login">
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" value={email} onChange={onEmailChange} />
      <label htmlFor="password">{locale === "id" ? "Kata sandi" : "Password"}</label>
      <input id="password" name="password" type="password" value={password} onChange={onPasswordChange} />
      <button>{locale === "id" ? "Masuk" : "Log in"}</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
