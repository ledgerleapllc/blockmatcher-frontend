import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FormInputComponent } from "../../components";
import { showAlert, showCanvas, hideCanvas } from "../../redux/actions";
import Helper from "../../utils/Helper";
import { register } from "../../utils/Thunk";

// import "./register.scss";

const Register = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [userType, setUserType] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirm_email, setConfirmEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      dispatch(showAlert("Please input company name"));
      return;
    }

    if (!password || !confirm_password) {
      dispatch(showAlert("Please input password"));
      return;
    }

    if (!email.trim() || !confirm_email.trim()) {
      dispatch(showAlert("Please input email"));
      return;
    }

    if (email.trim() != confirm_email.trim()) {
      dispatch(showAlert("Please confirm email"));
      return;
    }

    if (password != confirm_password) {
      dispatch(showAlert("Please confirm password"));
      return;
    }

    if (!Helper.validateEmail(email.trim())) {
      dispatch(showAlert("Please input valid email address"));
      return;
    }

    const params = {
      name: name.trim(),
      email: email.trim(),
      password: password,
      telegram: telegram.trim(),
      type: userType
    };

    dispatch(
      register(
        params,
        () => {
          dispatch(showCanvas());
        },
        (res) => {
          dispatch(hideCanvas());
          if (res.success) {
            history.push("/");
          }
        }
      )
    );
  };

  const registerStep = <div className="auth-page">
    <div className="white-box">
      <form method="post" action="" onSubmit={submit}>
        <input type="hidden" value="something" />
        <h2>
          {
            userType === 'buyer' ? 'Buyer Registration' : 'Seller Registration'
          }
        </h2>
        <div className="mt-2 mb-2 text-center">
          I already have an account.
          <Link
            className="ml-2"
            to="/login">
            Sign in
          </Link>
        </div>
        <div className="c-form-row">
          <label>Name / Company Name</label>
          <FormInputComponent
            type="text"
            required={true}
            value={name}
            onChange={(e) => setName(e.target.value)}
            height="2.5rem"
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="c-form-row">
              <label>Email</label>
              <FormInputComponent
                type="text"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                height="2.5rem"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="c-form-row">
              <label>Confirm Email</label>
              <FormInputComponent
                type="text"
                value={confirm_email}
                onChange={(e) => setConfirmEmail(e.target.value)}
                height="2.5rem"
              />
            </div>
          </div>
        </div>
        <div className="c-form-row">
          <label>Telegram(optional)</label>
          <FormInputComponent
            type="text"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            height="2.5rem"
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="c-form-row">
              <label>Create Password</label>
              <FormInputComponent
                type="password"
                required={true}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                height="2.5rem"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="c-form-row">
              <label>Verify Password</label>
              <FormInputComponent
                type="password"
                autoComplete="new-password"
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                height="2.5rem"
              />
            </div>
          </div>
        </div>
        <div className="modal_button">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </div>
  </div>

  const typeSelectStep = <div className="auth-page">
    <div className="white-box">
      <h2 className="text-center">
        Are you here to buy or sell token?
      </h2>
      <div className="modal_button">
        <div className="mt-4">
          <button className="btn btn-primary" onClick={() => setUserType('buyer')}>
            Register as Buyer
          </button>
        </div>
        <div className="mt-4">
          <button className="btn btn-primary" onClick={() => setUserType('seller')}>
            Register as Seller
          </button>
        </div>
      </div>

    </div>
  </div>;

  return userType != null ? registerStep : typeSelectStep;

}

export default Register;
