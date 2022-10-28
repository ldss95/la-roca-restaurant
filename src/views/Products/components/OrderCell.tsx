import { memo } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Button, Grid, Spacer, Tooltip } from '@nextui-org/react';
import { changeProductOrder } from '@/services/products';

interface OrderCellProps {
	id: string;
	order: number;
	categorySelected: string | null;
}

const OrderCell = ({ id, order, categorySelected }: OrderCellProps) => {

	return (
		<Grid.Container justify='center'>
			<Tooltip content='Move Up'>
				<Button
					icon={<ArrowUpOutlined />}
					onClick={() => changeProductOrder(id, 'up', order, categorySelected!)}
					disabled={!categorySelected}
					bordered
					auto
				/>
			</Tooltip>

			<Spacer />

			<Tooltip content='Move Down'>
				<Button
					icon={<ArrowDownOutlined />}
					onClick={() => changeProductOrder(id, 'down', order, categorySelected!)}
					disabled={!categorySelected}
					bordered
					auto
				/>
			</Tooltip>
		</Grid.Container>
	);
}

export default memo(OrderCell);
