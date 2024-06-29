import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	updateDoc,
	where
} from 'firebase/firestore';

import { db, app } from '@/firebase';

export async function uploadImage(image: File, path: string): Promise<string> {
	const storage = getStorage(app);
	const fileRef = ref(storage, `${path}/${image.name}`);
	await uploadBytes(fileRef, image);
	const url = await getDownloadURL(fileRef);
	return url;
}

export async function removeImage(id: string): Promise<void> {
	await deleteDoc(doc(collection(db, 'images'), id));
}

export async function addNewImage(url: string, section: 'main' | 'about_us' | 'contact') {
	let order = 1;
	const q = query(
		collection(db, 'images'),
		where('section', '==', section),
		orderBy('order', 'desc'),
		limit(1)
	);
	const snap = await getDocs(q);
	if (!snap.empty) {
		const [doc] = snap.docs;
		const data = doc.data();
		order = data.order + 1;
	}

	await addDoc(collection(db, 'images'), {
		url,
		section,
		order
	});
}

export async function updateImage(id: string, url: string) {
	await updateDoc(doc(collection(db, 'images'), id), {
		url
	});
}
