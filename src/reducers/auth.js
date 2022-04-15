import { AUTH, LOG_OUT } from "../constant/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOG_OUT:
      localStorage.removeItem("profile");
      return { authData: null };
    default:
      return state;
  }
};

export default authReducer;
