import { useEffect } from 'react';
import { Input, Button, Text, Loading } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';
import { Formik, FormikErrors, Form } from 'formik';
import Swal from 'sweetalert2';

import { app } from '@/firebase';
import RenderIf from '@/components/RenderIf';
import { getAuth } from 'firebase/auth';

interface FormProps {
	email: string;
	password: string;
}

interface FormProps {
	email: string;
	password: string;
}

const auth = getAuth(app);

function LoginView () {
	const [signIn, _, loading, error] = useSignInWithEmailAndPassword(auth);
	const [session] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (session) {
			navigate('/products')
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

	function validate ({ email, password }: FormikErrors<FormProps>) {
		const errors: FormikErrors<FormProps> = {};

		if (!email) {
			errors.email = 'Please type yor email';
		}

		const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		if (!email?.match(validEmail)) {
			errors.email = 'Invalid email';
		}

		if (!password) {
			errors.password = 'Please type yor password';
		}

		return errors;
	}

	return (
		<div style={styles.container}>
			<div style={styles.form}>
				<Text h3 style={{ textAlign: 'center' }}>Admin Login</Text>
				<Text style={{ textAlign: 'center' }}>
					Wecome back, enter your credentials to continue
				</Text>
				<br />

				<Formik
					onSubmit={handleLogin}
					initialValues={{ email: '', password: '' }}
					validate={validate}
				>
					{({ handleChange, handleBlur, errors }) => (
						<Form>
							<Input
								type='email'
								label='Email'
								name='email'
								onChange={handleChange}
								onBlur={handleBlur}
								css={{ width: '100%' }}
								shadow={false}
								helperColor='error'
								helperText={errors.email}
								required
								autoFocus
							/>
							<br />
							<br />

							<Input.Password
								label='Password'
								name='password'
								onChange={handleChange}
								onBlur={handleBlur}
								css={{ width: '100%' }}
								helperColor='error'
								helperText={errors.password}
								shadow={false}
								required
							/>
							<br />
							<br />
							<br />

							<Button
								style={{ width: '100%' }}
								disabled={loading}
								type='submit'
							>
								<RenderIf condition={loading}>
									<Loading color="currentColor" size="sm" />
								</RenderIf>

								<RenderIf condition={!loading}>
									Sign In
								</RenderIf>
							</Button>
						</Form>
					)}
				</Formik>
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
