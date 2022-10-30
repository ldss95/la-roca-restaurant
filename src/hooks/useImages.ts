import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

import { db } from '@/firebase';
import { DBImageProps } from '@/types/image';
import { uploadImage } from '@/services/images';

export const useFetchImages = (): [DBImageProps[], boolean] => {
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState<DBImageProps[]>([]);

	useEffect(() => {
		const ref = collection(db, 'images');
		const q = query(ref, orderBy('order', 'asc'));
		const unsubscribe = onSnapshot(q, (snap) => {
			if (snap.empty) {
				return setLoading(false);
			}

			setLoading(true);
			const images = snap.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			})) as DBImageProps[];

			setImages(images);
			setLoading(false);
		});


		return () => unsubscribe();
	}, []);

	return [images, loading];
}

interface UploadImageProps {
	id?: string;
	file: File;
	order?: number;
	section?: 'about_us' | 'main';
	path: string;
}

export const useUploadImage = (): [(data: UploadImageProps) => Promise<void>, boolean] => {
	const [loading, setLoading] = useState(false);

	async function handleUploadImage({ file, id, path }: UploadImageProps) {
		try {
			setLoading(true);
			const url = await uploadImage(file, path);
			await updateDoc(doc(collection(db, 'images'), id), {
				url
			});
		} catch (error) {
			Swal.fire(
				'Error',
				'Se ha producido un error cargando la nueva imagen, por favor intentelo mas tarde',
				'error'
			)
			console.error(error)
		} finally {
			setLoading(false);
		}
	}

	return [handleUploadImage, loading];
}
