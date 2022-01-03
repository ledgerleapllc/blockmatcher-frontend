import API from "./API";
import { saveUser, showAlert, saveTempUserId, setActiveModal } from "../redux/actions";
import Helper from "./Helper";

// Login
export function login(email, password, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.login(email, password).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
      if (res.success && res.user) {
        const userData = res.user;
        Helper.storeUser(userData);
        dispatch(saveUser(userData));
      }
    });
  };
}
// Register
export function register(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.register(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
      if (res.success && res.user) {
        const userData = res.user;
        Helper.storeUser(userData);
        dispatch(saveUser(userData));
      }
    });
  };
}

// Send Reset Email - Common
export function sendResetEmail(email, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.sendResetEmail(email).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

// Reset Password - Common
export function resetPassword(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.resetPassword(params).then((res) => {
      if (res.success)
        dispatch(
          showAlert("You've successfully reset your password.", "success")
        );
      else dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

// Get Me
export function getMe(start, completion, returnOnly = false) {
  return function (dispatch) {
    if (start) start();
    API.getMe().then((res) => {
      if (!returnOnly && res.me) {
        let userData = Helper.fetchUser();
        if (userData && userData.id) {
          userData = {
            ...res.me,
            accessTokenAPI: userData.accessTokenAPI,
          };

          Helper.storeUser(userData);
          dispatch(saveUser(userData));
        }
      }
      if (completion) completion(res);
    });
  };
}

// Change Password - Common
export function changePassword(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.changePassword(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function exportCSV(start, completion) {
  return function (dispatch) {
    if (start) start();
    API.exportCSV().then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function detailExportCSV(id, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.detailExportCSV(id).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function createOffer(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.createOffer(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function createBuyOffer(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.createBuyOffer(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function updateBuyOffer(id, params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.updateBuyOffer(id, params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function removeOffer(id, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.removeOffer(id).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function removeBuyOffer(id, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.removeBuyOffer(id).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function getOffersList(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.getOffersList(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function getBuyOffersList(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.getBuyOffersList(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function getSellOffersList(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.getSellOffersList(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function getAdminBuyOffersList(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.getAdminBuyOffersList(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function getBatchesList(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.getBatchesList(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function getBatchDetail(id, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.getBatchDetail(id).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function getBatchSellOffersList(id, params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.getBatchSellOffersList(id, params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function getBatchBuyOffersList(id, params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.getBatchBuyOffersList(id, params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function createBatch(params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.createBatch(params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function saveNotes(id, params, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.saveNotes(id, params).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

export function removeBatch(id, start, completion) {
  return function (dispatch) {
    if (start) start();
    API.removeBatch(id).then((res) => {
      if (!res.success) dispatch(showAlert(res.message));
      if (completion) completion(res);
    });
  };
}

