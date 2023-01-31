export interface ProductProps {
	id?: string;
	name: {
		en: string;
		es: string;
	};
	price?: number;
	prices?: number[];
	category: string;
	order: number;
}
