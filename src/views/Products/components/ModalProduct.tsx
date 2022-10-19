import { memo, useState, useEffect, useMemo } from 'react';
import { Modal, Input, Button, Text, Row, Dropdown, Loading } from '@nextui-org/react';
import { updateDoc, doc } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { SaveOutlined } from '@ant-design/icons';

import { db } from '@/firebase';
import { ProductProps } from '@/types/product';
import { avoidNotNumerics, ModalOpener$ } from '@/utils/helpers';
import { useCreateProduct } from '@/hooks/useProducts';
import { useFetchCategories } from '@/hooks/useCategories';
import RenderIf from '@/components/RenderIf';

interface ModalProductProps {
	product?: ProductProps;
	onFinish?: () => void;
}

const defaultValues = {
	price: 0,
	name: {
		english: '',
		spanish: ''
	},
	categories: []
}

const ModalProduct = ({ onFinish, product }: ModalProductProps) => {
	const [createProduct, loading] = useCreateProduct();
	const [isOpen, setIsOpen] = useState(false);
	const [categories] = useFetchCategories();
	const [categoriesSelected, setCategoriesSelected] = useState(new Set([]));

	useEffect(() => {
		const listener = ModalOpener$.subscribe((modal) => {
			if (modal === 'PRODUCT') {
				setIsOpen(true);
			}
		})

		return () => listener.unsubscribe();
	}, []);

	async function handleSave({ name, price }: ProductProps) {
		if (product?.id) {
			await updateDoc(doc(db, 'products', product?.id), {
				name,
				price
			});
		} else {
			await createProduct({ name, price, categories: Array.from(categoriesSelected) })
		}

		setIsOpen(false);
		if (onFinish) {
			onFinish();
		}
	}

	const selectedValue = useMemo(() => {
		return Array.from(categoriesSelected).join(", ").replaceAll("_", " ")
	}, [categoriesSelected]);

	return (
		<Modal
			open={isOpen}
			onClose={() => setIsOpen(false)}
			width='400px'
		>
			<Modal.Header>
				<Text>{product?.id ? 'Modify Product' : 'New Product'}</Text>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={product || defaultValues}
					onSubmit={handleSave}
				>
					{({ handleChange, handleBlur }) => (
						<Form>
							<Input
								label='Name (English)'
								name='name.english'
								onChange={handleChange}
								onBlur={handleBlur}
								shadow={false}
								css={{ width: '100%' }}
								required
							/>
							<br />
							<br />

							<Input
								label='Name (Spanish)'
								name='name.spanish'
								onChange={handleChange}
								onBlur={handleBlur}
								shadow={false}
								css={{ width: '100%' }}
								required
							/>
							<br />
							<br />

							<Input
								type='number'
								name='price'
								min={1}
								onKeyDown={avoidNotNumerics}
								onChange={handleChange}
								onBlur={handleBlur}
								label='Price'
								css={{ width: '100%' }}
								shadow={false}
							/>
							<br />
							<br />

							<Text>Categories</Text>
							<Dropdown>
								<Dropdown.Button
									flat color='secondary'
									css={{
										tt: 'capitalize',
										width: '100%'
									}}
								>
									{selectedValue === '' ? 'Choose One' : selectedValue}
								</Dropdown.Button>
								<Dropdown.Menu
									css={{ width: '100%' }}
									selectionMode='multiple'
									onSelectionChange={setCategoriesSelected}
									selectedKeys={categoriesSelected}
								>
									{categories.map(({ name }) => (
										<Dropdown.Item key={name.english}>{name.english}</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
							<br />
							<br />
							<br />

							<Row justify='center'>
								<Button
									type='submit'
									icon={<SaveOutlined />}
									disabled={loading}
								>
									<RenderIf condition={loading}>
										<Loading />
									</RenderIf>

									<RenderIf condition={!loading}>
										Save
									</RenderIf>
								</Button>
							</Row>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	)
}

export default memo(ModalProduct);
