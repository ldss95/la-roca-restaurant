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
	contact_us: {
		title: string[];
	},
	menu: {
		title: string[];
	};
	fdaWarning: string;
}
