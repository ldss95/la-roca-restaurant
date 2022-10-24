import { memo } from 'react';

const ImageCard = ({ url }: { url: string }) => (
	<div
		style={{
			zIndex: 20,
			height: 500,
			borderRadius: 10,
			width: '100%',
			backgroundImage: `url(${url})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		}}
	/>
)
export default memo(ImageCard);
