import { useContext, useState } from 'react';
import { EditOutlined, MenuOutlined, SearchOutlined, LoadingOutlined } from '@ant-design/icons';
import { Row, Button, Spin } from 'antd';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import NavbarContext from '../context/navbar/context';
import { db } from '../firebase';
import ModalProduct from '../components/ModalProduct';
import RenderIf from '../components/RenderIf';

interface ProductProps {
	id: string;
	name: string;
	description: string;
	price: number;
}

function MenuView () {
	const { toggle: toggleNavBar } = useContext(NavbarContext);

	const [products, isLoading] = useCollection(collection(db, 'products'));
	const [showModal, setShowModal] = useState(false);
	const [productToModify, setProductToModify] = useState<ProductProps>({} as ProductProps);

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

				<h3 style={{ margin: 0 }}>Menú</h3>

				<button style={{ background: 'none', border: 'none', fontSize: 24, paddingRight: 0 }}>
					<SearchOutlined />
				</button>
			</Row>
			<br />

			<Button
				type='primary'
				size='large'
				style={{
					width: '100%',
					borderRadius: 30,
					background: '#E64848',
					border: 'none'
				}}
				onClick={() => {
					setProductToModify({} as ProductProps);
					setShowModal(true);
				}}
			>
				New Product
			</Button>
			<br />
			<br />

			<RenderIf condition={isLoading}>
				<Row justify='center'>
					<Spin indicator={<LoadingOutlined />} size='large' />
				</Row>
			</RenderIf>

			{products?.docs.map((doc) => {
				const { id } = doc;
				const { name, description, price } = doc.data();

				return (
					<div
						key={id}
						style={{
							background: '#fff',
							padding: 10,
							marginBottom: 10,
							borderRadius: 10,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<div>
							<h2 style={{ margin: 0 }}>{name}</h2>
							<p style={{ margin: 0 }}>{description}</p>
							<h3 style={{ margin: 0 }}>$ {price}</h3>
						</div>
						<div>
							<button
								style={{
									width: 50,
									height: 50,
									borderRadius: 25,
									border: 'none',
									cursor: 'pointer',
									background: 'none',
									borderWidth: 1,
									borderColor: '#E64848',
									color: '#E64848',
									borderStyle: 'solid'
								}}
								onClick={() => {
									setProductToModify({
										id,
										name,
										description,
										price
									});
									setShowModal(true);
								}}
							>
								<EditOutlined />
							</button>
						</div>
					</div>
				)}
			)}

			<ModalProduct
				{ ...productToModify }
				visible={showModal}
				close={() => setShowModal(false)}
				onFinish={() => setProductToModify({} as ProductProps)}
			/>
		</div>
	)
}

export default MenuView;
