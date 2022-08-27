import { useState, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { PoweroffOutlined, ArrowLeftOutlined, FileTextOutlined, TagsOutlined, UsergroupAddOutlined } from '@ant-design/icons';

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className={`nav-menu-container ${isOpen ? 'open' : ''}`}>
			<button className='close-menu-btn' onClick={() => setIsOpen(false)}>
				<ArrowLeftOutlined />
			</button>

			<ul>
				<li>
					<NavLink to='/menu'>
						<FileTextOutlined />
						Menú
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
					<NavLink to='/#'>
						<PoweroffOutlined />
						Logout
					</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default memo(NavBar);
