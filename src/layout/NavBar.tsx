import { memo, useContext, useEffect, useState, useRef } from 'react';
import { Grid, Link, Navbar } from '@nextui-org/react';

import logo from '@/assets/logo.png';
import dictionary from '@/dictionary';
import LanguageContext from '@/context/language/context';
import LanguageToggler from '@/components/LanguageToggler';
import '@/styles/navbar.scss';
import { redColor, secondaryColor } from '@/contants/colors';
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useFetchLinks } from '@/hooks/useLinks';

const NavBar = () => {
	const { lang } = useContext(LanguageContext);
	const [links] = useFetchLinks();
	const toggleRef = useRef<any>();
	const [logoCss, setLogoCss] = useState({
		height: 150,
		marginTop: 80
	})

	useEffect(() => {
		document.addEventListener('scroll', handleLogoSize);
		function handleLogoSize() {
			const height = 150 - (window.pageYOffset / 10);
			const marginTop = 80 - (window.pageYOffset / 8)

			if (height < 60) {
				return;
			}

			setLogoCss((state) => ({
				height,
				marginTop: marginTop >= 0 ? marginTop : state.marginTop
			}));
		}

		return () => document.removeEventListener('scroll', handleLogoSize)
	}, []);

	return (
		<Navbar
			maxWidth='fluid'
			variant='sticky'
			disableScrollHandler
			disableShadow
		>
			<Navbar.Brand hideIn='xs'>
				<img src={logo} style={logoCss} />
			</Navbar.Brand>
			<Navbar.Brand showIn='xs'>
				<img src={logo} style={{ height: 60 }} />
			</Navbar.Brand>
			<Navbar.Content hideIn='sm' gap='$20'>
				<Navbar.Link href='#about_us'>
					{dictionary[lang].navbar.aboutUs}
				</Navbar.Link>
				<Navbar.Link href='#menu'>
					{dictionary[lang].navbar.menu}
				</Navbar.Link>
				<Navbar.Link href='#contact'>
					{dictionary[lang].navbar.contact}
				</Navbar.Link>
				<LanguageToggler />
			</Navbar.Content>
			<Navbar.Content showIn='sm'>
				<LanguageToggler />

				<Navbar.Toggle ref={toggleRef}>
					<svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="27" height="3" rx="1.5" fill={redColor} />
						<rect y="9" width="27" height="3" rx="1.5" fill={redColor} />
						<rect y="18" width="27" height="3" rx="1.5" fill={redColor} />
					</svg>
				</Navbar.Toggle>
			</Navbar.Content>
			<Navbar.Collapse>
				<Navbar.CollapseItem>
					<Link
						color='inherit'
						css={{
							minWidth: '100%',
							justifyContent: 'center',
							color: secondaryColor,
							fontSize: 29,
							fontWeight: 'bold'
						}}
						href='#about_us'
						onClick={() => toggleRef.current.click()}
					>
						{dictionary[lang].navbar.aboutUs}
					</Link>
				</Navbar.CollapseItem>
				<Navbar.CollapseItem>
					<Link
						color='inherit'
						css={{
							minWidth: '100%',
							justifyContent: 'center',
							color: secondaryColor,
							fontSize: 29,
							fontWeight: 'bold'
						}}
						href='#menu'
						onClick={() => toggleRef.current.click()}
					>
						{dictionary[lang].navbar.menu}
					</Link>
				</Navbar.CollapseItem>
				<Navbar.CollapseItem>
					<Link
						color='inherit'
						css={{
							minWidth: '100%',
							justifyContent: 'center',
							color: secondaryColor,
							fontSize: 29,
							fontWeight: 'bold'
						}}
						href='#contact'
						onClick={() => toggleRef.current.click()}
					>
						{dictionary[lang].navbar.contact}
					</Link>
				</Navbar.CollapseItem>

				<Navbar.CollapseItem>
					<div
						style={{
							width: '80%',
							height: 2,
							background: secondaryColor,
							margin: '10%',
						}}
					/>
				</Navbar.CollapseItem>

				<Navbar.CollapseItem>
					<Grid.Container>
						<Grid xs={4} justify='center'>
							<a
								href={`https://instagram.com/${links?.instagram?.username?.replace('@', '')}`}
								onClick={() => toggleRef.current.click()}
								target='_blannk'
								className='social-media-link'
							>
								<InstagramOutlined />
							</a>
						</Grid>
						<Grid xs={4} justify='center'>
							<a
								href={links?.facebook?.url}
								onClick={() => toggleRef.current.click()}
								target='_blank'
								className='social-media-link'
							>
								<FacebookOutlined />
							</a>
						</Grid>
						<Grid xs={4} justify='center'>
							<a
								href={`https://wa.me/1${links?.whatsapp?.phone?.replace(/[^0-9]/g, '')}`}
								onClick={() => toggleRef.current.click()}
								target='_blank'
								className='social-media-link'
							>
								<WhatsAppOutlined />
							</a>
						</Grid>
					</Grid.Container>
				</Navbar.CollapseItem>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default memo(NavBar);
