import { memo } from 'react'

import Decoration from '@/assets/decoration.svg';
import DecorationCircle from '@/views/Landing/components/DecorationCircle';

const MainSectionBackground = () => (
	<div
		style={{
			position: 'absolute',
			width: '100%',
			zIndex: 1,
		}}
	>
		<div
			style={{
				background: '#FFCDA9',
				height: 500,
				width: '100%',
				overflow: 'hidden',
				position: 'relative'
			}}
		>
			<DecorationCircle
				left={-500}
				top={-300}
			/>

			<DecorationCircle
				right={-200}
				top={-200}
			/>
		</div>

		<img src={Decoration} style={{ zIndex: 10, position: 'relative' }} />
	</div>
);

export default memo(MainSectionBackground);
