export function sizeCalc(min: number, max: number) {
	const MIN_SCREEN_WIDTH = 320;
	const MAX_SCREEN_WIDTH = 1024;
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
