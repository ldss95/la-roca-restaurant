import { CategoryProps } from '@/types/category';
import { ProductProps } from '@/types/product';
import { Subject } from 'rxjs';

/**
 * Evita que un input pueda recibir caracteres no numericos
 * Esta funcion puede ser insertada en un Event Listener de tipo keydown
 */
export function avoidNotNumerics(event: any) {
	if(['Backspace', 'Delete', 'Tab'].includes(event.key)) {
		return;
	}

	const isNumber = !isNaN(Number(event.key));
	const hasPoint = event.target.value.includes('.');
	const isFirstPoint = (event.key === '.' && !event.target.value.includes('.'));
	const have2Decimals = hasPoint && event.target.value.split('.').pop().length === 2;

	if((!isNumber && !isFirstPoint) || have2Decimals)
		event.preventDefault();
}

interface ModalOpener$Props {
	name: 'CATEGORY' | 'PRODUCT' | 'PRODUCT_OPTIONS';
	product?: ProductProps;
	category?: CategoryProps;
	enableOrderChange?: boolean;
}
export const ModalOpener$ = new Subject<ModalOpener$Props>();

export function sizeCalc(min: number, max: number) {
	const MIN_SCREEN_WIDTH = 320;
	const MAX_SCREEN_WIDTH = 1600;
	const width = window.innerWidth;

	if (width <= MIN_SCREEN_WIDTH) {
		return min;
	}

	if (width >= MAX_SCREEN_WIDTH) {
		return max;
	}

	const screenPercent = (MAX_SCREEN_WIDTH - MIN_SCREEN_WIDTH) / (max - min);
	const pixels = (width - MIN_SCREEN_WIDTH) / screenPercent;
	return Math.round(min + pixels);
}
