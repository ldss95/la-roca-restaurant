export interface ScheduleProps {
	top: {
		openAt: string;
		closeAt: string;
		days: DayIndex[];
	};
	bottom: {
		openAt: string;
		closeAt: string;
		days: DayIndex[];
	};
}

export type DayIndex = 0 |1 | 2 | 3 | 4 | 5 | 6;
