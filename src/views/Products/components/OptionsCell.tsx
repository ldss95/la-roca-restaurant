import { memo } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Grid, Popover, Spacer, Tooltip } from '@nextui-org/react';

import { ModalOpener$ } from '@/utils/helpers';
import ConfirmDeleteCard from '@/components/ConfirmDeleteCard';
import { deleteProduct } from '@/services/products';
import { ProductProps } from '@/types/product';

const OrderCell = ({ id, name, category, order, price }: ProductProps) => {

	return (
		<Grid.Container justify='center'>
			<Tooltip content='Edit'>
				<Button
					icon={<EditOutlined />}
					onClick={() => {
						ModalOpener$.next({
							name: 'PRODUCT',
							data: {
								id,
								name,
								category,
								price,
								order
							}
						});
					}}
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
		</Grid.Container>
	);
}

export default memo(OrderCell);
