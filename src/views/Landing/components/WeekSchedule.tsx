import { memo, useContext } from 'react';
import { Text } from '@nextui-org/react';
import moment from 'moment';

import LanguageContext from '@/context/language/context';
import { lightGreyColor, redColor, secondaryColor } from '@/contants/colors';
import { sizeCalc } from '@/utils/helpers';
import { DayIndex } from '@/types/schedule';

const days = {
	en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	es: ['D', 'L', 'M', 'X', 'J', 'V', 'S']
}

interface WeekScheduleProps {
	openDays: DayIndex[],
	openAt: string,
	closeAt: string
}

const WeekSchedule = ({ openDays, openAt, closeAt }: WeekScheduleProps) => {
	const { lang } = useContext(LanguageContext);

	return (
		<div style={{ maxWidth: sizeCalc(190, 277) }}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				{days[lang].map((day, index) => (
					<Text
						css={{
							fontSize: sizeCalc(18, 24),
							fontFamily: 'Bitter',
							fontWeight: 'bold',
							color: lightGreyColor,
							...(openDays.includes(index as DayIndex) && {
								color: redColor
							})
						}}
						key={'day-' + index + Math.random()}
					>
						{day}
					</Text>
				))}
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					fontSize: sizeCalc(21, 30),
					fontFamily: 'Bitter'
				}}
			>
				<Text css={{ color: secondaryColor, fontWeight: 'bold', fontSize: 'inherit', fontFamily: 'inherit' }}>{moment('2022-01-01 ' + openAt).format('hh:mm')}</Text>
				<Text css={{ color: redColor, fontSize: 'inherit', fontFamily: 'inherit' }}>{moment('2022-01-01 ' + openAt).format('A')}</Text>

				-

				<Text css={{ color: secondaryColor, fontWeight: 'bold', fontSize: 'inherit', fontFamily: 'inherit' }}>{moment('2022-01-01 ' + closeAt).format('hh:mm')}</Text>
				<Text css={{ color: redColor, fontSize: 'inherit', fontFamily: 'inherit' }}>{moment('2022-01-01 ' + closeAt).format('A')}</Text>
			</div>
		</div>
	)
}

export default memo(WeekSchedule);
