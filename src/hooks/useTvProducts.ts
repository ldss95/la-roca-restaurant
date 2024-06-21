import { useState, useEffect } from 'react';
import { collection, DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';

import { db } from '@/firebase';
import { TvProductProps } from '@/types/tvProduct';
import { TvImageProps } from '@/types/tvImage';
import * as placeholders from '@/constants/placeholders';

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
					url: placeholders.imageUrl
				}]
		);
		setLoading(false);
	}

	return [images, loading];
}
