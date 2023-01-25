import { AUTH, LOGOUT } from "../constants/actionTypes";
import jwt_decode from "jwt-decode";
import { googleLogout } from "@react-oauth/google";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      let userData;
      if (action.data?.result) {
        userData = action.data.result;
        localStorage.setItem("profile", JSON.stringify({ ...userData }));
        console.log(userData);
      } else {
        userData = jwt_decode(action?.data?.credential);
        localStorage.setItem("profile", JSON.stringify({ ...userData }));
        console.log(userData);
      }
      return { ...state, authData: userData };

    case LOGOUT:
      localStorage.clear();
      googleLogout();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
