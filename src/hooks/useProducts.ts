import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { ProductProps } from '@/types/product';
import { createProduct } from '@/services/products';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

export const useCreateProduct = (): [(product: ProductProps) => Promise<void>, boolean] => {
	const [loading, setLoading] = useState(false);

	async function handleCreateProduct(product: ProductProps) {
		try {
			setLoading(true);
			await createProduct(product);
		} catch (error) {
			Swal.fire('Oops!', 'something went wrong, please try again later', 'error');
		} finally {
			setLoading(false);
		}
	}

	return [handleCreateProduct, loading];
}

export const useFetchProducts = (): [ProductProps[], boolean] => {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState<ProductProps[]>([]);

	useEffect(() => {
		const ref = collection(db, 'products');
		const unsubscribe = onSnapshot(ref, (snap) => {
			if (snap.empty) {
				return setLoading(false);
			}

			setLoading(true);
			const products = snap.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			})) as ProductProps[];

			setProducts(products);
			setLoading(false);
		});


		return () => unsubscribe();
	}, []);

	return [products, loading];
}
