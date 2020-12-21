const initialState = {
  phone: null,
  city: null,
  education: null,
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

    default:
      return state;
  }
};
export default addPersonalInfo;
