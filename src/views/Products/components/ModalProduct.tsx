import { memo, useState, useEffect } from 'react';
import { Modal, Input, Button, Text, Row, Dropdown, Loading } from '@nextui-org/react';
import { Form, Formik } from 'formik';
import { SaveOutlined } from '@ant-design/icons';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

import { ProductProps } from '@/types/product';
import { avoidNotNumerics, ModalOpener$ } from '@/utils/helpers';
import { useCreateProduct, useUpdateProduct } from '@/hooks/useProducts';
import { useFetchCategories } from '@/hooks/useCategories';
import RenderIf from '@/components/RenderIf';

interface ModalProductProps {
	onFinish?: () => void;
}

const defaultValues = {
	price: 0,
	name: {
		en: '',
		es: ''
	},
	category: ''
}

const ModalProduct = ({ onFinish }: ModalProductProps) => {
	const [createProduct, creating] = useCreateProduct();
	const [updateProduct, updating] = useUpdateProduct();
	const [isOpen, setIsOpen] = useState(false);
	const [categories] = useFetchCategories();
	const [categorySelected, setCategorySelected] = useState<string | null>(null);
	const [product, setProduct] = useState<ProductProps>({} as ProductProps);

	useEffect(() => {
		if (product) {
			setCategorySelected(product.category);
		}

	}, [product]);

	useEffect(() => {
		const listener = ModalOpener$
			.pipe(filter(({ name }) => name === 'PRODUCT'))
			.subscribe(({ product }) => {
				if (product) {
					setProduct(product);
				} else {
					setProduct({} as ProductProps);
				}

				setIsOpen(true);
			});

		return () => listener.unsubscribe();
	}, []);

	async function handleSave({ name, price }: ProductProps) {
		if (!categorySelected) {
			return Swal.fire('Oops!', 'Please choose one category', 'warning')
		}

		if (product?.id) {
			await updateProduct(product.id, {
				name,
				price,
				category: categorySelected,
				order: product.order
			});
		} else {
			console.log()
			await createProduct({
				name,
				price,
				category: categorySelected,
				order: product.order
			})
		}

		setIsOpen(false);
		setCategorySelected(null);
		if (onFinish) {
			onFinish();
		}
	}

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
								step={0.01}
								shadow={false}
							/>
							<br />
							<br />

							<Text>Category</Text>
							<Dropdown>
								<Dropdown.Button
									flat color='secondary'
									css={{
										tt: 'capitalize',
										width: '100%'
									}}
								>
									{categorySelected || 'Choose One Category'}
								</Dropdown.Button>
								<Dropdown.Menu
									css={{ width: '100%' }}
									onSelectionChange={(keys) => {
										const [key] = Array.from(keys) as string[];
										setCategorySelected(key || null)
									}}
									selectionMode='single'
									selectedKeys={categorySelected ? [categorySelected] : []}
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
