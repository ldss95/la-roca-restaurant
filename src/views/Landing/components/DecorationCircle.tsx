import { redColor40 } from '@/contants/colors';
import { memo } from 'react';

interface PositionProps {
	left?: number;
	right?: number;
	top?: number;
	bottom?: number;
}

const DecorationCircle = (position: PositionProps) => (
	<div
		style={{
			borderRadius: 500,
			background: `radial-gradient(circle, ${redColor40} 0%, transparent 50%)`,
			position: 'absolute',
			...position,
			zIndex: 10,
			width: 1000,
			height: 1000
		}}
	/>
);

export default memo(DecorationCircle);
