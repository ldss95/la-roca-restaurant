import { memo } from 'react'

import { sizeCalc } from '@/utils/helpers';

interface ImageCardProps {
	url: string;
	minHeight: number;
	maxHeight: number;
	backgroundPosition?: any;
	borderRadius?: {
		topRight?: number;
		topLeft?: number;
		bottomLeft?: number;
		bottomRight?: number;
	};
	animationType?: 'onShow' | 'onLoad'
}

const ImageCard = ({ url, minHeight, maxHeight, backgroundPosition = 'center', borderRadius, animationType = 'onLoad' }: ImageCardProps) => {
	return (
		<div
			style={{
				backgroundColor: '#cdcdcd',
				backgroundImage: `url(${url})`,
				width: '100%',
				height: sizeCalc(minHeight, maxHeight),
				backgroundSize: 'cover',
				backgroundPosition,
				zIndex: 20,
				borderTopRightRadius: borderRadius?.topRight ?? 10,
				borderTopLeftRadius: borderRadius?.topLeft ?? 10,
				borderBottomRightRadius: borderRadius?.bottomRight ?? 10,
				borderBottomLeftRadius: borderRadius?.bottomLeft ?? 10,
				overflow: 'hidden'
			}}
		/>
	)
}

export default memo(ImageCard);
