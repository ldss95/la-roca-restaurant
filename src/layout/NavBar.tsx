import { Dropdown, Link, Navbar } from '@nextui-org/react';
import { memo, useContext } from 'react';
import { SwapOutlined } from '@ant-design/icons';

import logo from '@/assets/logo.png';
import FlagUsa from '@/assets/usa_flag.svg';
import FlagSpain from '@/assets/spain_flag.svg';
import dictionary from '@/dictionary';
import LanguageContext from '@/context/language/context';
import { Language } from '@/types/language';

const NavBar = () => {
	const { lang, setLang } = useContext(LanguageContext);

	return (
		<Navbar disableShadow maxWidth='fluid'>
			<Navbar.Toggle showIn='xs' />
			<Navbar.Brand
				css={{
					'@xs': {
						w: '12%',
					},
				}}
			>
				<img src={logo} style={{ width: 100 }} />
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
				<Dropdown placement='bottom-right'>
					<Navbar.Item
						css={{
							background: '#fff',
							padding: '10px 20px',
							borderRadius: 10,
						}}
					>
						<Dropdown.Trigger>
							<SwapOutlined style={{ color: '#EB2A00' }} />
						</Dropdown.Trigger>
					</Navbar.Item>
					<Dropdown.Menu
						aria-label='Change language'
						onAction={(lang) => setLang(lang as Language)}
					>
						<Dropdown.Item key='en'>
							<img src={FlagUsa} style={{ height: 15 }} />
							English
						</Dropdown.Item>
						<Dropdown.Item key='es'>
							<img src={FlagSpain} style={{ height: 15 }} />
							Español
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
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
