import { memo, useContext, useEffect, useState } from 'react';
import { Link, Navbar } from '@nextui-org/react';

import logo from '@/assets/logo.png';
import dictionary from '@/dictionary';
import LanguageContext from '@/context/language/context';
import LanguageToggler from '@/components/LanguageToggler';
import '@/styles/navbar.scss';

const NavBar = () => {
	const { lang } = useContext(LanguageContext);
	const [mobileNabIsOpen, setMobileNabIsOpen] = useState(false);

	useEffect(() => {
		if (!mobileNabIsOpen) {
			const body = document.querySelector('body');
			body!.style.overflow = 'auto';
		}
	}, [mobileNabIsOpen]);

	return (
		<Navbar
			maxWidth='fluid'
			variant='sticky'
			containerCss={{ height: 100, padding: '0 60px' }}
			disableShadow
		>
			<Navbar.Brand>
				<img
					src={logo}
					style={{
						// width: window.innerWidth < 700 ? 100 : 200,
						height: 60
					}}
				/>
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

				<Navbar.Toggle onClick={() => setMobileNabIsOpen(!mobileNabIsOpen)}>
					<svg width="27" height="21" viewBox="0 0 27 21" fill="none" xmlns="http://www.w3.org/2000/svg">
						<rect width="27" height="3" rx="1.5" fill="#EB2A00"/>
						<rect y="9" width="27" height="3" rx="1.5" fill="#EB2A00"/>
						<rect y="18" width="27" height="3" rx="1.5" fill="#EB2A00"/>
					</svg>
				</Navbar.Toggle>
			</Navbar.Content>
			<Navbar.Collapse isOpen={mobileNabIsOpen}>
				<Navbar.CollapseItem>
					<Link
						color='inherit'
						css={{
							minWidth: '100%',
							justifyContent: 'center',
							color: '#500E00',
							fontSize: 29,
							fontWeight: 'bold'
						}}
						href='#about_us'
						onClick={() => setMobileNabIsOpen(false)}
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
							color: '#500E00',
							fontSize: 29,
							fontWeight: 'bold'
						}}
						href='#menu'
						onClick={() => setMobileNabIsOpen(false)}
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
							color: '#500E00',
							fontSize: 29,
							fontWeight: 'bold'
						}}
						href='#contact'
						onClick={() => setMobileNabIsOpen(false)}
					>
						{dictionary[lang].navbar.contact}
					</Link>
				</Navbar.CollapseItem>
			</Navbar.Collapse>

		</Navbar>
	);
};

export default memo(NavBar);
