import { memo, useState, useEffect } from 'react';
import { Modal, Input, Text, Button, Loading } from '@nextui-org/react';
import { Formik, Form } from 'formik';
import { filter } from 'rxjs';

import { ModalOpener$ } from '@/utils/helpers';
import { SaveOutlined } from '@ant-design/icons';
import { CategoryProps } from '@/types/category';
import { useCreateCategory, useUpdateCategory } from '@/hooks/useCategories';
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
	const [updateCategory, isUpdating] = useUpdateCategory();
	const [category, setCategory] = useState<CategoryProps>({} as CategoryProps);

	useEffect(() => {
		const listener = ModalOpener$
			.pipe(filter(({ name }) => name === 'CATEGORY'))
			.subscribe(({ category }) => {
				if (category) {
					setCategory(category);
				} else {
					setCategory({} as CategoryProps);
				}

				setIsOpen(true);
			});

		return () => listener.unsubscribe();
	}, []);

	async function handleSave({ name }: CategoryProps){
		if (category.id) {
			await updateCategory(category.id, name);
		} else {
			await createCategory({ name });
		}

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
					enableReinitialize
				>
					{({ handleChange, values }) => (
						<Form>
							<Input
								label='Nombre (Español)'
								name='name.es'
								onChange={handleChange}
								helperColor='error'
								css={{ width: '100%' }}
								shadow={false}
								value={values?.name?.es || ''}
								required
								autoFocus
							/>
							<br />
							<br />

							<Input
								label='Nombre (Ingles)'
								name='name.en'
								onChange={handleChange}
								helperColor='error'
								css={{ width: '100%' }}
								shadow={false}
								value={values?.name?.en || ''}
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
								<RenderIf condition={isLoading || isUpdating}>
									<Loading color='currentColor' size='sm' />
								</RenderIf>

								<RenderIf condition={!isLoading && !isUpdating}>
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

export default memo(ModalCategory);
