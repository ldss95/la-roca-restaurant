import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from '@/firebase';

export async function uploadImage(image: File, path: string): Promise<string> {
	const fileRef = ref(storage, `${path}/${image.name}`);
	await uploadBytes(fileRef, image);
	const url = await getDownloadURL(fileRef);
	return url;
}
