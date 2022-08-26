import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import moment from 'moment';

// import NavBar from './layout/Navbar/NavBar';
// import Header from './layout/Header/Header';

import Landing from './views/Landing';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Users from './views/Users';
import Menu from './views/Menu';

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
		<Layout style={{ minHeight: '100vh', background: '#f5f5fd' }}>
			{/* <NavBar /> */}

			<Layout className='site-layout'>
				{/* <Header path={path} /> */}

				<Content style={{ padding: 30 }}>
					<Routes>
						<Route path='/usuarios' element={<Users />} />
						<Route path='/menu' element={<Menu />} />
					</Routes>
				</Content>
				<Footer style={{ textAlign: 'center' }}>
					La Roca Restaurant ©{moment().format('YYYY')} All rights reserved
				</Footer>
			</Layout>
		</Layout>
	);
};

export default Router;
