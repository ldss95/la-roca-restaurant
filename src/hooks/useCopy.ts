import { useEffect, useState } from 'react';

import { CopyProps, LangProps } from '@/types/copy';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

export const useCopy = (): [CopyProps, boolean] => {
	const [loading, setLoading] = useState(true);
	const [copy, setCopy] = useState<CopyProps>({} as CopyProps);

	useEffect(() => {
		const ref = collection(db, 'copy');
		const unsubscribe = onSnapshot(ref, (snap) => {
			if (snap.empty) {
				return setLoading(false);
			}

			setLoading(true);
			const copy = {} as CopyProps;
			for (const item of snap.docs) {
				const key = item.id as 'en' | 'es';
				copy[key] = item.data() as LangProps;
			}
			setCopy(copy);
			setLoading(false);
		});


		return () => unsubscribe();
	}, []);

	return [copy, loading];
}
