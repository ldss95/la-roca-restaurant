import { Grid, Text } from '@nextui-org/react';
import { memo, useContext } from 'react';
import { FacebookOutlined, InstagramOutlined, WhatsAppOutlined } from '@ant-design/icons';

import logo from '@/assets/logo.png';
import dictionary from '@/dictionary';
import LanguageContext from '@/context/language/context';
import LanguageToggler from '@/components/LanguageToggler';

const Footer = () => {
	const { lang } = useContext(LanguageContext);

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
				<Grid xs={12} md={3}>
					<ul id='social_media_links'>
						<li>
							<a href='https://instagram.com' target='_blannk'>
								<InstagramOutlined />
								<Text>@laroca_restaurant</Text>
							</a>
						</li>
						<li>
							<a href='https://facebook.com' target='_blank'>
								<FacebookOutlined />
								<Text>La Roca Restaurant</Text>
							</a>
						</li>
						<li>
							<a href='https://wa.me/14019418090' target='_blank'>
								<WhatsAppOutlined />
								<Text>(401) 941-8090</Text>
							</a>
						</li>
					</ul>
				</Grid>
				<Grid xs={12} md={3}>
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
				<Grid xs={12} md={3} alignItems='center' justify='center'>
					<LanguageToggler />
				</Grid>
			</Grid.Container>
			<div
				style={{
					width: '100%',
					textAlign: 'center',
					background: '#EB2A001C',
					padding: 20
				}}
			>
				<Text>2022  La Roca Restaurant  ©  All Rights Reserved</Text>
			</div>
		</footer>
	);
}

export default memo(Footer);
