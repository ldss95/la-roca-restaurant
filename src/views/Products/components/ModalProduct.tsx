import { memo, useState, useEffect, useMemo, Key } from 'react';
import { Modal, Input, Button, Text, Row, Dropdown, Loading } from '@nextui-org/react';
import { Form, Formik } from 'formik';
import { SaveOutlined } from '@ant-design/icons';
import { filter } from 'rxjs';

import { ProductProps } from '@/types/product';
import { avoidNotNumerics, ModalOpener$ } from '@/utils/helpers';
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import { useFetchCategories } from '@/hooks/useCategories';
import RenderIf from '@/components/RenderIf';

interface ModalProductProps {
	product?: ProductProps;
	onFinish?: () => void;
}

const defaultValues = {
	price: 0,
	name: {
		en: '',
		es: ''
	},
	categories: []
}

const ModalProduct = ({ onFinish, product }: ModalProductProps) => {
	const [createProduct, creating] = useCreateProduct();
	const [updateProduct, updating] = useUpdateProduct();
	const [isOpen, setIsOpen] = useState(false);
	const [categories] = useFetchCategories();
	const [categoriesSelected, setCategoriesSelected] = useState<'all' | Set<Key>>(new Set([]));

	useEffect(() => {
		setCategoriesSelected(new Set(product?.categories || []));
	}, [product]);

	useEffect(() => {
		const listener = ModalOpener$
			.pipe(filter(modal => modal === 'PRODUCT'))
			.subscribe(() => setIsOpen(true));

		return () => listener.unsubscribe();
	}, []);

	async function handleSave({ name, price }: ProductProps) {
		if (product?.id) {
			await updateProduct(product.id, {
				name,
				price,
				categories: Array.from(categoriesSelected) as string[]
			});
		} else {
			await createProduct({
				name,
				price,
				categories: Array.from(categoriesSelected) as string[]
			})
		}

		setIsOpen(false);
		setCategoriesSelected(new Set([]));
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
				<Text h4>{product?.id ? 'Modify Product' : 'New Product'}</Text>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={product || defaultValues}
					onSubmit={handleSave}
					enableReinitialize
				>
					{({ handleChange, handleBlur }) => (
						<Form>
							<Input
								label='Name (Spanish)'
								name='name.es'
								onChange={handleChange}
								onBlur={handleBlur}
								shadow={false}
								css={{ width: '100%' }}
								value={product?.name?.es || ''}
								autoFocus
								required
							/>
							<br />
							<br />

							<Input
								label='Name (English)'
								name='name.en'
								onChange={handleChange}
								onBlur={handleBlur}
								shadow={false}
								css={{ width: '100%' }}
								value={product?.name?.en || ''}
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
								value={product?.price || 0}
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
										<Dropdown.Item key={name.en}>{name.en}</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
							<br />
							<br />

							<Row justify='center'>
								<Button
									type='submit'
									icon={<SaveOutlined />}
									disabled={creating || updating}
								>
									<RenderIf condition={creating || updating}>
										<Loading />
									</RenderIf>

									<RenderIf condition={!creating && !updating}>
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
