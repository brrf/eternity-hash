export default function collection(state = {}, action) {
  switch (action.type) {
    case "RECEIVE_COLLECTION":
      return {
        ...state,
        collection: action.collection
      };
    default:
      return state;
  }
}
