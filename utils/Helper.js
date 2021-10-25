/* eslint-disable no-useless-escape */
const USER_KEY = "@main_user";

class Helper {
  // Get File Extension
  static getFileEXT(string) {
    const temp = string.split(".");
    const ext = temp[temp.length - 1].toLowerCase();
    return ext;
  }

  static validateName(value) {
    const re = /^"[a-zA-Z0-9 \+._-]+"$/;
    return re.test(value);
  }

  // Validate Email
  static validateEmail(value) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value.toLowerCase());
  }

  // Please use a password with at least 8 characters including at least one number, one letter and one symbol
  static checkPassword(password) {
    if (password.length < 8) return false;

    let re = /[0-9]/;
    if (!re.test(password)) return false;

    re = /[a-zA-Z]/;
    if (!re.test(password)) return false;

    re = /(?=.*[.,=+;:\_\-?()\[\]<>{}!@#$%^&*])^[^'"]*$/;

    if (!re.test(password)) return false;

    return true;
  }

  // Capitalize First
  static capitalizeFirst(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // Store User
  static storeUser(userData) {
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  }

  // Remove User
  static removeUser() {
    localStorage.removeItem(USER_KEY);
  }

  // Fetch User
  static fetchUser() {
    const jsonData = localStorage.getItem(USER_KEY);
    if (jsonData) return JSON.parse(jsonData);
    return {};
  }

  // Adjust Numeric String
  static adjustNumericString(string, digit = 0) {
    if (isNaN(string) || string.trim() == "") return "";
    const temp = string.split(".");
    if (temp.length > 1) {
      const suffix = temp[1].substr(0, digit);
      return `${temp[0]}.${suffix}`;
    } else return string;
  }

  static isEmpty(obj) {
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }

  static subString(value, length) {
    if (!length)
      length = 18;
    if (!value)
      return '';
    if (value.length <= length) {
      return value;
    }

    return `${value.substr(0, length - 1)}...`;
  }

}

export default Helper;
