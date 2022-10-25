import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

import { db } from '@/firebase';
import { DBImageProps } from '@/types/image';

export const useFetchImages = (): [DBImageProps[], boolean] => {
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState<DBImageProps[]>([]);

	useEffect(() => {
		const ref = collection(db, 'images');
		const q = query(ref, orderBy('order', 'asc'));
		const unsubscribe = onSnapshot(q, (snap) => {
			if (snap.empty) {
				return setLoading(false);
			}

			setLoading(true);
			const images = snap.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			})) as DBImageProps[];

			setImages(images);
			setLoading(false);
		});


		return () => unsubscribe();
	}, []);

	return [images, loading];
}
