import { useEffect, useReducer } from 'react';

import { CHANGE_LANG } from '../types';
import Reducer from './reducer';
import LanguageContext from './context';
import { Language } from '@/types/language';

const LanguageState = ({ children }: any) => {
	const [state, dispatch] = useReducer(Reducer, { lang: 'en' });

	useEffect(() => {
		const savedLang = localStorage.getItem('lang');
		if (['es', 'en'].includes(savedLang + '')) {
			return setLang(savedLang as Language);
		}

		const navLang = navigator.language.substr(0, 2);
		if (['es', 'en'].includes(navLang)) {
			return setLang(navLang as Language);
		}
	}, []);

	function setLang(lang: Language) {
		dispatch({
			type: CHANGE_LANG,
			payload: lang
		});

		localStorage.setItem('lang', lang)
	}

	return (
		<LanguageContext.Provider
			value={{
				lang: state.lang,
				setLang
			}}
		>
			{children}
		</LanguageContext.Provider>
	);
}

export default LanguageState;
