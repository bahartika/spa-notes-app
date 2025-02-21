import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";
import LocaleContext from "../Context/LocaleContext";

function RegisterPage() {
  const { locale } = React.useContext(LocaleContext);
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <section className="register-page">
      <h1>{locale === "id" ? "Isi form untuk membuat akun" : "Fill the form to create account"}</h1>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === "id" ? (
          <>
            Sudah punya akun? <Link to="/">Log in di sini</Link>
          </>
        ) : (
          <>
            Already have an account? <Link to="/">Log in here</Link>
          </>
        )}
      </p>
    </section>
  );
}

export default RegisterPage;
