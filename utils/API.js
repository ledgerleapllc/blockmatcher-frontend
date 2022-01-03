/* global require */
import Helper from "./Helper";

const axios = require("axios");

const sendRequest = (
  url,
  params = {},
  method = "POST",
  requireAuth = false
) => {
  let headers = { "Content-Type": "application/json" };
  if (requireAuth) {
    const userData = Helper.fetchUser();
    const accessToken = userData.accessTokenAPI || "";

    headers = {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // eslint-disable-next-line no-undef
  let apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "api" + url;
  if (method == "GET") {
    const urlParams = [];
    for (let key in params) {
      if (key && params[key]) {
        urlParams.push(`${key}=${params[key]}`);
      }
    }
    if (urlParams.length) {
      apiUrl += `?${urlParams.join("&")}`;
    }
  }

  return new Promise((resolve) => {
    axios({
      method,
      headers,
      data: JSON.stringify(params),
      url: apiUrl,
    })
      .then((res) => {
        if (res.data) {
          let data = res.data;

          if (!data.success && !data.message) {
            data = {
              ...data,
              message: "Please try again later",
            };
          }

          resolve(data);
        } else {
          resolve({
            success: false,
            message: "Please try again later",
          });
        }
      })
      .catch(() => {
        // Needs to login again
        Helper.removeUser();

        resolve({
          success: false,
          message: "Please try again later",
        });
      });
  });
};

const downloadRequest = (
  url,
  params = {},
  requireAuth = false
) => {
  let headers = { "Content-Type": "application/json" };
  if (requireAuth) {
    const userData = Helper.fetchUser();
    const accessToken = userData.accessTokenAPI || "";

    headers = {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // eslint-disable-next-line no-undef
  let apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "api" + url;

  const urlParams = [];
  for (let key in params) {
    if (key && params[key]) {
      urlParams.push(`${key}=${params[key]}`);
    }
  }
  if (urlParams.length) {
    apiUrl += `?${urlParams.join("&")}`;
  }

  return new Promise((resolve) => {
    axios({
      method: "GET",
      headers,
      data: JSON.stringify(params),
      url: apiUrl,
      responseType: 'blob'
    })
      .then((res) => {
        if (res.data) {
          let data = res.data;
          if (!data.success && !data.message) {
            data = {
              ...data,
              message: "Please try again later",
            };
          }

          resolve(data);
        } else {
          resolve({
            success: false,
            message: "Please try again later",
          });
        }
      })
      .catch(() => {
        // Needs to login again
        Helper.removeUser();

        resolve({
          success: false,
          message: "Please try again later",
        });
      });
  });
};

const uploadFile = (
  url,
  formData = null,
  requireAuth = false
) => {
  let headers = { "Content-Type": "multipart/form-data" };
  if (requireAuth) {
    const userData = Helper.fetchUser();
    const accessToken = userData.accessTokenAPI || "";

    headers = {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  // eslint-disable-next-line no-undef
  let apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL + "api" + url;
  return new Promise((resolve) => {
    axios.post(
      apiUrl,
      formData,
      { headers }
    )
      .then((res) => {
        if (res.data) {
          let data = res.data;

          if (!data.success && !data.message) {
            data = {
              ...data,
              message: "Please try again later",
            };
          }

          resolve(data);
        } else {
          resolve({
            success: false,
            message: "Please try again later",
          });
        }
      })
      .catch(() => {
        // Needs to login again
        Helper.removeUser();

        resolve({
          success: false,
          message: "Please try again later",
        });
      });
  });
};

class API {
  // Login
  static login(email, password) {
    const params = {
      email,
      password,
    };
    return sendRequest("/login", params, "POST");
  }

  // Register
  static register(params) {
    return sendRequest("/register", params, "POST");
  }

  // Get Auth User
  static getMe() {
    return sendRequest("/me", {}, "GET", true);
  }

  // Send Reset Email - Common
  static sendResetEmail(email) {
    return sendRequest("/send-reset-email", { email }, "POST");
  }

  static resetPassword(params) {
    return sendRequest("/reset-password", params, "POST");
  }

  static exportCSV() {
    return sendRequest("/admin/export", {}, "GET", true);
  }

  static detailExportCSV(id) {
    return sendRequest(`/admin/batches/${id}/export`, {}, "GET", true);
  }

  static createOffer(params) {
    return sendRequest("/user/sell-offers", params, "POST", true);
  }

  static removeOffer(id) {
    return sendRequest(`/user/sell-offers/${id}`, {}, "DELETE", true);
  }

  static getOffersList(params) {
    return sendRequest("/user/sell-offers", params, "GET", true);
  }

  static createBuyOffer(params) {
    return sendRequest("/user/buy-offers", params, "POST", true);
  }

  static updateBuyOffer(id, params) {
    return sendRequest(`/user/buy-offers/${id}`, params, "PUT", true);
  }

  static removeBuyOffer(id) {
    return sendRequest(`/user/buy-offers/${id}`, {}, "DELETE", true);
  }

  static getBuyOffersList(params) {
    return sendRequest("/user/buy-offers", params, "GET", true);
  }

  static getSellOffersList(params) {
    return sendRequest("/admin/sell-offers", params, "GET", true);
  }

  static getAdminBuyOffersList(params) {
    return sendRequest("/admin/buy-offers", params, "GET", true);
  }

  static getBatchesList(params) {
    return sendRequest("/admin/batches", params, "GET", true);
  }

  static getBatchDetail(id) {
    return sendRequest(`/admin/batches/${id}`, {}, "GET", true);
  }

  static getBatchSellOffersList(id, params) {
    return sendRequest(`/admin/batches/${id}/sell-offers`, params, "GET", true);
  }

  static getBatchBuyOffersList(id, params) {
    return sendRequest(`/admin/batches/${id}/buy-offers`, params, "GET", true);
  }

  static createBatch(params) {
    return sendRequest("/admin/batches", params, "POST", true);
  }

  static saveNotes(id, params) {
    return sendRequest(`/admin/batches/${id}`, params, "PUT", true);
  }

  static removeBatch(id) {
    return sendRequest(`/admin/batches/${id}`, {}, "DELETE", true);
  }

  static downloadCSV() {
    return sendRequest(`/admin/download-csv`, {}, "GET", true);
  }
}

export default API;
