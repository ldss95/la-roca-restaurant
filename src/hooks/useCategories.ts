import { useState, useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import Swal from 'sweetalert2';

import { createCategory } from '@/services/categories';
import { CategoryProps } from '@/types/category';
import { db } from '@/firebase';

export const useCreateCategory = (): [(category: CategoryProps) => Promise<void>, boolean] => {
	const [loading, setLoading] = useState(false);

	async function handleCreateCategory(category: CategoryProps) {
		try {
			setLoading(true);
			await createCategory(category);
		} catch (error) {
			Swal.fire('Oops!', 'something went wrong, please try again later', 'error');
		} finally {
			setLoading(false);
		}
	}

	return [handleCreateCategory, loading];
}

export const useFetchCategories = (): [CategoryProps[], boolean] => {
	const [loading, setLoading] = useState(true);
	const [categories, setCategories] = useState<CategoryProps[]>([]);

	useEffect(() => {
		const ref = collection(db, 'categories');
		const q = query(ref, orderBy('order', 'asc'))
		const unsubscribe = onSnapshot(q, (snap) => {
			if (snap.empty) {
				return setLoading(false);
			}

			setLoading(true);
			const categories = snap.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			})) as CategoryProps[];

			setCategories(categories);
			setLoading(false);
		});


		return () => unsubscribe();
	}, []);

	return [categories, loading];
}
