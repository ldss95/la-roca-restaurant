import { Button, Grid, Row, Text } from '@nextui-org/react';
import { memo } from 'react'

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

export default memo(ConfirmDeleteCard);
