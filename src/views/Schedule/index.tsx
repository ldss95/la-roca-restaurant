import { useEffect, useState } from 'react';
import { Button, Grid, Card, Text, Input, Loading as LoadingIndicator } from '@nextui-org/react';

import ViewHeader from '@/components/ViewHeader';
import { useGetSchedule, useUpdateSchedule } from '@/hooks/useSchedule';
import Loading from '../Loading';
import { DayIndex } from '@/types/schedule';
import DayButton from './components/DayButton';
import RenderIf from '@/components/RenderIf';
import Swal from 'sweetalert2';

const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

function ScheduleView () {
	const [schedule, loading, error] = useGetSchedule();
	const [top, setTop] = useState<{ days: DayIndex[]; openAt: string; closeAt: string; }>({} as any);
	const [bottom, setBottom] = useState<{ days: DayIndex[]; openAt: string; closeAt: string; }>({} as any);
	const [update, updating] = useUpdateSchedule();

	useEffect(() => {
		if (schedule) {
			setTop(schedule.top);
			setBottom(schedule.bottom);
		}
	}, [schedule]);

	if (loading) {
		return <Loading />
	}

	return (
		<>
			<ViewHeader title='Horario' />
			<br />

			<Grid.Container gap={2}>
				<Grid xs={12} sm={6} md={4} lg={3}>
					<Card  css={{ w: '100%' }}>
						<Card.Header>
							<Text b>Superior</Text>
						</Card.Header>
						<Card.Body>
							<div style={{ display: 'flex', justifyContent: 'space-around', gap: 10 }}>
								{days.map((day, index) => (
									<DayButton
										key={'top-day-' + day + '-' + index}
										day={day}
										isActive={top?.days?.includes(index as DayIndex) || false}
										onClick={() => setTop({
											...top,
											days: (top?.days?.includes(index as DayIndex) || false)
												? top.days.filter(day => day !== index)
												: [...top?.days, index].sort() as DayIndex[],
										})}
									/>
								))}
							</div>
							<br />

							<div>
								<Grid.Container gap={2}>
									<Grid xs={12} md={6}>
										<Input
											label='Hora de apertura'
											onChange={({ target }) => setTop({ ...top, openAt: target.value })}
											type='time'
											css={{ width: '100%' }}
											shadow={false}
											initialValue={schedule?.top.openAt}
										/>
									</Grid>

									<Grid xs={12} md={6}>
										<Input
											label='Hora de cierre'
											onChange={({ target }) => setTop({ ...top, closeAt: target.value })}
											type='time'
											css={{ width: '100%' }}
											shadow={false}
											initialValue={schedule?.top.closeAt}
										/>
									</Grid>

									<Grid xs={12}>
										<Button
											style={{ width: '100%' }}
											disabled={updating}
											onClick={() => update({ top, bottom: schedule?.bottom! }, () => Swal.fire('Listo!', 'Horario guardado con exito', 'success'))}
										>
											<RenderIf condition={updating}>
												<LoadingIndicator color='currentColor' size='sm' />
											</RenderIf>

											<RenderIf condition={!updating}>
												Guardar
											</RenderIf>
										</Button>
									</Grid>
								</Grid.Container>
							</div>
						</Card.Body>
					</Card>
				</Grid>

				<Grid xs={12} sm={6} md={4} lg={3}>
					<Card  css={{ w: '100%' }}>
						<Card.Header>
							<Text b>Inferior</Text>
						</Card.Header>
						<Card.Body>
							<div style={{ display: 'flex', justifyContent: 'space-around', gap: 10 }}>
								{days.map((day, index) => (
									<DayButton
										key={'bottom-day-' + day + '-' + index}
										day={day}
										isActive={bottom?.days?.includes(index as DayIndex) || false}
										onClick={() => setBottom({
											...bottom,
											days: (bottom?.days?.includes(index as DayIndex) || false)
												? bottom.days.filter(day => day !== index)
												: [...bottom?.days, index].sort() as DayIndex[],
										})}
									/>
								))}
							</div>
							<br />

							<div>
								<Grid.Container gap={2}>
									<Grid xs={12} md={6}>
										<Input
											label='Hora de apertura'
											onChange={({ target }) => setBottom({ ...bottom, openAt: target.value })}
											type='time'
											css={{ width: '100%' }}
											shadow={false}
											initialValue={schedule?.bottom.openAt}
										/>
									</Grid>

									<Grid xs={12} md={6}>
										<Input
											label='Hora de cierre'
											onChange={({ target }) => setBottom({ ...bottom, closeAt: target.value })}
											type='time'
											css={{ width: '100%' }}
											shadow={false}
											initialValue={schedule?.bottom.closeAt}
										/>
									</Grid>

									<Grid xs={12}>
										<Button
											style={{ width: '100%' }}
											disabled={updating}
											onClick={() => update({ top: schedule?.top!, bottom }, () => Swal.fire('Listo!', 'Horario guardado con exito', 'success'))}
										>
											<RenderIf condition={updating}>
												<LoadingIndicator color='currentColor' size='sm' />
											</RenderIf>

											<RenderIf condition={!updating}>
												Guardar
											</RenderIf>
										</Button>
									</Grid>
								</Grid.Container>
							</div>

						</Card.Body>
					</Card>
				</Grid>
			</Grid.Container>
		</>
	)
}

export default ScheduleView;
