import { memo, useState, useEffect } from 'react';
import { Modal, Input, Text, Button, Loading } from '@nextui-org/react';
import { Formik, Form, FormikErrors } from 'formik';
import { filter } from 'rxjs';

import { ModalOpener$ } from '@/utils/helpers';
import { SaveOutlined } from '@ant-design/icons';
import RenderIf from '@/components/RenderIf';
import { useCreateUser } from '@/hooks/useUsers';
import { UserProps } from '@/types/user';

const initialValues: UserProps = {
	name: '',
	email: '',
	password: ''
}

const ModalUser = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [createUser, isLoading] = useCreateUser();
	const [user, setUser] = useState<UserProps | null>(null);

	useEffect(() => {
		const listener = ModalOpener$
			.pipe(filter(({ name }) => name === 'USER'))
			.subscribe(({ user }) => {
				if (user) {
					setUser(user);
				}
				setIsOpen(true);
			});

		return () => listener.unsubscribe();
	}, []);

	function validate ({ name, email, password }: FormikErrors<UserProps>) {
		const errors: FormikErrors<UserProps> = {};

		if (!name) {
			errors.name = 'Escribe el nombre del usuario';
		}

		if (!email) {
			errors.email = 'Escribe el email del usuario';
		}

		if (email && !email.match(/^\S+@\S+\.\S+$/)) {
			errors.email = 'Email invalido';
		}

		if (!password) {
			errors.password = 'Escribe la contraseña del nuevo usuario';
		}

		return errors;
	}

	async function handleSave({ name, email, password }: UserProps) {
		await createUser(name, email, password!);
		setIsOpen(false);
	}

	return (
		<Modal
			open={isOpen}
			onClose={() => setIsOpen(false)}
			width='300px'
			closeButton
		>
			<Modal.Header>
				<Text h4>{user?.uid ? 'Modificar Usuario' : 'Nuevo Usuario'}</Text>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={user || initialValues}
					onSubmit={handleSave}
					validateOnChange={false}
					validateOnBlur={false}
					validate={validate}
				>
					{({ handleChange, errors }) => (
						<Form>
							<Input
								label='Nombre'
								name='name'
								onChange={handleChange}
								helperText={errors.name}
								helperColor='error'
								css={{ width: '100%' }}
								shadow={false}
								autoFocus
							/>
							<br />
							<br />

							<Input
								label='Email'
								name='email'
								onChange={handleChange}
								helperText={errors.email}
								helperColor='error'
								css={{ width: '100%' }}
								shadow={false}
							/>
							<br />
							<br />

							<Input.Password
								label='Contraseña'
								name='password'
								onChange={handleChange}
								helperText={errors.password}
								helperColor='error'
								css={{ width: '100%' }}
								shadow={false}
							/>
							<br />
							<br />

							<Button
								icon={<SaveOutlined />}
								css={{ width: '100%' }}
								type='submit'
								disabled={isLoading}
							>
								<RenderIf condition={isLoading}>
									<Loading />
								</RenderIf>

								<RenderIf condition={!isLoading}>
									Guardar
								</RenderIf>
							</Button>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	);
}

export default memo(ModalUser);
