import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '@/firebase';
import { LinksProps } from '@/types/links';

export const useFetchLinks = (): [LinksProps, boolean] => {
	const [links, setLinks] = useState<LinksProps>({} as LinksProps);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'links'), (snap) => {
			if (snap.empty) {
				return setLoading(false);
			}

			setLoading(true);

			const links: any = {};

			snap.docs.forEach(doc => {
				links[doc.id] = doc.data();
			});

			setLinks(links);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	return [links, loading];
}
