import { memo, useState, useEffect } from 'react';
import { Modal, Input, Text, Button, Loading } from '@nextui-org/react';
import { Formik, Form, FormikErrors } from 'formik';

import { ModalOpener$ } from '@/utils/helpers';
import { SaveOutlined } from '@ant-design/icons';
import { CategoryProps } from '@/types/category';
import { useCreateCategory } from '@/hooks/useCategories';
import RenderIf from '@/components/RenderIf';

const ModalCategory = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [createCategpry, isLoading] = useCreateCategory();

	useEffect(() => {
		const listener = ModalOpener$.subscribe((modal) => {
			if (modal === 'CATEGORY') {
				setIsOpen(true);
			}
		})

		return () => listener.unsubscribe();
	}, []);

	async function handleSave(category: CategoryProps){
		await createCategpry(category);
		setIsOpen(false);
	}

	function validate ({ name }: FormikErrors<CategoryProps>) {
		const errors: FormikErrors<{ spanish: string; english: string; }> = {};

		if (!name?.spanish) {
			errors.spanish = 'Please type the name of category';
		}

		if (!name?.english) {
			errors.spanish = 'Please type the name of category';
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
							english: '',
							spanish: ''
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
								name='name.spanish'
								onChange={handleChange}
								helperText={errors.spanish}
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
								name='name.english'
								onChange={handleChange}
								helperText={errors.spanish}
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
