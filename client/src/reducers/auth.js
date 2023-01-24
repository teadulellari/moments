import { AUTH, LOGOUT } from "../constants/actionTypes";
import jwt_decode from "jwt-decode";
import { googleLogout } from "@react-oauth/google";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action?.data);
      const userData = jwt_decode(action?.data?.credential);
      console.log(userData);
      localStorage.setItem("profile", JSON.stringify({ ...userData }));
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
