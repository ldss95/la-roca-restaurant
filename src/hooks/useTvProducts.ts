import { useState, useEffect } from 'react';
import { collection, DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';

import { TvProductProps } from '@/types/tvProduct';
import { db } from '@/firebase';
import { TvImageProps } from '@/types/tvImage';

export const useFetchAllTvProducts = (): [TvProductProps[], boolean]  => {
	const [products, setProducts] = useState<TvProductProps[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'tvProducts'), handleProductsUpdate);

		return () => unsubscribe();
	}, []);

	function handleProductsUpdate(snap: QuerySnapshot<DocumentData>) {
		setLoading(true);
		const data = snap.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data()
			} as TvProductProps;
		});
		setProducts(data);
		setLoading(false);
	}

	return [products, loading];
}

export const useFetchAllTvImages = (): [TvImageProps[], boolean]  => {
	const [images, setImages] = useState<TvImageProps[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, 'tvImages'), handleImagesUpdate);

		return () => unsubscribe();
	}, []);

	function handleImagesUpdate(snap: QuerySnapshot<DocumentData>) {
		setLoading(true);
		const data = snap.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data()
			} as TvImageProps;
		});
		setImages(
			(data.length) > 0
				? data
				: [{
					id: 'placeholder',
					url: 'https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Ftv%2FCucharas%20de%20colores.jpg?alt=media&token=12ad61c5-88df-48dd-971a-69de33f25331'
				}]
		);
		setLoading(false);
	}

	return [images, loading];
}
