const initialState = {
  user: [],
};

export const userReducer = (state = initialState, action) => {
  console.log("action: ", action);
  switch (action.type) {
    case "LOGGED_IN_USER":
      // return action.payload;
      console.log("payload: ", action.payload);
      return {
        user: action.payload,
      };
    case "LOGOUT":
      // return action.payload;
      return {
        user: action.payload,
      };
    default:
      console.log("hii");
      return state;
  }
};
