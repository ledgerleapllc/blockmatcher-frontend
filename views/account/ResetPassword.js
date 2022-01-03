import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormInputComponent } from "../../components";
import { hideCanvas, showAlert, showCanvas } from "../../redux/actions";
import Helper from "../../utils/Helper";
import { resetPassword } from "../../utils/Thunk";

const ResetPassword = () => {

  const dispatch = useDispatch();
  const [ password, setPassword ] = useState("");
  const [ password_confirmation, setPasswordConfirmation  ] = useState("");
  const [ history ] = useState("");

  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");

  let t = document.URL.split('/');
  const token = t[t.length - 1].split('?')[0];

  const submit = (e) => {
    e.preventDefault();
    if (!email) return;
    if (!password) return;
    if (!password_confirmation) return;

    if (!Helper.validateEmail(email)) {
      dispatch(showAlert("Input valid email address"));
      return;
    }

    dispatch(
      resetPassword(
        {
          email,
          password,
          password_confirmation,
          token: token,
        },
        () => {
          dispatch(showCanvas());
        },
        (res) => {
          dispatch(hideCanvas());
          if (res.success) {
            showAlert("Success", "success");
            setTimeout(function() {
              window.location.href = '/';
            }, 1700)
          }
        }
      )
    );
  };


  return (
    <div className="auth-page">
      <div className="white-box">
        <form action="" method="POST" onSubmit={submit}>
          <h2>Reset Password</h2>
          <div className="c-form-row">
            <label>Email</label>
            <FormInputComponent
              type="email"
              value={email}
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
          <div className="c-form-row">
            <label>Confirm Password</label>
            <FormInputComponent
              type="password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required={true}
              height="3rem"
            />
          </div>
          <div id="reset-password-page__button">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}











// const mapStateToProps = () => {
//   return {};
// };

// class ResetPassword extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       password_confirmation: "",
//     };

//     this.token = null;
//   }

//   componentDidMount() {
//     const {
//       match: { params },
//     } = this.props;
//     const urlParams = new URLSearchParams(window.location.search);

//     this.token = params.token || null;
//     const email = urlParams.get("email");

//     if (email) {
//       this.setState({
//         email,
//       });
//     }
//   }

//   submit = (e) => {
//     e.preventDefault();

//     const { email, password, password_confirmation } = this.state;

//     if (!email || !Helper.validateEmail(email)) {
//       this.props.dispatch(showAlert("Input valid email address"));
//       return;
//     }

//     if (!password || !password_confirmation) {
//       this.props.dispatch(showAlert("Input password"));
//       return;
//     }

//     if (password != password_confirmation) {
//       this.props.dispatch(showAlert("Password doesn't match"));
//       return;
//     }

//     if (!Helper.checkPassword(password)) {
//       this.props.dispatch(showAlert("Input valid password"));
//       return;
//     }

//     this.props.dispatch(
//       resetPassword(
//         {
//           email,
//           password,
//           password_confirmation,
//           token: this.token,
//         },
//         () => {
//           this.props.dispatch(showCanvas());
//         },
//         (res) => {
//           this.props.dispatch(hideCanvas());
//           if (res.success) {
//             const { history } = this.props;
//             history.push("/login");
//           }
//         }
//       )
//     );
//   };

//   inputField = (e, key) => {
//     this.setState({ [key]: e.target.value });
//   };

//   render() {
//     const { email, password, password_confirmation } = this.state;
//     return (
//       <div id="reset-password-page">
//         <div className="white-box">
//           <form action="" method="POST" onSubmit={this.submit}>
//             <h2>Reset Password</h2>
//             <div className="c-form-row">
//               <label>Email</label>
//               <FormInputComponent
//                 type="email"
//                 value={email}
//                 onChange={(e) => this.inputField(e, "email")}
//                 required={true}
//                 height="3rem"
//               />
//             </div>
//             <div className="c-form-row">
//               <label>Password</label>
//               <FormInputComponent
//                 type="password"
//                 value={password}
//                 onChange={(e) => this.inputField(e, "password")}
//                 required={true}
//                 height="3rem"
//               />
//             </div>
//             <div className="c-form-row">
//               <label>Confirm Password</label>
//               <FormInputComponent
//                 type="password"
//                 value={password_confirmation}
//                 onChange={(e) => this.inputField(e, "password_confirmation")}
//                 required={true}
//                 height="3rem"
//               />
//             </div>
//             <div id="reset-password-page__button">
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

export default ResetPassword;
