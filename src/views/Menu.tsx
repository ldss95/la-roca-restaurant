import { useState } from 'react';
import { EditOutlined, MenuOutlined, SearchOutlined } from '@ant-design/icons';
import { Row, Button } from 'antd';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { db } from '../firebase';
import ModalProduct from '../components/ModalProduct';

interface ProductProps {
	id: string;
	name: string;
	description: string;
	price: number;
}

function MenuView () {
	const [products] = useCollection(collection(db, 'products'));
	const [showModal, setShowModal] = useState(false);
	const [productToModify, setProductToModify] = useState<ProductProps>({} as ProductProps);

	return (
		<div>
			<Row justify='space-between' align='middle'>
				<button style={{ background: 'none', border: 'none', fontSize: 24, paddingLeft: 0 }}>
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
					background: '#c07b31',
					border: 'none'
				}}
				onClick={() => setShowModal(true)}
			>
				New Product
			</Button>
			<br />
			<br />

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
									cursor: 'pointer'
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
