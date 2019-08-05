export default function collection (state = {}, action) {
	switch (action.type) {
		case 'RECEIVE_COLLECTION':
		// console.log(Array.isArray(action.collection))
			return {
				...state,
				collection: action.collection
			}
		default: return state
	}
}