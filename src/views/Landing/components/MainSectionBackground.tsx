import { memo } from 'react'
import { Grid } from '@nextui-org/react';

import Decoration from '@/assets/decoration.svg';
import DecorationCircle from '@/views/Landing/components/DecorationCircle';
import { lightPrimaryColor } from '@/constants/colors';
import { sizeCalc } from '@/utils/helpers';

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
				background: lightPrimaryColor,
				width: '100%',
				overflow: 'hidden',
				position: 'relative',
				height: sizeCalc(650, 700)
			}}
		>
			<DecorationCircle
				left={-500}
				top={-100}
			/>

			<DecorationCircle
				right={-200}
				top={-200}
			/>
		</div>

		<Grid.Container>
			<Grid xs={0} sm={12} css={{ overflow: 'hidden' }}>
				<img src={Decoration} style={{ zIndex: 10, position: 'relative', margin: 20 }} />
			</Grid>
		</Grid.Container>
	</div>
);

export default memo(MainSectionBackground);
