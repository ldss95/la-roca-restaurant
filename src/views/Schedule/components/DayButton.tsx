import { memo } from 'react';
import { Text } from '@nextui-org/react';

import { lightPrimaryColor, primaryColor } from '@/contants/colors';

interface DayButtonProps {
	day: string;
	isActive: boolean;
	onClick: () => void;
}

const DayButton = ({ day, isActive, onClick }: DayButtonProps) => {
	return (
		<div
			onClick={onClick}
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: 30,
				height: 30,
				borderRadius: 15,
				...(isActive && {
					background: primaryColor
				}),
				...(!isActive && {
					border: `solid 1px ${lightPrimaryColor}`
				}),
				cursor: 'pointer'
			}}
		>
			<Text>{day}</Text>
		</div>
	)
}

export default memo(DayButton);
