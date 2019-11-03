export default function authedUser(state = {}, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        authedUser: action.user
      };
    case "LOGOUT_USER":
      return {};
    default:
      return state;
  }
}
