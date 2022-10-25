import { memo } from 'react';

interface ImageCardProps {
	url: string;
	width: string;
	marginRight?: number
}

const ImageCard = ({ url, width, marginRight }: ImageCardProps) => (
	<div
		style={{
			zIndex: 20,
			height: 760,
			borderRadius: 10,
			width,
			backgroundImage: `url(${url})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			marginRight
		}}
	/>
)
export default memo(ImageCard);
