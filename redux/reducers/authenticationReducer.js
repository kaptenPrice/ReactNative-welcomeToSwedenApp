const initialState = {
  isLoading: true,
  isSignedIn: false,
  currentUser: null,
  isAdmin: false,
};
const authentication = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        isLoading: false,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        isLoading: false,
      };
      // case: "CHECK_ADMIN":
      // if (currentUser.uid===action.payload.uid) {
      //   return{    
      //           isAdmin:true,
      //   }
        
        
      // }

    default:
      return state;
  }
};
export default authentication;
