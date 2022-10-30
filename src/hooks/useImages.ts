import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Swal from 'sweetalert2';

import { db } from '@/firebase';
import { DBImageProps } from '@/types/image';
import { addNewImage, removeImage, updateImage, uploadImage } from '@/services/images';
import { SectionType } from '@/types/section';

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
	section?: SectionType;
	path: string;
}

export const useUploadImage = (): [(data: UploadImageProps) => Promise<void>, boolean] => {
	const [loading, setLoading] = useState(false);

	async function handleUploadImage({ file, id, path, section }: UploadImageProps) {
		try {
			setLoading(true);
			const url = await uploadImage(file, path);

			if (id) {
				await updateImage(id, url);
			} else {
				await addNewImage(url, section!);
			}
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

export const useDeleteImage = (): [(id: string) => Promise<void>, boolean] => {
	const [loading, setLoading] = useState(false);

	async function handleDeleteImage(id: string) {
		try {
			setLoading(true);
			await removeImage(id);
		} catch (error) {
			Swal.fire(
				'Error',
				'No se ha podido eliminar la imagen, por favor intentelo mas tarde',
				'error'
			);
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return [handleDeleteImage, loading];
}
