import { Language } from '@/types/language';
import { CHANGE_LANG } from '../types';

interface StateProps {
	lang: Language;
}

interface ActionProps {
	type: typeof CHANGE_LANG;
	payload: Language;
}

function reducer(state: StateProps, action: ActionProps){
	switch(action.type){
		case CHANGE_LANG:
			return {
				lang: action.payload
			}
		default:
			return state;
	}
}

export default reducer;
