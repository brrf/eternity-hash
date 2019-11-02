export default function hash (state = {}, action) {
	switch (action.type) {
		case 'SET_HASH':
			return {
				hashObject: action.hash
			}
		default: return state
	}
}