import { addDoc, collection, updateDoc, doc, deleteDoc, query, where, getDoc, getDocs, orderBy, limit } from 'firebase/firestore';

import { db } from '@/firebase';
import { ProductProps } from '@/types/product';

export async function createProduct(product: ProductProps): Promise<void> {
	let order = 1;
	const q = query(
		collection(db, 'products'),
		where('category', '==', product.category),
		orderBy('order', 'desc'),
		limit(1)
	);
	const snap = await getDocs(q);
	if (!snap.empty) {
		const [doc] = snap.docs;
		const data = doc.data();
		order = data.order + 1;
	}

	await addDoc(collection(db, 'products'), {
		...product,
		order
	});
}

export async function updateProduct(id: string, product: ProductProps): Promise<void> {
	const ref = doc(db, 'products', id);
	await updateDoc(ref, product as any);
}

export async function deleteProduct(id: string): Promise<void> {
	const ref = doc(db, 'products', id);
	await deleteDoc(ref);
}

export async function changeProductOrder(id: string, type: 'up' | 'down', currentOrder: number, category: string) {
	if (type === 'up') {
		const products = collection(db, 'products');
		const q = query(
			products,
			where('order', '==', currentOrder - 1),
			where('category', '==', category)
		);
		const beforeDocs = await getDocs(q);

		if (beforeDocs.empty) {
			return;
		}

		const [beforeDoc] = beforeDocs.docs;
		await updateDoc(doc(collection(db, 'products'), beforeDoc.id), {
			order: currentOrder
		});

		await updateDoc(doc(collection(db, 'products'), id), {
			order: currentOrder - 1
		});
	}

	if (type === 'down') {
		const products = collection(db, 'products');
		const q = query(
			products,
			where('order', '==', currentOrder + 1),
			where('category', '==', category)
		);
		const afterDocs = await getDocs(q);

		if (afterDocs.empty) {
			return;
		}

		const [afterDoc] = afterDocs.docs;
		await updateDoc(doc(collection(db, 'products'), afterDoc.id), {
			order: currentOrder
		});

		await updateDoc(doc(collection(db, 'products'), id), {
			order: currentOrder + 1
		});
	}
}
