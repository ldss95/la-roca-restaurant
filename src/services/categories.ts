import { addDoc, collection, updateDoc, doc, deleteDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';

import { db } from '@/firebase';
import { CategoryProps } from '@/types/category';

export async function createCategory(category: CategoryProps): Promise<void> {
	let order = 1;
	const q = query(
		collection(db, 'categories'),
		orderBy('order', 'desc'),
		limit(1)
	);
	const snap = await getDocs(q);
	if (!snap.empty) {
		const [doc] = snap.docs;
		const data = doc.data();
		order = data.order + 1;
	}
	await addDoc(collection(db, 'categories'), {
		...category,
		order
	});
}

export async function updateCategory(id: string, category: CategoryProps): Promise<void> {
	const ref = doc(db, 'categories', id);
	await updateDoc(ref, category as any);
}

export async function deleteCategory(id: string): Promise<void> {
	const ref = doc(db, 'categories', id);
	await deleteDoc(ref);
}

export async function changeCategoryOrder(id: string, type: 'up' | 'down', currentOrder: number) {
	if (type === 'up') {
		const categories = collection(db, 'categories');
		const q = query(
			categories,
			where('order', '==', currentOrder - 1),
		);
		const beforeDocs = await getDocs(q);

		if (beforeDocs.empty) {
			return;
		}

		const [beforeDoc] = beforeDocs.docs;
		await updateDoc(doc(collection(db, 'categories'), beforeDoc.id), {
			order: currentOrder
		});

		await updateDoc(doc(collection(db, 'categories'), id), {
			order: currentOrder - 1
		});
	}

	if (type === 'down') {
		const products = collection(db, 'categories');
		const q = query(
			products,
			where('order', '==', currentOrder + 1),
		);
		const afterDocs = await getDocs(q);

		if (afterDocs.empty) {
			return;
		}

		const [afterDoc] = afterDocs.docs;
		await updateDoc(doc(collection(db, 'categories'), afterDoc.id), {
			order: currentOrder
		});

		await updateDoc(doc(collection(db, 'categories'), id), {
			order: currentOrder + 1
		});
	}
}

