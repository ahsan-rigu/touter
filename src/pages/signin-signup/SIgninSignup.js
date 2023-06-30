import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import "./SigninSignup.css";

const SIgninSignup = () => {
  const { signup, signin, loggedIn } = useContext(AuthContext);
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();

  const signupHandler = (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const username = event.target[1].value;
    const password = event.target[2].value;
    signup({ name, username, password });
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  const signinHandler = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    signin(username, password);
  };

  return (
    !loggedIn && (
      <section className="flex-signin">
        <div className={signUp ? "image-curtain-right" : "image-curtain-left"}>
          <h1>TOUTER</h1>
        </div>
        <form onSubmit={signinHandler} className="form-signin">
          <h2>Sign In</h2>
          <p>Kindly enter your username and password</p>
          <label>
            username
            <input type="text" required placeholder="username" />
          </label>
          <label>
            password
            <input type="password" required placeholder="password" />
          </label>
          <button className="primary">LOGIN</button>
          <button
            type="button"
            onClick={() => setSignUp(true)}
            className="btn-secondary"
          >
            CREATE AND ACCOUNT
          </button>
        </form>
        <form onSubmit={signupHandler} className="form-signup">
          <h2>Sign Up</h2>
          <p>Kindly enter your details</p>
          <label>
            name
            <input type="text" required placeholder="name" />
          </label>
          <label>
            username
            <input type="text" required placeholder="username" />
          </label>
          <label>
            password
            <input type="password" required placeholder="password" />
          </label>
          <button className="primary">SIGNUP</button>
          <button
            type="button"
            onClick={() => setSignUp(false)}
            className="btn-secondary"
          >
            ALREADY A USER? SIGN IN INSTEAD
          </button>
        </form>
      </section>
    )
  );
};

export default SIgninSignup;
