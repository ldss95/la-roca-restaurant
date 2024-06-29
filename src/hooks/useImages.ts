import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Swal from 'sweetalert2';

import { db } from '@/firebase';
import { DBImageProps } from '@/types/image';
import { addNewImage, removeImage, updateImage, uploadImage } from '@/services/images';
import { SectionType } from '@/types/section';

const defaultImages: DBImageProps[] = [
	{
		"section": "about_us",
		"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FIMG-20240103-WA0022.jpg?alt=media&token=c6f69167-e0f0-405e-9c7c-63ffa60cfae6",
		"order": 1,
		"id": "fkES0czK78rquV44eL8v"
	},
	{
		"section": "contact",
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS08757-Compressed.jpg",
		"order": 1,
		"id": "j3ua8YTze8WMFqAwnqgd"
	},
	{
		"order": 2,
		"section": "about_us",
		"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FIMG-20240103-WA0030.jpg?alt=media&token=0c07b846-d9d2-4840-bd42-6830eb08f5be",
		"id": "b5yo8TnQbCTwQun3QyoY"
	},
	{
		"order": 3,
		"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FSobre%20nosotros%20Ene%203.jpg?alt=media&token=c3159b65-01a8-4d52-bb84-2c932e37c658",
		"section": "about_us",
		"id": "2VaqNG7q9VCEOsSUzFfz"
	},
	{
		"section": "about_us",
		"order": 4,
		"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FIMG-20240529-WA0087.jpg?alt=media&token=86f9011f-a8ba-4a1c-8e88-29c802ab87aa",
		"id": "2xmYaBm9AIeUQAoUJuwZ"
	},
	{
		"section": "about_us",
		"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FNosotros%2021%20Jun%202024.jpg?alt=media&token=9e1865b7-c1e8-4458-b9ef-2e7d73483dc1",
		"order": 5,
		"id": "13hjDJQe1sZKFMhkyd5J"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/20240621_112240-Compressed.jpg",
		"order": 6,
		"section": "about_us",
		"id": "zkBjs2Ljy14DflLOTn9e"
	},
	{
		"order": 11,
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07200-Compressed.jpg",
		"section": "main",
		"id": "rMTzW7ZUwNdL0Oig7Z4J"
	},
	{
		"section": "about_us",
		"order": 11,
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/About%20us%20APS07429-Compressed.jpg",
		"id": "xMC6WNjCDfSORojXu3Zq"
	},
	{
		"order": 12,
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/20240621_112240-Compressed.jpg",
		"section": "about_us",
		"id": "VtxRSSVmPZKUdfF8i8Pn"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/20240621_112240-Compressed.jpg",
		"order": 13,
		"section": "about_us",
		"id": "9tgxYdcAHFFjLsPkfgHO"
	},
	{
		"section": "about_us",
		"order": 14,
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/20240621_112240-Compressed.jpg",
		"id": "CqTeVA2vIL2CKUiiYCsI"
	},
	{
		"section": "main",
		"order": 14,
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07263-Compressed.jpg",
		"id": "Mt3DE8VpPifsQsE11QTV"
	},
	{
		"order": 15,
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07183-Compressed.jpg",
		"section": "main",
		"id": "5R0sY2fbVqbhcuRekYSW"
	},
	{
		"section": "about_us",
		"order": 15,
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/20240621_112240-Compressed.jpg",
		"id": "pfbjsfUD0dnH4ItrYnMh"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07167-Compressed.jpg",
		"order": 16,
		"section": "main",
		"id": "8iPH8h4Av4hRAQmLiHCJ"
	},
	{
		"section": "main",
		"order": 17,
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07151-Compressed.jpg",
		"id": "O3u9GWW56Gql0PQcbcDp"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07325-Compressed.jpg",
		"order": 18,
		"section": "main",
		"id": "xKpFiO5dzKgA3rUstPdt"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07340-Compressed.jpg",
		"order": 19,
		"section": "main",
		"id": "SM41RXcfvducdtOEWn8l"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07121-Compressed.jpg",
		"order": 20,
		"section": "main",
		"id": "9cl2g0rLHAbRAfEwYpKd"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07172-Compressed.jpg",
		"section": "main",
		"order": 21,
		"id": "pnbDiWCIJOB4Mlh76Xps"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07238-Compressed.jpg",
		"order": 22,
		"section": "main",
		"id": "rvFbnS8stmW0TYb4ZAOs"
	},
	{
		"section": "main",
		"order": 23,
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS08821%201982x2640-Compressed.jpg",
		"id": "8x8XIndf4Ag6nNnkAX2y"
	},
	{
		"order": 24,
		"section": "main",
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07160-Compressed.jpg",
		"id": "u7A66nNzdNG4IHjn5Aw2"
	},
	{
		"order": 25,
		"section": "main",
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07278-Compressed.jpg",
		"id": "ZzJYlgRiRKruiNQJLVaX"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07243-Compressed.jpg",
		"section": "main",
		"order": 26,
		"id": "ASEowni75tSFZsmoZkrT"
	},
	{
		"order": 27,
		"section": "main",
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS07139-Compressed.jpg",
		"id": "CMzqWOtMDCsUbFWXUAu2"
	},
	{
		"url": "https://la-roca-restaurant.nyc3.cdn.digitaloceanspaces.com/APS08822-Compressed.jpg",
		"section": "main",
		"order": 28,
		"id": "elVn5V53gdGnIxYi4X7h"
	}
];

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
