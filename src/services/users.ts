import {
	getAuth,
	updateProfile,
	sendPasswordResetEmail,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import { app, db } from '@/firebase';
import Swal from 'sweetalert2';

export async function createUser(name: string, email: string, password: string) {
	const auth = getAuth(app);
	const { user } = await createUserWithEmailAndPassword(auth, email, password);
	updateProfile(user, {
		displayName: name
	});
	const { uid } = user;

	await setDoc(doc(collection(db, 'users'), uid), {
		name,
		email,
		createdAt: new Date()
	});
}

export async function resetPassword(email: string) {
	const auth = getAuth(app);
	await sendPasswordResetEmail(auth, email);
	Swal.fire(
		'Listo',
		`Hemos enviado un correo electronico al email: '${email}' desde el cual se podrá restablecer la contraseña`,
		'success'
	)
}
