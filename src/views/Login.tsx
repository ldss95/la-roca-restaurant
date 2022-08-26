import { useEffect } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../firebase';
const { Title, Paragraph } = Typography;

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

		notification.error({
			message: 'Oops!',
			description: 'Wrong credentials'
		})
	}, [error]);

	async function handleLogin({ email, password }: FormProps) {
		await signIn(email, password);
	}

	return (
		<div style={styles.container}>
			<div style={styles.form}>
				<Title style={{ textAlign: 'center' }}>Admin Login</Title>
				<Paragraph style={{ textAlign: 'center' }}>Wecome back, enter your credentials to continue</Paragraph>
				<br />

				<Form
					layout='vertical'
					onFinish={handleLogin}
				>
					<Form.Item
						label='Email'
						name='email'
						rules={[{
							required: true,
							message: 'Please, enter your email.'
						}]}
					>
						<Input type='email' autoFocus />
					</Form.Item>

					<Form.Item
						label='Password'
						name='password'
						rules={[{
							required: true,
							message: 'Please, enter your password.'
						}]}
					>
						<Input.Password />
					</Form.Item>

					<Button
						type='primary'
						size='large'
						style={{ width: '100%' }}
						htmlType='submit'
						loading={loading}
					>
						Sign In
					</Button>
				</Form>
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
		padding: 30,
		borderRadius: 10,
		background: '#fff'
	}
}

export default LoginView;
