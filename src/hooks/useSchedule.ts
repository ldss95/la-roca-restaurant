import { useEffect, useState } from "react";
import {
	DocumentData,
	FirestoreError,
	QuerySnapshot,
	collection,
	onSnapshot
} from "firebase/firestore";

import { ScheduleProps } from "@/types/schedule";
import { db } from "@/firebase";
import { updateSchedule } from "@/services/schedule";

export const useGetSchedule = (): [ScheduleProps | null, boolean, FirestoreError | null] => {
	const [schedule, setSchedule] = useState<ScheduleProps | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<FirestoreError | null>(null);

	useEffect(() => {
		const ref = collection(db, 'schedule');
		const unsubscribe = onSnapshot(ref, handleScheduleChanges, setError);
		return () => unsubscribe();
	}, []);

	function handleScheduleChanges(snap: QuerySnapshot<DocumentData>) {
		const [a, b] = snap.docs;

		setSchedule({
			[a.id]: a.data(),
			[b.id]: b.data()
		} as any);
		setLoading(false);
	}

	return [schedule, loading, error]
}

type UseUpdateScheduleType = [
	(schedule: ScheduleProps, onDone?: () => void) => void,
	boolean,
	FirestoreError | null
];

export const useUpdateSchedule = (): UseUpdateScheduleType => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<FirestoreError | null>(null);

	async function handleUpdate(schedule: ScheduleProps, onDone?: () => void) {
		try {
			setLoading(true);
			setError(null);
			await updateSchedule(schedule);
			onDone && onDone();
		} catch (error) {

		} finally {
			setLoading(false);
		}
	}

	return [handleUpdate, loading, error]
}

