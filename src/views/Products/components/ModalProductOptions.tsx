import { useEffect, useState } from 'react';
import { Button, Grid, Modal, Popover, Spacer, Text } from '@nextui-org/react';
import { filter } from 'rxjs';
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { ProductProps } from '@/types/product';
import { ModalOpener$ } from '@/utils/helpers';
import { changeProductOrder, deleteProduct } from '@/services/products';
import ConfirmDeleteCard from '@/components/ConfirmDeleteCard';

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

const ModalProductOptions = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [product, setProduct] = useState<ProductProps>({} as ProductProps);
	const [enableOrderChange, setEnableOrderChange] = useState(false);

	useEffect(() => {
		const listener = ModalOpener$
			.pipe(filter(({ name }) => name === 'PRODUCT_OPTIONS'))
			.subscribe(({ product, enableOrderChange }) => {
				setEnableOrderChange(enableOrderChange!);
				setProduct(product!);
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
				<Text h4>{product?.name?.es}</Text>
			</Modal.Header>
			<Modal.Body>
				<Spacer />
				<Grid.Container>
					<Option
						icon={<ArrowUpOutlined style={{ fontSize: 24 }} />}
						text='Mover Arriba'
						onClick={() => {
							changeProductOrder(product?.id!, 'up', product?.order, product?.category);
							setIsOpen(false);
						}}
						disabled={!enableOrderChange || product.order === 1}
					/>

					<Option
						icon={<EditOutlined style={{ fontSize: 24 }} />}
						text='Modificar'
						onClick={() => {
							ModalOpener$.next({ name: 'PRODUCT', product });
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
							changeProductOrder(product?.id!, 'down', product?.order, product?.category);
							setIsOpen(false);
						}}
						disabled={!enableOrderChange}
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
										deleteProduct(product.id!);
										setIsOpen(false);
									}}
									message='Estas seguro de eliminar este producto?'
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

export default ModalProductOptions;
