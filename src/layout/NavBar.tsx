import { Link, Navbar } from '@nextui-org/react';
import { memo, useContext } from 'react';

import logo from '@/assets/logo.png';
import dictionary from '@/dictionary';
import LanguageContext from '@/context/language/context';
import LanguageToggler from '@/components/LanguageToggler';
import '@/styles/navbar.scss'

const NavBar = () => {
	const { lang } = useContext(LanguageContext);

	return (
		<Navbar disableShadow>
			<Navbar.Toggle showIn='xs' />
			<Navbar.Brand css={{ padding: 20 }} >
				<img src={logo} style={{ width: 150 }} />
			</Navbar.Brand>
			<Navbar.Content hideIn='xs'>
				<Navbar.Link href='#about_us'>
					{dictionary[lang].navbar.aboutUs}
				</Navbar.Link>
				<Navbar.Link href='#menu'>
					{dictionary[lang].navbar.menu}
				</Navbar.Link>
				<Navbar.Link href='#contact'>
					{dictionary[lang].navbar.contact}
				</Navbar.Link>
			</Navbar.Content>
			<Navbar.Content
				css={{
					'@xs': {
						w: '12%',
						jc: 'flex-end',
					},
				}}
			>
				<LanguageToggler />
			</Navbar.Content>
			<Navbar.Collapse>
				<Navbar.CollapseItem>
					<Link
						color='inherit'
						css={{ minWidth: '100%' }}
						href='#about_us'
					>
						{dictionary[lang].navbar.aboutUs}
					</Link>
					<Link
						color='inherit'
						css={{ minWidth: '100%' }}
						href='#menu'
					>
						{dictionary[lang].navbar.menu}
					</Link>
					<Link
						color='inherit'
						css={{ minWidth: '100%' }}
						href='#contact'
					>
						{dictionary[lang].navbar.contact}
					</Link>
				</Navbar.CollapseItem>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default memo(NavBar);
