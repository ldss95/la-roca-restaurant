import { useContext } from 'react';
import Lottie from 'lottie-react';
import { Text } from '@nextui-org/react';

import { primaryColor, secondaryColor } from '@/contants/colors';
import loadingAnimation from '@/assets/loading.json';
import LanguageContext from '@/context/language/context';

function Loading() {
	const { lang } = useContext(LanguageContext);

	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				background: primaryColor
			}}
		>
			<Lottie
				animationData={loadingAnimation}
				size={600}
				loop
			/>
			<Text h2 css={{ color: `${secondaryColor} !important` }}>{lang === 'es' ? 'Cargando' : 'Loading'}</Text>
		</div>
	)
}

export default Loading;
