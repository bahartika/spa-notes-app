import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";
import LocaleContext from "../Context/LocaleContext";

function LoginPage({ loginSuccess }) {
  const { locale } = React.useContext(LocaleContext);

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <h1>{locale === "id" ? "Login untuk Masuk Aplikasi" : "Log in to use app, please"}</h1>
      <LoginInput login={onLogin} />
      <p>
        {locale === "id" ? (
          <>
            Belum punya akun? <Link to="/register">Daftar di sini.</Link>
          </>
        ) : (
          <>
            Don&apos;t have an account? <Link to="/register">Register here</Link>
          </>
        )}
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
