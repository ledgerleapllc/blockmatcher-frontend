import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormInputComponent } from "../../components";
import { login } from "../../utils/Thunk";

const ForgotPassword = () => {

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

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
          <h2>Forgot Password?</h2>
          <div className="c-form-row mt-4">
            <label className="text-gray">
              What is the email associated with your account?
            </label>
            <FormInputComponent
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
              height="3rem"
            />
          </div>
          <div className="modal_button">
            <div>
              <button type="submit" className="btn btn-primary">
                Send Reset Link
              </button>
            </div>
            <Link
              className="mt-2"
              to="/login">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );

}

export default ForgotPassword;
