import { useEffect } from 'react';
import { Input, Button, Text, Loading } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase';
import Swal from 'sweetalert2';
import RenderIf from '../components/RenderIf';

interface FormProps {
	email: string;
	password: string;
}

function LoginView () {
	const [signIn, _, loading, error] = useSignInWithEmailAndPassword(auth);
	const [session] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (session) {
			navigate('/menu')
		}
	}, [session]);

	useEffect(() => {
		if (!error) {
			return;
		}

		Swal.fire('Oops!', 'Wrong credentials')
	}, [error]);

	async function handleLogin({ email, password }: FormProps) {
		await signIn(email, password);
	}

	return (
		<div style={styles.container}>
			<div style={styles.form}>
				<Text h3 style={{ textAlign: 'center' }}>Admin Login</Text>
				<Text style={{ textAlign: 'center' }}>
					Wecome back, enter your credentials to continue
				</Text>
				<br />

				<Input type='email' label='Email' required autoFocus />
				<Input.Password label='Password' required />
				<Button
					style={{ width: '100%' }}
					disabled={loading}
				>
					<RenderIf condition={loading}>
						<Loading color="currentColor" size="sm" />
					</RenderIf>

					<RenderIf condition={!loading}>
						Sign In
					</RenderIf>
				</Button>
			</div>
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
		background: '#EEE1D4'
	},
	form: {
		width: 350,
		maxWidth: '90%',
		padding: 30,
		borderRadius: 10,
		background: '#fff'
	}
}

export default LoginView;
