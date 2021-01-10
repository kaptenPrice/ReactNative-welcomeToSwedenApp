const initialState = {
  name: null,
  email: null,
  phone: null,
  city: null,
  education: null,
  isAdmin: false,
  reduxProfileAvatar: null,
};
const addPersonalInfo = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PHONE":
      return {
        ...state,
        phone: action.payload,
      };
    case "ADD_CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "ADD_EDUCATION":
      return {
        ...state,
        education: action.payload,
      };
    case "ADD_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ADD_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "IS_ADMIN":
      return {
        ...state,
        isAdmin: action.payload,
      };
    case "ADD_AVATAR":
      return {
        ...state,
        
        reduxProfileAvatar: action.payload,
      };

    default:
      return state;
  }
};
export default addPersonalInfo;
