import { memo, useContext } from 'react';
import { Grid, Text } from '@nextui-org/react';

import NavbarContext from '@/context/navbar/context';
import { MenuOutlined } from '@ant-design/icons';

const ViewHeader = ({ title }: { title: string; }) => {
	const { toggle } = useContext(NavbarContext);

	return (
		<Grid.Container justify='space-between' alignItems='center'>
			<button
				style={{
					background: 'none',
					border: 'none',
					fontSize: 24,
					paddingLeft: 0,
					cursor: 'pointer'
				}}
				onClick={toggle}
			>
				<MenuOutlined />
			</button>

			<Text h3>{title}</Text>
		</Grid.Container>
	);
}

export default memo(ViewHeader);
