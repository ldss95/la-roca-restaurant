import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import moment from 'moment';

import NavBarState from './context/navbar/state';

import NavBar from './layout/NavBar';
// import Header from './layout/Header/Header';

import Landing from './views/Landing';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Users from './views/Users';
import Menu from './views/Menu';
import Categories from './views/Categories';

const { Content, Footer } = Layout;

const Router = () => {
	const location = useLocation();
	const path = location.pathname;

	if (['/', '/login', '/recuperar-contrasenia', '/404'].includes(path)) {
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
			<Layout style={{ minHeight: '100vh', background: '#EEE1D4' }}>
				<Layout className='site-layout'>
					{/* <Header path={path} /> */}

					<Content style={{ padding: 30 }}>
						<Routes>
							<Route path='/users' element={<Users />} />
							<Route path='/menu' element={<Menu />} />
							<Route path='/categories' element={<Categories />} />
						</Routes>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						La Roca Restaurant ©{moment().format('YYYY')} All rights reserved
					</Footer>
				</Layout>

				<NavBar />
			</Layout>
		</NavBarState>
	);
};

export default Router;
