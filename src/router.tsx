import { Routes, Route, useLocation } from 'react-router-dom';
import moment from 'moment';

import NavBarState from '@/context/navbar/state';
import NavBar from '@/layout/NavBar';
import Landing from '@/views/Landing';
import Login from '@/views/Login';
import NotFound from '@/views/NotFound';
import Users from '@/views/Users';
import Products from '@/views/Products';
import Categories from '@/views/Categories';


const Router = () => {
	const location = useLocation();
	const path = location.pathname;

	if (['/', '/login', '/404'].includes(path)) {
		return (
			<Routes>
				<Route
					path='/'
					element={<Landing />} />
				<Route path='/login' element={<Login />} />
				<Route path='/404' element={<NotFound />} />
			</Routes>
		);
	}

	return (
		<NavBarState>
			<div style={{ minHeight: '100vh', background: '#EEE1D4' }}>
				<div className='site-layout'>
					<div style={{ padding: 30 }}>
						<Routes>
							<Route path='/users' element={<Users />} />
							<Route path='/products' element={<Products />} />
							<Route path='/categories' element={<Categories />} />
						</Routes>
					</div>
					<div style={{ textAlign: 'center' }}>
						La Roca Restaurant ©{moment().format('YYYY')} All rights reserved
					</div>
				</div>

				<NavBar />
			</div>
		</NavBarState>
	);
};

export default Router;
