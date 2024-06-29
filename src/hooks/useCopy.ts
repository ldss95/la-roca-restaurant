import { useEffect, useState } from 'react';

import { CopyProps, LangProps } from '@/types/copy';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

export const useCopy = (): [CopyProps, boolean] => {
	const loading = false;
	const [copy, setCopy] = useState<CopyProps>({
		en: {
			title: ['The taste of ', 'Dominican cuisine'],
			about_us: {
				title: ['We offer you a ', 'family atmosphere'],
				subtitle: 'To enjoy your favorite dishes and the rich flavor of our cuisine'
			},
			contact_us: {
				title: ['Come and enjoy ', 'our seasoning'],
				address: '1150 Elmwood Ave',
				phone: '(401) 941-8090'
			},
			menu: {
				title: ['A great variety', 'of Dominican dishes']
			},
			fdaWarning: 'If you have a food allergy, please speak to any member of our staff. The FDA warns that consuming raw or undercooked meats, poultry, shellfish, or eggs increases the risk of foodborne illness.',
		},
		es: {
			title: ['El sabor de la', 'cocina dominicana'],
			about_us: {
				title: ['Te ofrecemos un', 'ambiente familiar'],
				subtitle: 'Para disfrutar de tus platos favoritos y el sabroso sazón de nuestra cocina'
			},
			contact_us: {
				title: ['Ven a disfrutar de ', 'nuestro sazón.'],
				address: '1150 Elmwood Ave',
				phone: '(401) 941-8090'
			},
			menu: {
				title: ['Una gran variedad', 'de platos dominicanos']
			},
			fdaWarning: 'Si tiene una alergia alimentaria, por favor hable con cualquier miembro de nuestro personal. La FDA advierte que consumir carnes crudas o poco cocidas, aves, mariscos o huevos aumenta el riesgo de enfermedades transmitidas por los alimentos.',
		}
	});

	// useEffect(() => {
	// 	const ref = collection(db, 'copy');
	// 	const unsubscribe = onSnapshot(ref, (snap) => {
	// 		if (snap.empty) {
	// 			return;
	// 		}

	// 		const copy = {} as CopyProps;
	// 		for (const item of snap.docs) {
	// 			const key = item.id as 'en' | 'es';
	// 			copy[key] = item.data() as LangProps;
	// 		}
	// 		setCopy(copy);
	// 	});


	// 	return () => unsubscribe();
	// }, []);

	return [copy, loading];
}
