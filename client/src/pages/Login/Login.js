import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { authTypes } from "../../actions/types";
import { AppBar, Form, Head } from "../../components";
import { login, loadUser } from "../../actions/authActions";
import { useErrors } from "../../useHooks/useErrors";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const error = useErrors(authTypes.LOGIN_FAIL);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const onSubmit = e => {
    e.preventDefault();
    const user = { email, password };
    dispatch(login(user));
  };

  const formProps = {
    formGroups: [
      {
        labelText: "Email",
        inputType: "text",
        inputValue: email,
        setValue: setEmail,
        inputRef: emailRef,
      },
      {
        labelText: "Password",
        inputType: "password",
        inputValue: password,
        setValue: setPassword,
        inputRef: passwordRef,
      },
    ],
    onSubmit,
    submitText: "Login",
    title: "Login",
    linkPath: "/Register",
    linkText: "Don't have an account? Register here",
    errorText: error.msg,
  };

  return (
    <main>
      <Head title='Storytime | Login' />
      <section className='section'>
        <AppBar />
        <Form {...formProps} />
      </section>
    </main>
  );
};

export default Login;
