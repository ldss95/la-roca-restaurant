export interface CopyProps {
	es: LangProps;
	en: LangProps;
};

export interface LangProps {
	title: string[];
	about_us: {
		title: string[];
		subtitle: string;
	};
	menu: {
		title: string[];
	};
	fdaWarning: string;
}
