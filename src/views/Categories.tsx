import { useContext } from 'react';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Row } from 'antd';

import NavbarContext from '../context/navbar/context';

function CategoriesView () {
	const { toggle: toggleNavBar } = useContext(NavbarContext);

	return (
		<div>
			<Row justify='space-between' align='middle'>
				<button
					style={{
						background: 'none',
						border: 'none',
						fontSize: 24,
						paddingLeft: 0,
						cursor: 'pointer'
					}}
					onClick={toggleNavBar}
				>
					<MenuOutlined />
				</button>

				<h3 style={{ margin: 0 }}>Categories</h3>

				<button style={{ background: 'none', border: 'none', fontSize: 24, paddingRight: 0 }}>
					<SearchOutlined />
				</button>
			</Row>
			<br />
		</div>
	)
}

export default CategoriesView;
