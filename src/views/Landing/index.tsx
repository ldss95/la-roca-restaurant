import { useContext, useEffect } from 'react';
import { Text, Grid, Spacer, Image } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';

import '@/styles/landing.scss';
import NavBar from '@/layout/NavBar';
import LanguageContext from '@/context/language/context';
import dictionary from '@/dictionary';
import Footer from '@/layout/Footer';
import Menu from '@/views/Landing/components/Menu';
// import DecorationCircle from '@/views/Landing/components/DecorationCircle';
import MainSectionBackground from './components/MainSectionBackground';
import Carousel from './components/Carousel';
import stamp from '@/assets/stamp.svg';
import { useFetchImages } from '@/hooks/useImages';
import { useCopy } from '@/hooks/useCopy';
import ContactSection from './components/ContactSection';
import loadingAnimation from '@/assets/loading.json';
import RenderIf from '@/components/RenderIf';

function LandingView() {
	const { lang } = useContext(LanguageContext);
	const [images] = useFetchImages();
	const [copy, loading] = useCopy();
	const location = useLocation();

	useEffect(() => {
		if (loading) {
			return;
		}

		if (location.hash) {
			const section = document.getElementById(location.hash.replace('#', ''));
			section?.scrollIntoView();
		}
	}, [loading]);

	if (loading) {
		return (
			<div
				style={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					background: '#FFCDA9'
				}}
			>
				<Lottie
					animationData={loadingAnimation}
					size={600}
					loop
				/>
				<Text h2 css={{ color: '#EB2A00 !important' }}>{lang === 'es' ? 'Cargando' : 'Loading'}</Text>
			</div>
		)
	}

	return (
		<>
			<section style={{ overflow: 'hidden' }}>
				<MainSectionBackground />
				<RenderIf condition={window.innerWidth > 700}>
					<br />
				</RenderIf>
				<NavBar />
				<br />
				<br />

				<Grid.Container>
					<Grid xs={12} md={6}>
						<div style={{ padding: '0 60px', marginTop: 90, zIndex: 20, marginBottom: 30 }}>
							<Text h1 className='title'>
								<span>{copy[lang].title[0]}</span>
								<br />
								<span>{copy[lang].title[1]}</span>
							</Text>
							<div
								style={{ width: 100, height: 2, background: '#EB2A00' }}
							/>
						</div>
					</Grid>
					<Grid
						xs={12}
						md={6}
						css={{
							padding: 15,
							position: 'relative'
						}}
					>
						<Image
							src='https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Flocrio.png?alt=media&token=3523fcc7-e3d6-443a-95ef-41c9843639e0'
							height={window.innerWidth < 700 ? 400 : 760}
							width='100%'
							objectFit='cover'
							containerCss={{ zIndex: 20, borderRadius: 10 }}
							autoResize
						/>

						<Spacer />

						<Image
							src='https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fmofongo.png?alt=media&token=59de3a54-17ae-4723-9822-170bfad51b58'
							height={window.innerWidth < 700 ? 400 : 760}
							width='60%'
							objectFit='cover'
							containerCss={{ zIndex: 20, borderRadius: 10, marginRight: -30 }}
							autoResize
						/>

						<img
							src={stamp}
							style={{
								position: 'absolute',
								width: 250,
								height: 250,
								top: 100,
								left: window.innerWidth < 700 ? '40%': '50%',
								zIndex: 100
							}}
						/>
					</Grid>
				</Grid.Container>
			</section>
			<br />
			<br />
			<br />

			<section id='about_us' style={{ overflow: 'hidden' }}>
				<Grid.Container>
					<Grid xs={12} md={6} css={{ position: 'relative' }}>
						<Carousel
							images={images
								.filter(({ section }) => section === 'about_us')
								.map(({ url }) => url)
							}
						/>
					</Grid>
					<Grid
						xs={12}
						md={6}
						justify='center'
						direction='column'
						css={{
							padding: 30,
							position: 'relative'
						}}
					>
						<Text h2>{dictionary[lang].titles.about_us}</Text>
						<br />
						<br />

						<Text className='heading'>
							<span>{copy[lang].about_us.title[0]}</span>
							<br />
							<span>{copy[lang].about_us.title[1]}</span>
						</Text>
						<br />

						<Text className='subheading'>{copy[lang].about_us.subtitle}</Text>
						<br />

						<div
							style={{
								width: 110,
								height: 5,
								background: '#FFCDA9'
							}}
						/>

						{/* <DecorationCircle right={-600} top={-100} /> */}
					</Grid>
				</Grid.Container>
			</section>
			<br />
			<br />

			<section id='menu' style={{ overflow: 'hidden' }}>
				<Menu copy={copy} />
			</section>
			<br />

			<section id='contact' style={{ overflow: 'hidden' }}>
				<ContactSection copy={copy} />
			</section>

			<Grid.Container css={{ padding: '0 30px' }}>
				<Grid
					xs={12}
					md={8}
					css={{
						padding: 10,
						background: '#FFCDA959'
					}}
				>
					<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M13 15.6C12.6786 15.6 12.3644 15.6953 12.0972 15.8739C11.83 16.0524 11.6217 16.3062 11.4987 16.6031C11.3757 16.9001 11.3435 17.2268 11.4062 17.542C11.4689 17.8572 11.6237 18.1468 11.851 18.374C12.0782 18.6013 12.3678 18.7561 12.683 18.8188C12.9982 18.8815 13.3249 18.8493 13.6219 18.7263C13.9188 18.6033 14.1726 18.395 14.3511 18.1278C14.5297 17.8606 14.625 17.5464 14.625 17.225C14.625 16.794 14.4538 16.3807 14.1491 16.0759C13.8443 15.7712 13.431 15.6 13 15.6ZM13 13.65C13.3448 13.65 13.6754 13.513 13.9192 13.2692C14.163 13.0254 14.3 12.6948 14.3 12.35V8.45C14.3 8.10522 14.163 7.77456 13.9192 7.53076C13.6754 7.28696 13.3448 7.15 13 7.15C12.6552 7.15 12.3246 7.28696 12.0808 7.53076C11.837 7.77456 11.7 8.10522 11.7 8.45V12.35C11.7 12.6948 11.837 13.0254 12.0808 13.2692C12.3246 13.513 12.6552 13.65 13 13.65ZM13 0C10.4288 0 7.91543 0.762437 5.77759 2.19089C3.63975 3.61935 1.97351 5.64967 0.989572 8.02511C0.00563269 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5994 25.9944 17.9749 25.0104C20.3503 24.0265 22.3806 22.3602 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.9962 9.55336 24.6253 6.24899 22.1882 3.81184C19.751 1.3747 16.4466 0.00383315 13 0ZM13 23.4C10.9431 23.4 8.93234 22.79 7.22207 21.6473C5.5118 20.5045 4.17881 18.8803 3.39166 16.9799C2.60451 15.0796 2.39855 12.9885 2.79984 10.9711C3.20112 8.95366 4.19163 7.10055 5.64609 5.64609C7.10056 4.19162 8.95366 3.20112 10.9711 2.79983C12.9885 2.39855 15.0796 2.6045 16.9799 3.39165C18.8803 4.1788 20.5045 5.5118 21.6473 7.22207C22.7901 8.93234 23.4 10.9431 23.4 13C23.3968 15.7573 22.3001 18.4007 20.3504 20.3504C18.4007 22.3001 15.7573 23.3968 13 23.4Z" fill="#EB2A00"/>
					</svg>

					<Spacer />

					<Text css={{ fontSize: 15, width: 'calc(100% - 26px)' }}>{copy[lang].fdaWarning}</Text>
				</Grid>
			</Grid.Container>
			<br />

			<Footer />
		</>
	);
}

export default LandingView;
