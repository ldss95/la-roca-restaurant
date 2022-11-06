import { Routes, Route, useLocation } from 'react-router-dom';
import moment from 'moment';

import NavBarState from '@/context/navbar/state';
import AdminNavBar from '@/layout/AdminNavBar';

import Landing from '@/views/Landing';
import Login from '@/views/Login';
import Users from '@/views/Users';
import Products from '@/views/Products';
import Categories from '@/views/Categories';
import Images from '@/views/Images';
import Texts from '@/views/Texts';



const Router = () => {
	const location = useLocation();
	const path = location.pathname;

	if (['/users', '/products', '/categories', '/images', '/texts'].includes(path)) {
		return (
			<NavBarState>
				<div style={{ minHeight: '100vh', background: '#EEE1D4' }}>
					<div className='site-layout'>
						<div style={{ padding: 30 }}>
							<Routes>
								<Route path='/users' element={<Users />} />
								<Route path='/products' element={<Products />} />
								<Route path='/categories' element={<Categories />} />
								<Route path='/images' element={<Images />} />
								<Route path='/texts' element={<Texts />} />
							</Routes>
						</div>
						<div style={{ textAlign: 'center' }}>
							La Roca Restaurant ©{moment().format('YYYY')} All rights reserved
						</div>
					</div>

					<AdminNavBar />
				</div>
			</NavBarState>
		);
	}

	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/*' element={<Landing />} />
		</Routes>
	);
};

export default Router;
