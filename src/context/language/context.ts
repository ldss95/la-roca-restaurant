import { createContext } from 'react';

import { Language } from '@/types/language';

interface LanguageContextProps {
	lang: Language;
	setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps>({} as LanguageContextProps);

export default LanguageContext;
