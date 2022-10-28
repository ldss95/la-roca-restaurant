import { memo } from 'react'

import Decoration from '@/assets/decoration.svg';
// import DecorationCircle from '@/views/Landing/components/DecorationCircle';
import { primaryColor } from '@/contants/colors';
import { Grid } from '@nextui-org/react';
import { sizeCalc } from '@/helpers';

const MainSectionBackground = () => (
	<div
		style={{
			position: 'absolute',
			top: 0,
			width: '100%',
			zIndex: 1
		}}
	>
		<div
			style={{
				background: primaryColor,
				height: sizeCalc(690, 833),
				width: '100%',
				overflow: 'hidden',
				position: 'relative'
			}}
		>
			{/* <DecorationCircle
				left={-500}
				top={-300}
			/>

			<DecorationCircle
				right={-200}
				top={-200}
			/> */}
		</div>

		<Grid.Container>
			<Grid xs={0} md={12}>
				<img src={Decoration} style={{ zIndex: 10, position: 'relative', margin: 20 }} />
			</Grid>
		</Grid.Container>
	</div>
);

export default memo(MainSectionBackground);
