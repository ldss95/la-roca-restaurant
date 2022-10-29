import { memo, useEffect, useState } from 'react';
import { Button, Grid, Modal, Popover, Spacer, Text } from '@nextui-org/react';
import { filter } from 'rxjs';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { ModalOpener$ } from '@/utils/helpers';
import ConfirmDeleteCard from '@/components/ConfirmDeleteCard';
import { CategoryProps } from '@/types/category';
import { changeCategoryOrder, deleteCategory } from '@/services/categories';

interface OptionProps {
	text: string;
	icon: any;
	color?: any
	onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
	disabled?: boolean;
}
const Option = ({ icon, text, onClick, color, disabled = false }: OptionProps) => (
	<Grid xs={6} justify='center' alignItems='center' direction='column'>
		<Button
			auto
			ghost
			rounded
			size='xl'
			color={color}
			onClick={onClick}
			disabled={disabled}
		>
			{icon}
		</Button>
		<Text css={{ opacity: 0.6 }}>{text}</Text>
	</Grid>
)

const ModalCategoryOptions = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [category, setCategory] = useState<CategoryProps>({} as CategoryProps);

	useEffect(() => {
		const listener = ModalOpener$
			.pipe(filter(({ name }) => name === 'CATEGORY_OPTIONS'))
			.subscribe(({ category }) => {
				setCategory(category!);
				setIsOpen(true);
			});

		return () => listener.unsubscribe();
	}, []);

	return (
		<Modal
			open={isOpen}
			onClose={() => setIsOpen(false)}
			width='90%'
			css={{ maxWidth: 450 }}
			autoMargin
			closeButton
			blur
		>
			<Modal.Header>
				<Text h4>{category?.name?.es}</Text>
			</Modal.Header>
			<Modal.Body>
				<Spacer />
				<Grid.Container>
					<Option
						icon={<ArrowUpOutlined style={{ fontSize: 24 }} />}
						text='Mover Arriba'
						onClick={() => {
							changeCategoryOrder(category?.id!, 'up', category?.order!);
							setIsOpen(false);
						}}
						disabled={category.order === 1}
					/>

					<Option
						icon={<EditOutlined style={{ fontSize: 24 }} />}
						text='Modificar'
						onClick={() => {
							ModalOpener$.next({ name: 'CATEGORY', category });
							setIsOpen(false);
						}}
					/>
				</Grid.Container>

				<Spacer />

				<Grid.Container>
					<Option
						icon={<ArrowDownOutlined style={{ fontSize: 24 }} />}
						text='Move Abajo'
						onClick={() => {
							changeCategoryOrder(category?.id!, 'down', category?.order!);
							setIsOpen(false);
						}}
					/>

					<Grid xs={6} justify='center' alignItems='center' direction='column'>
						<Popover isBordered>
							<Popover.Trigger>
								<Button
									bordered
									rounded
									auto
									size='xl'
									color='error'
								>
									<DeleteOutlined />
								</Button>
							</Popover.Trigger>
							<Popover.Content>
								<ConfirmDeleteCard
									onConfirm={() => {
										deleteCategory(category.id!);
										setIsOpen(false);
									}}
									message='Estas seguro de eliminar esta categoria?'
								/>
							</Popover.Content>
						</Popover>
						<Text css={{ opacity: 0.6 }}>Eliminar</Text>
					</Grid>
				</Grid.Container>
				<Spacer />
			</Modal.Body>
		</Modal>
	);
}

export default memo(ModalCategoryOptions);
