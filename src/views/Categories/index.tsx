import { useContext } from 'react';
import {
	DeleteOutlined,
	EditOutlined,
	MenuOutlined,
	PlusOutlined,
	SearchOutlined
} from '@ant-design/icons';
import {
	Row,
	Table,
	Button,
	Spacer,
	Tooltip,
	Popover,
	Grid,
	Text
} from '@nextui-org/react';

import NavbarContext from '../../context/navbar/context';
import { useFetchCategories } from '@/hooks/useCategories';
import { deleteCategory } from '@/services/categories';
import { ModalOpener$ } from '@/utils/helpers';
import ModalCategory from './components/ModalCategory';

const ConfirmDeleteCard = ({ onConfirm }: { onConfirm: () => void }) => {
	return (
		<Grid.Container
			css={{
				borderRadius: '14px',
				padding: '0.75rem',
				maxWidth: '330px',
			}}
		>
			<Row justify='center' align='center'>
				<Text b>Confirm</Text>
			</Row>
			<Row>
				<Text>
					Are you sure you want to delete this category? By doing this, you will
					not be able to recover the data.
				</Text>
			</Row>
			<Grid.Container justify='space-between' alignContent='center'>
				<Grid>

				</Grid>
				<Grid>
					<Button
						size='sm'
						color='error'
						onClick={onConfirm}
						shadow
					>
						Delete
					</Button>
				</Grid>
			</Grid.Container>
		</Grid.Container>
	)
}

function CategoriesView () {
	const { toggle: toggleNavBar } = useContext(NavbarContext);
	const [categories] = useFetchCategories();

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

				<h3 style={{ margin: 0 }}>Categories</h3>

				<button style={{ background: 'none', border: 'none', fontSize: 24, paddingRight: 0 }}>
					<SearchOutlined />
				</button>
			</Row>
			<br />

			<Button
				icon={<PlusOutlined />}
				onClick={() => ModalOpener$.next('CATEGORY')}
			>
				Create Category
			</Button>
			<br />

			<Table css={{ background: '#fff' }}>
				<Table.Header>
					<Table.Column>Name (Spanish)</Table.Column>
					<Table.Column>Name (English)</Table.Column>
					<Table.Column align='center'>Options</Table.Column>
				</Table.Header>
				<Table.Body items={categories}>
					{({ id, name }) => (
						<Table.Row key={id}>
							<Table.Cell>{name.spanish}</Table.Cell>
							<Table.Cell>{name.english}</Table.Cell>
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
											<ConfirmDeleteCard onConfirm={() => deleteCategory(id!)} />
										</Popover.Content>
									</Popover>
								</Row>
							</Table.Cell>
						</Table.Row>
					)}
				</Table.Body>
			</Table>

			<ModalCategory />
		</>
	)
}

export default CategoriesView;
