import { redColor } from '@/contants/colors';
import { Button, Text } from '@nextui-org/react';
import { memo } from 'react'

const ConfirmDeleteCard = ({ onConfirm, message }: { onConfirm: () => void; message: string; }) => {
	return (
		<div
			style={{
				borderRadius: '14px',
				padding: '0.75rem',
				maxWidth: '330px',
			}}
		>
			<Text b>Confirmación</Text>
			<Text css={{ textAlign: 'center' }}>{message}</Text>

			<Button
				size='sm'
				css={{ background: redColor, marginTop: 15, margin: '15px auto 0' }}
				onClick={onConfirm}
			>
				Eliminar
			</Button>
		</div>
	)
}

export default memo(ConfirmDeleteCard);
