import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormInputComponent } from "../../components";
import { login } from "../../utils/Thunk";


const Login = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(
      login(
        email,
        password,
        () => {
          // this.props.dispatch(showCanvas());
        },
        () => {
          // this.props.dispatch(hideCanvas());
        }
      )
    );
  };


  return (
    <div className="auth-page">
      <div className="white-box">
        <form action="" method="POST" onSubmit={submit}>
          <h2>Sign In</h2>
          <div className="mt-2 text-center">
            I don’t have an account.
            <Link
              className="ml-2"
              to="/register">
              Register
            </Link>
          </div>
          <div className="c-form-row">
            <label>Email</label>
            <FormInputComponent
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              height="3rem"
            />
          </div>
          <div className="c-form-row">
            <label>Password</label>
            <FormInputComponent
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              height="3rem"
            />
          </div>
          <div className="modal_button">
            <div>
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
            <div className="mt-2">
              <Link
                to="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

}

export default Login;
