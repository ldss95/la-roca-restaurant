import { addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';

import { db } from '@/firebase';
import { CategoryProps } from '@/types/category';

export async function createCategory(category: CategoryProps): Promise<void> {
	await addDoc(collection(db, 'categories'), category);
}

export async function updateCategory(id: string, category: CategoryProps): Promise<void> {
	const ref = doc(db, 'categories', id);
	await updateDoc(ref, category as any);
}

export async function deleteCategory(id: string): Promise<void> {
	const ref = doc(db, 'categories', id);
	await deleteDoc(ref);
}
