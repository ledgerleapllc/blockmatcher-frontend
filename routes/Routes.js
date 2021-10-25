import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { showCanvas, hideCanvas, saveUser } from "../redux/actions";
import Helper from "../utils/Helper";
import { getMe } from "../utils/Thunk";
import PrivateRoute from "./PrivateRoute";

const AppLayout = lazy(() => import("../layouts/app/App"));
const LandingLayout = lazy(() => import("../layouts/landing/Landing"));

const mapStateToProps = (state) => {
  return {
    authUser: state.global.authUser,
  };
};

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      auth: {},
    };
  }

  componentDidMount() {
    const userData = Helper.fetchUser();
    if (userData.id) {
      this.props.dispatch(
        getMe(
          () => {
            this.props.dispatch(showCanvas());
            this.setState({ loaded: false });
          },
          (res) => {
            this.props.dispatch(hideCanvas());

            if (res.me && res.me.id) {
              const auth = {
                ...res.me,
                accessTokenAPI: userData.accessTokenAPI,
              };

              Helper.storeUser(auth);
              this.setState({ auth, loaded: true });
              this.props.dispatch(saveUser(auth));
            } else {
              Helper.removeUser();
              this.setState({ auth: {}, loaded: true });
              this.props.dispatch(saveUser({}));
            }
          },
          true
        )
      );
    } else {
      Helper.removeUser();
      this.setState({ auth: {}, loaded: true });
      this.props.dispatch(saveUser({}));
    }
  }

  componentDidUpdate(prevProps) {
    const { loaded } = this.state;
    const { authUser } = this.props;

    if (
      loaded &&
      JSON.stringify(prevProps.authUser) !== JSON.stringify(authUser)
    ) {
      this.setState({ auth: authUser });
    }
  }

  render() {
    const { loaded, auth } = this.state;
    if (!loaded) return null;

    return (
      <Suspense fallback={null}>
        <Switch>
          <PrivateRoute auth={auth} path="/app">
            <AppLayout auth={auth} />
          </PrivateRoute>
          <Route>
            <LandingLayout auth={auth} />
          </Route>
        </Switch>
      </Suspense>
    );
  }
}

export default connect(mapStateToProps)(Routes);
