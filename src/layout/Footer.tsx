import { Grid, Spacer, Text } from '@nextui-org/react';
import { useContext } from 'react';
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';

import logo from '@/assets/logo.png';
import dictionary from '@/dictionary';
import LanguageContext from '@/context/language/context';
import LanguageToggler from '@/components/LanguageToggler';
import { redColor10 } from '@/constants/colors';
import { useFetchLinks } from '@/hooks/useLinks';

const Footer = () => {
	const { lang } = useContext(LanguageContext);
	const [links] = useFetchLinks();

	return (
		<footer>
			<Grid.Container style={{ padding: '60px 0' }}>
				<Grid
					xs={12}
					md={3}
					justify='center'
					alignItems='center'
				>
					<img src={logo} style={{ maxWidth: '50%', maxHeight: '60%', height: 'auto', width: 'auto' }} />
				</Grid>

				{/* Desktop */}
				<Grid
					xs={0}
					md={3}
				>
					<ul id='social_media_links'>
						<li>
							<a href={`https://instagram.com/${links?.instagram?.username?.replace('@', '')}`} target='_blannk'>
								<InstagramOutlined />
								<Text>@laroca_restaurant</Text>
							</a>
						</li>
						<li>
							<a href={links?.facebook?.url} target='_blank'>
								<FacebookOutlined />
								<Text>La Roca Restaurant</Text>
							</a>
						</li>
						<li>
							<a href={`https://wa.me/1${links?.whatsapp?.phone?.replace(/[^0-9]/g, '')}`} target='_blank'>
								<WhatsAppOutlined />
								<Text>{links?.whatsapp?.phone}</Text>
							</a>
						</li>
					</ul>
				</Grid>

				{/* Mobile */}
				<Grid
					xs={12}
					md={0}
					direction='column'
					alignItems='center'
				>
					<br />
					<LanguageToggler />
					<br />
					<br />

					<a className='nav-link' href='#about_us'>{dictionary[lang].navbar.aboutUs}</a>
					<a className='nav-link' href='#menu'>{dictionary[lang].navbar.menu}</a>
					<a className='nav-link' href='#contact'>{dictionary[lang].navbar.contact}</a>
					<br />
				</Grid>

				<Grid
					xs={12}
					md={0}
					justify='center'
				>
					<a href={`https://instagram.com/${links?.instagram?.username?.replace('@', '')}`} target='_blannk' className='social-media-link'>
						<InstagramOutlined />
					</a>

					<Spacer x={2} />

					<a href={links?.facebook?.url} target='_blank' className='social-media-link'>
						<FacebookOutlined />
					</a>

					<Spacer x={2} />

					<a href='https://wa.me/14019418090' target='_blank' className='social-media-link'>
						<WhatsAppOutlined />
					</a>
				</Grid>
				<Grid xs={0} md={3}>
					<ul id='nav_links'>
						<li>
							<a href='#about_us'>{dictionary[lang].navbar.aboutUs}</a>
						</li>
						<li>
							<a href='#menu'>{dictionary[lang].navbar.menu}</a>
						</li>
						<li>
							<a href='#contact'>{dictionary[lang].navbar.contact}</a>
						</li>
					</ul>
				</Grid>
				<Grid
					xs={0}
					md={3}
					alignItems='center'
					justify='center'
				>
					<LanguageToggler />
				</Grid>
			</Grid.Container>
			<div
				style={{
					width: '100%',
					textAlign: 'center',
					background: redColor10,
					padding: 20
				}}
			>
				<Text>2022  La Roca Restaurant  ©  All Rights Reserved</Text>
			</div>
		</footer>
	);
}

export default Footer;
