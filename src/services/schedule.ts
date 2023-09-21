import { collection, doc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase";
import { ScheduleProps } from "@/types/schedule";

export async function updateSchedule(schedule: ScheduleProps) {
	const ref = collection(db, 'schedule');
	await updateDoc(doc(ref, 'top'), schedule.top);
	await updateDoc(doc(ref, 'bottom'), schedule.bottom);
}
