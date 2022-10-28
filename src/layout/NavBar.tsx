import { memo, useContext, useEffect, useState, useRef } from 'react';
import { Link, Navbar } from '@nextui-org/react';

import logo from '@/assets/logo.png';
import dictionary from '@/dictionary';
import LanguageContext from '@/context/language/context';
import LanguageToggler from '@/components/LanguageToggler';
import '@/styles/navbar.scss';
import { redColor, secondaryColor } from '@/contants/colors';

const NavBar = () => {
	const { lang } = useContext(LanguageContext);
	const toggleRef = useRef<any>();

	return (
		<Navbar
			maxWidth='fluid'
			variant='sticky'
			containerCss={{ height: 100 }}
			disableScrollHandler
			disableShadow
		>
			<Navbar.Brand>
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
			<Navbar.Collapse css={{ paddingTop: 30 }}>
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
			</Navbar.Collapse>
		</Navbar>
	);
};

export default memo(NavBar);
