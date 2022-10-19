import { memo, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { PoweroffOutlined, ArrowLeftOutlined, FileTextOutlined, TagsOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '@/firebase';
import NavbarContext from '@/context/navbar/context';

const NavBar = () => {
	const { isOpen, toggle } = useContext(NavbarContext);
	const navigate = useNavigate();

	useEffect(() => {
		const links = document.querySelectorAll('a');
		links.forEach(link => {
			link.addEventListener('click', () => toggle());
		});
	}, []);

	async function handleLogout(){
		await signOut(auth);
		navigate('/login');
	}

	return (
		<div className={`nav-menu-container ${isOpen ? 'open' : ''}`}>
			<button className='close-menu-btn' onClick={toggle}>
				<ArrowLeftOutlined />
			</button>

			<ul>
				<li>
					<NavLink to='/products'>
						<FileTextOutlined />
						Products
					</NavLink>
				</li>
				<li>
					<NavLink to='/categories'>
						<TagsOutlined />
						Categories
					</NavLink>
				</li>
				<li>
					<NavLink to='/users'>
						<UsergroupAddOutlined />
						Users
					</NavLink>
				</li>
				<li>
					<NavLink to='#' onClick={handleLogout}>
						<PoweroffOutlined />
						Logout
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default memo(NavBar);
