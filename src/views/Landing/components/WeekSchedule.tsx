import { memo, useContext } from 'react';
import { Text } from '@nextui-org/react';
import moment from 'moment';

import LanguageContext from '@/context/language/context';

const days = {
	en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	es: ['D', 'L', 'M', 'X', 'J', 'V', 'S']
}

type DayIndex = 0 |1 | 2 | 3 | 4 | 5 | 6;

interface WeekScheduleProps {
	openDays: DayIndex[],
	openAt: string,
	closeAt: string
}

const WeekSchedule = ({ openDays, openAt, closeAt }: WeekScheduleProps) => {
	const { lang } = useContext(LanguageContext);

	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
				{days[lang].map((day, index) => (
					<Text
						css={{
							fontSize: 24,
							fontFamily: 'Bitter',
							fontWeight: 'bold',
							color: '#D9D9D9',
							...(openDays.includes(index as DayIndex) && {
								color: '#EB2A00'
							})
						}}
						key={'day-' + index}
					>
						{day}
					</Text>
				))}
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Text css={{ color: '#500E00', fontSize: 30, fontFamily: 'Bitter', fontWeight: 'bold' }}>{moment('2022-01-01 ' + openAt).format('hh:mm')}</Text>
				<Text css={{ color: '#EB2A00', fontSize: 30, fontFamily: 'Bitter' }}>{moment('2022-01-01 ' + openAt).format('A')}</Text>

				-

				<Text css={{ color: '#500E00', fontSize: 30, fontFamily: 'Bitter', fontWeight: 'bold' }}>{moment('2022-01-01 ' + closeAt).format('hh:mm')}</Text>
				<Text css={{ color: '#EB2A00', fontSize: 30, fontFamily: 'Bitter' }}>{moment('2022-01-01 ' + closeAt).format('A')}</Text>
			</div>
		</>
	)
}

export default memo(WeekSchedule);
