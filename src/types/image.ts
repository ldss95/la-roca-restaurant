export interface DBImageProps {
	id: string;
	url: string;
	section: 'about_us' | 'main' | 'contact';
	order?: number;
}
