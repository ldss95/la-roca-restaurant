import { SectionType } from './section';

export interface DBImageProps {
	id: string;
	url: string;
	section: SectionType;
	order?: number;
}
