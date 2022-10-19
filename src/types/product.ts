export interface ProductProps {
	id?: string;
	name: {
		english: string;
		spanish: string;
	};
	price: number;
	categories: string[];
}
