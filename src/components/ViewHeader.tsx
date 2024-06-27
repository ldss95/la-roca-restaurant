import { useContext } from 'react';
import { Grid, Text } from '@nextui-org/react';

import NavbarContext from '@/context/navbar/context';
import { MenuOutlined } from '@ant-design/icons';
import RenderIf from './RenderIf';
import LanguageToggler from './LanguageToggler';

const ViewHeader = ({ title, showLangToggler }: { title: string; showLangToggler?: boolean }) => {
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

			<RenderIf condition={!!showLangToggler}>
				<LanguageToggler />
			</RenderIf>
			<RenderIf condition={!showLangToggler}>
				<Text h3>{title}</Text>
			</RenderIf>
		</Grid.Container>
	);
}

export default ViewHeader;
