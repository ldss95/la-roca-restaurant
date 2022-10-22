import { Text, Grid } from '@nextui-org/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';


import { db } from '@/firebase';
import Decoration from '@/assets/decoration.svg';
import '@/styles/landing.scss';
import NavBar from '@/layout/NavBar';
import { useContext } from 'react';
import LanguageContext from '@/context/language/context';
import dictionary from '@/dictionary';

function LandingView() {
	const [products, isLoading] = useCollection(collection(db, 'products'));
	const { lang } = useContext(LanguageContext);

	return (
		<>
			<div
				style={{
					background: '#FFCDA9',
					height: 600,
					overflow: 'hidden',
				}}
			>
				<NavBar />
				<br />
				<br />

				<div
					style={{
						width: 1000,
						height: 1000,
						borderRadius: 500,
						background:
							'radial-gradient(circle, rgba(235, 42, 0, 0.47) 0%, transparent 50%)',
						position: 'absolute',
						left: -500,
						top: -300,
					}}
				/>

				<Grid.Container>
					<Grid>
						<div style={{ padding: '0 90px' }}>
							<Text h1 className='title'>
								<span>{dictionary[lang].title[0]}</span>
								<br />
								<span>{dictionary[lang].title[1]}</span>
							</Text>
							<div
								style={{ width: 100, height: 2, background: '#EB2A00' }}
							/>
						</div>
					</Grid>
					<Grid>

					</Grid>
				</Grid.Container>
			</div>
			<img src={Decoration} />

			<Grid.Container id='about_us'>
				<h2 style={{ height: '100vh' }}>Nosotros</h2>
			</Grid.Container>

			<Grid.Container id='menu'>
				<h2 style={{ height: '100vh' }}>Menu</h2>
			</Grid.Container>

			<Grid.Container id='contact'>
				<h2 style={{ height: '100vh' }}>Contacto</h2>
			</Grid.Container>
		</>
	);
}

export default LandingView;
