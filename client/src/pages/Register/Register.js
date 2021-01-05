import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loadUser, registerUser } from "../../actions/authActions";
import { AppBar, Form } from "../../components";
import { authTypes } from "../../actions/types";
import { useErrors } from "../../useHooks/useErrors";

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const error = useErrors(authTypes.REGISTER_FAIL);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const onSubmit = e => {
    e.preventDefault();
    const newUser = { name, email, password };
    dispatch(registerUser(newUser));
  };

  const formProps = {
    formGroups: [
      {
        labelText: "Name",
        inputType: "text",
        inputValue: name,
        setValue: setName,
        inputRef: nameRef,
      },
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
    title: "Register",
    submitText: "Register",
    linkPath: "/login",
    linkText: "Have an account? Login here",
    errorText: error.msg,
  };

  return (
    <main>
      <section className='section'>
        <AppBar />
        <Form {...formProps} />
      </section>
    </main>
  );
};

export default Register;
