import { useState } from 'react';
import Swal from 'sweetalert2';

import { uploadImage } from '@/services/images';
import { addTvImage } from '@/services/tv';

export const useUploadImage = (): [(file: File) => Promise<void>, boolean] => {
	const [loading, setLoading] = useState(false);

	async function handleUploadImage(file: File) {
		try {
			setLoading(true);
			const url = await uploadImage(file, 'images/tv/');
			await addTvImage(url);
			Swal.fire('Listo', 'Imagen agregada', 'success')
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
