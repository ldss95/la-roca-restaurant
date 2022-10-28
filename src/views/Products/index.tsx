import { useContext, useState } from 'react';
import { MenuOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Grid, Button, Table, Spacer, Dropdown } from '@nextui-org/react';

import NavbarContext from '@/context/navbar/context';
import ModalProduct from '@/views/Products/components/ModalProduct';
import { ModalOpener$ } from '@/utils/helpers';
import { useFetchProducts } from '@/hooks/useProducts';
import { useFetchCategories } from '@/hooks/useCategories';
import Loading from '../Loading';
import { redColor, redColor50 } from '@/contants/colors';
import ModalProductOptions from './components/ModalProductOptions';

function ProductsView () {
	const { toggle: toggleNavBar } = useContext(NavbarContext);

	const [products, isLoading] = useFetchProducts();
	const [categories] = useFetchCategories();
	const [categorySelected, setCategorySelected] = useState<string | null>(null);
	const [lastSelectedProduct, setLastSelectedProduct] = useState<string | null>(null);

	if (isLoading) {
		return (
			<Loading />
		)
	}

	return (
		<>
			<Grid.Container justify='space-between' alignItems='center'>
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

				<h3 style={{ margin: 0 }}>Products</h3>

				<button
					style={{
						background: 'none',
						border: 'none',
						fontSize: 24,
						paddingRight: 0,
						opacity: 0
					}}
				>
					<SearchOutlined />
				</button>
			</Grid.Container>
			<br />

			<Grid.Container>
				<Grid xs={12} sm={4} md={2}>
					<Button
						icon={<PlusOutlined />}
						onClick={() => ModalOpener$.next({ name: 'PRODUCT' })}
						css={{ width: '100%', background: redColor50, color: '#000' }}
					>
						Create Product
					</Button>
				</Grid>
				<Spacer />
				<Grid xs={12} sm={4} md={2}>
					<Dropdown>
						<Dropdown.Button css={{ width: '100%', background: redColor50, color: '#000' }} flat>
							{categorySelected || 'Choose One Category'}
						</Dropdown.Button>
						<Dropdown.Menu
							selectionMode='single'
							onSelectionChange={(keys) => {
								const [key] = Array.from(keys) as string[];
								setCategorySelected(key || null)
							}}
							selectedKeys={categorySelected ? [categorySelected] : []}
						>
							{categories.map(({ name }) => (
								<Dropdown.Item key={name.en}>{name.en}</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</Grid>
			</Grid.Container>

			<br />

			<Table
				css={{ background: '#fff' }}
				selectionMode='single'
				color='warning'
				onSelectionChange={(keys) => {
					const selectedId = Array.from(keys)[0] as string || lastSelectedProduct;
					console.log(selectedId);
					const product = products.find(({ id }) => id === selectedId);

					ModalOpener$.next({
						name: 'PRODUCT_OPTIONS',
						product,
						enableOrderChange: !!categorySelected
					});
					setLastSelectedProduct(selectedId);
				}}
				compact
				selectedKeys={new Set([lastSelectedProduct || ''])}
			>
				<Table.Header>
					<Table.Column>Name (Spanish)</Table.Column>
					<Table.Column>Price</Table.Column>
				</Table.Header>
				<Table.Body>
					{products
						.filter(({ category }) => !categorySelected || categorySelected === category)
						.map(({ id, name, price }) => (
							<Table.Row key={id}>
								<Table.Cell
									css={{
										fontSize: 16,
										fontWeight: 'bold' }}
								>
									{name.es}
								</Table.Cell>
								<Table.Cell
									css={{
										fontSize: 16,
										fontWeight: 'bold',
										color: redColor,
										textAlign: 'right'
									}}
								>
									{price}
								</Table.Cell>
							</Table.Row>
						))
					}
				</Table.Body>
			</Table>

			<ModalProduct />
			<ModalProductOptions />
		</>
	)
}

export default ProductsView;
