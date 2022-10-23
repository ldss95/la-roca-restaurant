import { memo, useState, useEffect } from 'react';
import { Modal, Input, Text, Button, Loading } from '@nextui-org/react';
import { Formik, Form, FormikErrors } from 'formik';
import { filter } from 'rxjs';

import { ModalOpener$ } from '@/utils/helpers';
import { SaveOutlined } from '@ant-design/icons';
import { CategoryProps } from '@/types/category';
import { useCreateCategory } from '@/hooks/useCategories';
import RenderIf from '@/components/RenderIf';

const ModalCategory = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [createCategory, isLoading] = useCreateCategory();

	useEffect(() => {
		const listener = ModalOpener$
			.pipe(filter(modal => modal === 'CATEGORY'))
			.subscribe(() => setIsOpen(true))

		return () => listener.unsubscribe();
	}, []);

	async function handleSave(category: CategoryProps){
		await createCategory(category);
		setIsOpen(false);
	}

	function validate ({ name }: FormikErrors<CategoryProps>) {
		const errors: FormikErrors<{ es: string; en: string; }> = {};

		if (!name?.es) {
			errors.es = 'Please type the name of category';
		}

		if (!name?.en) {
			errors.en = 'Please type the name of category';
		}

		return errors;
	}

	return (
		<Modal
			open={isOpen}
			onClose={() => setIsOpen(false)}
			width='300px'
		>
			<Modal.Header>
				<Text h4>New Category</Text>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{
						name: {
							en: '',
							es: ''
						}
					}}
					onSubmit={handleSave}
					validate={validate}
					validateOnChange={false}
					validateOnBlur={false}
				>
					{({ handleChange, errors }: any) => (
						<Form>
							<Input
								label='Name (Spanish)'
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
								label='Name (English)'
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
