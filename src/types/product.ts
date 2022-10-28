export interface ProductProps {
	id?: string;
	name: {
		en: string;
		es: string;
	};
	price: number;
	category: string;
	order: number;
}
