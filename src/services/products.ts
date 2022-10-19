import { addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';

import { db } from '@/firebase';
import { ProductProps } from '@/types/product';

export async function createProduct(product: ProductProps): Promise<void> {
	await addDoc(collection(db, 'products'), product);
}

export async function updateProduct(id: string, product: ProductProps): Promise<void> {
	const ref = doc(db, 'products', id);
	await updateDoc(ref, product as any);
}

export async function deleteProduct(id: string): Promise<void> {
	const ref = doc(db, 'products', id);
	await deleteDoc(ref);
}
