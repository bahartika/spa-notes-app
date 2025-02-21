import React, { useContext } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import LocaleContext from "../Context/LocaleContext";

function RegisterInput({ register }) {
  const { locale } = useContext(LocaleContext);
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPsswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(locale === "id" ? "Kata sandi dan konfirmasi kata sandi tidak sesuai" : "Password and Confirm Password do not match!");
      return;
    }

    register({
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    });
  };

  return (
    <form onSubmit={onSubmitHandler} className="input-register">
      <label htmlFor="name">{locale === "id" ? "Nama" : "Name"}</label>
      <input id="name" name="name" type="text" value={name} onChange={onNameChange} required />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" value={email} onChange={onEmailChange} required />
      <label htmlFor="password">{locale === "id" ? "Kata sandi" : "Password"}</label>
      <input id="password" name="password" type="password" value={password} onChange={onPsswordChange} required />
      <label htmlFor="confirm-password">{locale === "id" ? "Konfirmasi kata sandi" : "Confirm Password"}</label>
      <input id="confirm-password" name="confirmPassword" type="password" value={confirmPassword} onChange={onConfirmPasswordChange} required />
      <button>{locale === "id" ? "Registrasi" : "Register"}</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
