import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import Swal from 'sweetalert2';

import { UserProps } from '@/types/user';
import { db } from '@/firebase';
import { createUser } from '@/services/users';

export const useCreateUser = (): [(name: string, email: string, password: string) => Promise<void>, boolean, any] => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	async function handleCreate(name: string, email: string, password: string) {
		try {
			setLoading(true);
			await createUser(name, email, password);
		} catch (error) {
			Swal.fire('Oops!', 'Ocurrio un error creando el usuario, intentalo mas tarde', 'error');
			console.error(error);
			setError(error);
		} finally {
			setLoading(false)
		}
	}

	return [handleCreate, loading, error];
}

export const useFetchUsers = (): [UserProps[], boolean] => {
	const [users, setUsers] = useState<UserProps[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const ref = collection(db, 'users');
		const unsubscribe = onSnapshot(ref, (snap) => {
			if (snap.empty) {
				return setLoading(false);
			}

			setLoading(true);
			const users = snap.docs.map(doc => ({
				...doc.data(),
				uid: doc.id
			})) as UserProps[];

			setUsers(users);
			setLoading(false);
		});


		return () => unsubscribe();
	}, []);

	return [users, loading];
}
