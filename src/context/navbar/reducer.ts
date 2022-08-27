import { TOGGLE_NAV } from '../types';

interface StateProps {
	isOpen: boolean;
}

interface ActionProps {
	type: typeof TOGGLE_NAV;
}

function reducer(state: StateProps, action: ActionProps){
	switch(action.type){
		case TOGGLE_NAV:
			return {
				isOpen: !state.isOpen
			}
		default:
			return state;
	}
}

export default reducer;
