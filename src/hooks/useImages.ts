import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Swal from 'sweetalert2';

import { db } from '@/firebase';
import { DBImageProps } from '@/types/image';
import { addNewImage, removeImage, updateImage, uploadImage } from '@/services/images';
import { SectionType } from '@/types/section';

export const useFetchImages = (): [DBImageProps[], boolean] => {
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState<DBImageProps[]>([
		{
			"order": 1,
			"section": "about_us",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FIMG-20240103-WA0022.jpg?alt=media&token=c6f69167-e0f0-405e-9c7c-63ffa60cfae6",
			"id": "fkES0czK78rquV44eL8v"
		},
		{
			"section": "contact",
			"order": 1,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS08757-Compressed.jpg?alt=media&token=aadce7ca-9390-451a-a7a9-e624409081ef",
			"id": "j3ua8YTze8WMFqAwnqgd"
		},
		{
			"order": 2,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FIMG-20240103-WA0030.jpg?alt=media&token=0c07b846-d9d2-4840-bd42-6830eb08f5be",
			"section": "about_us",
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
			"order": 5,
			"section": "about_us",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FNosotros%2021%20Jun%202024.jpg?alt=media&token=9e1865b7-c1e8-4458-b9ef-2e7d73483dc1",
			"id": "13hjDJQe1sZKFMhkyd5J"
		},
		{
			"order": 6,
			"section": "about_us",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAcerca%20de%20nosotros%2020240621-Compressed.jpg?alt=media&token=bd069a71-664d-4365-a57a-8a34184b00b6",
			"id": "zkBjs2Ljy14DflLOTn9e"
		},
		{
			"section": "main",
			"order": 11,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07200-Compressed.jpg?alt=media&token=95c2f502-4841-4d67-9fc4-94aab2f084b6",
			"id": "rMTzW7ZUwNdL0Oig7Z4J"
		},
		{
			"order": 11,
			"section": "about_us",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAbout%20us%20APS07429-Compressed.jpg?alt=media&token=f4fd21fd-319b-497e-8ce4-617acc07d310",
			"id": "xMC6WNjCDfSORojXu3Zq"
		},
		{
			"section": "about_us",
			"order": 12,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAbout%20us%2020240621%20(2)-Compressed.jpg?alt=media&token=c99cc779-a609-4aa5-8cce-ce35c9ca0ddc",
			"id": "VtxRSSVmPZKUdfF8i8Pn"
		},
		{
			"order": 13,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2F20240621_112240-Compressed.jpg?alt=media&token=b61e7350-b63f-4b10-a13d-c3299fe33505",
			"section": "about_us",
			"id": "9tgxYdcAHFFjLsPkfgHO"
		},
		{
			"section": "about_us",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAbout%20us%2020240621%20(1)-Compressed.jpg?alt=media&token=f58da05a-5a9c-4a03-87be-00e4324b4ff0",
			"order": 14,
			"id": "CqTeVA2vIL2CKUiiYCsI"
		},
		{
			"section": "main",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07263-Compressed.jpg?alt=media&token=e3fddcab-60ef-4566-9c0a-02c8218ad024",
			"order": 14,
			"id": "Mt3DE8VpPifsQsE11QTV"
		},
		{
			"section": "main",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07183-Compressed.jpg?alt=media&token=3b143243-cd02-4e7c-979d-a8daaea20d84",
			"order": 15,
			"id": "5R0sY2fbVqbhcuRekYSW"
		},
		{
			"order": 15,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAbout%20us%2020240621%20(3)-Compressed.jpg?alt=media&token=1e5d92bc-ff08-4a8a-897c-0890eb3dac29",
			"section": "about_us",
			"id": "pfbjsfUD0dnH4ItrYnMh"
		},
		{
			"order": 16,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07167-Compressed.jpg?alt=media&token=19fcb05e-578a-44ec-a154-e7c334e6df76",
			"section": "main",
			"id": "8iPH8h4Av4hRAQmLiHCJ"
		},
		{
			"order": 17,
			"section": "main",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07151-Compressed.jpg?alt=media&token=23ba65d2-edc1-4f69-8106-d5b25a97b1cc",
			"id": "O3u9GWW56Gql0PQcbcDp"
		},
		{
			"section": "main",
			"order": 18,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07325-Compressed.jpg?alt=media&token=7a1c9b52-7fe3-4b2c-a042-cdf05c22f539",
			"id": "xKpFiO5dzKgA3rUstPdt"
		},
		{
			"order": 19,
			"section": "main",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07340-Compressed.jpg?alt=media&token=4dc4af5a-604d-412d-9b9f-09a9552e2057",
			"id": "SM41RXcfvducdtOEWn8l"
		},
		{
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07121-Compressed.jpg?alt=media&token=7c3820f2-d608-427e-8255-d6508ba174ad",
			"order": 20,
			"section": "main",
			"id": "9cl2g0rLHAbRAfEwYpKd"
		},
		{
			"order": 21,
			"section": "main",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07172-Compressed.jpg?alt=media&token=afd3e33b-a2bd-4d6f-87fb-bf4d149806ba",
			"id": "pnbDiWCIJOB4Mlh76Xps"
		},
		{
			"order": 22,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07238-Compressed.jpg?alt=media&token=c745f5e2-afe0-4e9b-84b9-a919412aa464",
			"section": "main",
			"id": "rvFbnS8stmW0TYb4ZAOs"
		},
		{
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS08821%201982x2640-Compressed.jpg?alt=media&token=8cdb75d0-6e65-42db-b25c-b3ba94c7a1c6",
			"section": "main",
			"order": 23,
			"id": "8x8XIndf4Ag6nNnkAX2y"
		},
		{
			"section": "main",
			"order": 24,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07160-Compressed.jpg?alt=media&token=751154c3-c63b-4e49-aa3c-da81d3b5a811",
			"id": "u7A66nNzdNG4IHjn5Aw2"
		},
		{
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07278-Compressed.jpg?alt=media&token=89ec114c-910e-4284-a6f7-f6e90b8c5a67",
			"section": "main",
			"order": 25,
			"id": "ZzJYlgRiRKruiNQJLVaX"
		},
		{
			"order": 26,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07243-Compressed.jpg?alt=media&token=cf9ed97c-17c1-4274-9add-a21112b66e2d",
			"section": "main",
			"id": "ASEowni75tSFZsmoZkrT"
		},
		{
			"order": 27,
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS07139-Compressed.jpg?alt=media&token=d6ac936c-95a7-42eb-b70f-cf59f1946694",
			"section": "main",
			"id": "CMzqWOtMDCsUbFWXUAu2"
		},
		{
			"section": "main",
			"url": "https://firebasestorage.googleapis.com/v0/b/la-roca-restaurant-d68d4.appspot.com/o/images%2Fabout_us%2FAPS08822-Compressed.jpg?alt=media&token=9810ebd2-0833-4302-bc18-1e86e6e16b45",
			"order": 28,
			"id": "elVn5V53gdGnIxYi4X7h"
		}
	]);

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
