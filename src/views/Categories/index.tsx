import { useContext, useState } from 'react';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Grid } from '@nextui-org/react';

import NavbarContext from '../../context/navbar/context';
import { useFetchCategories } from '@/hooks/useCategories';
import { ModalOpener$ } from '@/utils/helpers';
import ModalCategory from './components/ModalCategory';
import { redColor50 } from '@/contants/colors';
import ModalCategoryOptions from './components/ModalCategoryOptions';

function CategoriesView () {
	const { toggle: toggleNavBar } = useContext(NavbarContext);
	const [categories] = useFetchCategories();
	const [lastSelectedCategory, setLastSelectedCategory] = useState<string | null>(null);

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

				<h3 style={{ margin: 0 }}>Categorias</h3>
			</Grid.Container>
			<br />

			<Grid.Container>
				<Grid xs={12} sm={4} md={2}>
					<Button
						icon={<PlusOutlined />}
						onClick={() => ModalOpener$.next({ name: 'CATEGORY' })}
						css={{ width: '100%', background: redColor50, color: '#000' }}
					>
						Nueva Categoria
					</Button>
				</Grid>
			</Grid.Container>
			<br />

			<Table
				css={{ background: '#fff' }}
				selectionMode='single'
				color='warning'
				onSelectionChange={(keys) => {
					const selectedId = Array.from(keys)[0] as string || lastSelectedCategory;
					const category = categories.find(({ id }) => id === selectedId);

					ModalOpener$.next({
						name: 'CATEGORY_OPTIONS',
						category,
						enableOrderChange: true
					});
					setLastSelectedCategory(selectedId);
				}}
				selectedKeys={new Set([lastSelectedCategory || ''])}
			>
				<Table.Header>
					<Table.Column>Nombre (Español)</Table.Column>
					<Table.Column>Nombre (Ingles)</Table.Column>
				</Table.Header>
				<Table.Body items={categories}>
					{({ id, name }) => (
						<Table.Row key={id}>
							<Table.Cell>{name.es}</Table.Cell>
							<Table.Cell>{name.en}</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table>

			<ModalCategory />
			<ModalCategoryOptions />
		</>
	)
}

export default CategoriesView;
