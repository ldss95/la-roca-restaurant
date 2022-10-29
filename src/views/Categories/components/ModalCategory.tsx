import { memo, useState, useEffect } from 'react';
import { Modal, Input, Text, Button, Loading } from '@nextui-org/react';
import { Formik, Form, FormikErrors } from 'formik';
import { filter } from 'rxjs';

import { ModalOpener$ } from '@/utils/helpers';
import { SaveOutlined } from '@ant-design/icons';
import { CategoryProps } from '@/types/category';
import { useCreateCategory } from '@/hooks/useCategories';
import RenderIf from '@/components/RenderIf';

const initialValues = {
	name: {
		en: '',
		es: ''
	}
}

const ModalCategory = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [createCategory, isLoading] = useCreateCategory();
	const [category, setCategory] = useState<CategoryProps>({} as CategoryProps);

	useEffect(() => {
		const listener = ModalOpener$
			.pipe(filter(({ name }) => name === 'CATEGORY'))
			.subscribe(({ category }) => {
				if (category) {
					setCategory(category);
				}
				setIsOpen(true);
			});

		return () => listener.unsubscribe();
	}, []);

	async function handleSave(category: CategoryProps){
		await createCategory(category);
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
				<Text h4>{category?.id ? 'Modificar Categoria' : 'Nueva Categoria'}</Text>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={category || initialValues}
					onSubmit={handleSave}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{({ handleChange, errors }: any) => (
						<Form>
							<Input
								label='Nombre (Español)'
								name='name.es'
								onChange={handleChange}
								helperText={errors.es}
								helperColor='error'
								css={{ width: '100%' }}
								shadow={false}
								required
								autoFocus
							/>
							<br />
							<br />

							<Input
								label='Nombre (Ingles)'
								name='name.en'
								onChange={handleChange}
								helperText={errors.es}
								helperColor='error'
								css={{ width: '100%' }}
								shadow={false}
								required
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
									Save
								</RenderIf>
							</Button>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	);
}

export default memo(ModalCategory);
