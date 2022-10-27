import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Button, Spacer, Text } from '@nextui-org/react';

import LanguageContext from '@/context/language/context';
import { primaryColor, redColor, secondaryColor } from '@/contants/colors';

function NotFoundView () {
	const { lang } = useContext(LanguageContext);
	const navigate = useNavigate();

	return (
		<div
			style={{
				height: '100vh',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				background: primaryColor
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text h1 color={redColor}>404</Text>
				<Spacer />
				<div style={{ width: 2, height: 40, background: secondaryColor, transform: 'rotate(10deg)' }} />
				<Spacer />
				<Text h4 color={secondaryColor}>Page not found</Text>
			</div>
			<br />

			<Button
				onClick={() => navigate('/')}
				css={{ background: redColor }}
				icon={<HomeOutlined />}
				size='lg'
			>
				{lang === 'en' ? 'Go Home' : 'Ir al inicio'}
			</Button>
		</div>
	)
}

export default NotFoundView;
