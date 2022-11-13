import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

import { db } from '@/firebase';

export async function updateTvOption(id: string, name: string): Promise<void> {
	const ref = doc(collection(db, 'tvProducts'), id);
	await updateDoc(ref, { name });
}

export async function removeTvImage(id: string): Promise<void> {
	const ref = doc(collection(db, 'tvImages'), id);
	await deleteDoc(ref);
}

export async function addTvImage(url: string): Promise<void> {
	await addDoc(collection(db, 'tvImages'), { url })
}
