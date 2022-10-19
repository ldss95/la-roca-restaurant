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

export const ModalOpener$ = new Subject<'CATEGORY' | 'PRODUCT'>();
