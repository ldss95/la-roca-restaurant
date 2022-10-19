import { useContext, useState } from 'react';
import { DeleteOutlined, EditOutlined, MenuOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Row, Button, Loading, Table, Tooltip, Spacer, Popover } from '@nextui-org/react';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import NavbarContext from '@/context/navbar/context';
import { db } from '@/firebase';
import ModalProduct from '@/views/Products/components/ModalProduct';
import RenderIf from '@/components/RenderIf';
import { ModalOpener$ } from '@/utils/helpers';
import { ProductProps } from '@/types/product';
import { useFetchProducts } from '@/hooks/useProducts';
import { deleteProduct } from '@/services/products';
import ConfirmDeleteCard from '@/components/ConfirmDeleteCard';

function ProductsView () {
	const { toggle: toggleNavBar } = useContext(NavbarContext);

	const [products, isLoading] = useFetchProducts()
	// const [productToModify, setProductToModify] = useState<ProductProps>({} as ProductProps);

	return (
		<>
			<Row justify='space-between' align='center'>
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
				icon={<PlusOutlined />}
				onClick={() => ModalOpener$.next('PRODUCT')}
			>
				Create Product
			</Button>
			<br />

			<RenderIf condition={isLoading}>
				<Row justify='center'>
					<Loading />
				</Row>
			</RenderIf>
			<br />

			<Table css={{ background: '#fff' }}>
				<Table.Header>
					<Table.Column>Name (Spanish)</Table.Column>
					<Table.Column>Name (English)</Table.Column>
					<Table.Column>Price</Table.Column>
					<Table.Column>Categories</Table.Column>
					<Table.Column align='center'>Options</Table.Column>
				</Table.Header>
				<Table.Body items={products}>
					{({ id, name, price, categories }) => (
						<Table.Row key={id}>
							<Table.Cell>{name.spanish}</Table.Cell>
							<Table.Cell>{name.english}</Table.Cell>
							<Table.Cell>{price}</Table.Cell>
							<Table.Cell>{categories.join(', ')}</Table.Cell>
							<Table.Cell>
								<Row justify='center'>
									<Tooltip content='Edit'>
										<Button
											icon={<EditOutlined />}
											bordered
											auto
										/>
									</Tooltip>

									<Spacer />

									<Popover isBordered>
										<Popover.Trigger>
											<Button
												icon={<DeleteOutlined />}
												bordered
												auto
											/>
										</Popover.Trigger>
										<Popover.Content>
											<ConfirmDeleteCard onConfirm={() => deleteProduct(id!)} />
										</Popover.Content>
									</Popover>
								</Row>
							</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table>

			<ModalProduct />
		</>
	)
}

export default ProductsView;
