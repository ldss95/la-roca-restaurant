import { useContext, useState } from 'react';
import { MenuOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Grid, Button, Table, Spacer, Dropdown } from '@nextui-org/react';

import NavbarContext from '@/context/navbar/context';
import ModalProduct from '@/views/Products/components/ModalProduct';
import { ModalOpener$ } from '@/utils/helpers';
import { useFetchProducts } from '@/hooks/useProducts';
import { useFetchCategories } from '@/hooks/useCategories';
import Loading from '../Loading';
import OrderCell from './components/OrderCell';
import OptionsCell from './components/OptionsCell';

function ProductsView () {
	const { toggle: toggleNavBar } = useContext(NavbarContext);

	const [products, isLoading] = useFetchProducts();
	const [categories] = useFetchCategories();
	const [categorySelected, setCategorySelected] = useState<string | null>(null);

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

				<h3 style={{ margin: 0 }}>Menú</h3>

				<button style={{ background: 'none', border: 'none', fontSize: 24, paddingRight: 0 }}>
					<SearchOutlined />
				</button>
			</Grid.Container>
			<br />

			<Grid.Container>
				<Button
					icon={<PlusOutlined />}
					onClick={() => ModalOpener$.next({ name: 'PRODUCT' })}
				>
					Create Product
				</Button>

				<Spacer />

				<div>
					<Dropdown>
						<Dropdown.Button>
							{categorySelected || 'Choose One'}
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
				</div>
			</Grid.Container>

			<br />

			<Table css={{ background: '#fff' }}>
				<Table.Header>
					<Table.Column>Name (Spanish)</Table.Column>
					<Table.Column>Price</Table.Column>
					<Table.Column>Categories</Table.Column>
					<Table.Column align='center'>Order</Table.Column>
					<Table.Column align='center'>Options</Table.Column>
				</Table.Header>
				<Table.Body>
					{products
						.filter(({ category }) => !categorySelected || categorySelected === category)
						.map(({ id, name, price, category, order }) => (
							<Table.Row key={id}>
								<Table.Cell>{name.es}</Table.Cell>
								<Table.Cell>{price}</Table.Cell>
								<Table.Cell>{category}</Table.Cell>
								<Table.Cell>
									<OrderCell
										id={id!}
										order={order}
										categorySelected={categorySelected}
									/>
								</Table.Cell>
								<Table.Cell>
									<OptionsCell
										id={id}
										order={order}
										price={price}
										name={name}
										category={category}
									/>
								</Table.Cell>
							</Table.Row>
						))
					}
				</Table.Body>
			</Table>

			<ModalProduct />
		</>
	)
}

export default ProductsView;
