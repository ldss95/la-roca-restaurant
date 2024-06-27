import { useState, useEffect, useMemo } from 'react';
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
	prices: [0, 0],
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
	const selectedCategoryName = useMemo(() => {
		if (categories.length === 0 || !categorySelected) {
			return null;
		}

		const category = categories.find(({ name }) => name.en === categorySelected);
		if (!category) {
			return null;
		}

		return category.name.es;
	}, [categorySelected, categories]);

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

	async function handleSave({ name, prices }: ProductProps) {
		if (!categorySelected) {
			return Swal.fire('Oops!', 'Debes seleccionar una categoria', 'warning')
		}

		if (product?.id) {
			await updateProduct(product.id, {
				name,
				prices,
				category: categorySelected,
				order: product.order
			});
		} else {
			console.log()
			await createProduct({
				name,
				prices,
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
			closeButton
		>
			<Modal.Header>
				<Text h4>{product?.id ? 'Modificar Producto' : 'Nuevo Producto'}</Text>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={product || defaultValues}
					onSubmit={handleSave}
					enableReinitialize
				>
					{({ handleChange, values }) => (
						<Form>
							<Input
								label='Nombre (Español)'
								name='name.es'
								onChange={handleChange}
								shadow={false}
								css={{ width: '100%' }}
								value={values?.name?.es || ''}
								autoFocus
								required
							/>
							<br />
							<br />

							<Input
								label='Nombre (Ingles)'
								name='name.en'
								onChange={handleChange}
								shadow={false}
								css={{ width: '100%' }}
								value={values?.name?.en || ''}
								required
							/>
							<br />
							<br />

							<Input
								type='number'
								name='prices[0]'
								min={1}
								onKeyDown={avoidNotNumerics}
								onChange={handleChange}
								label='Precio 1'
								css={{ width: '100%' }}
								initialValue={values?.prices && values.prices[0]?.toString() || values.price?.toString() || '0'}
								step={0.01}
								shadow={false}
							/>
							<br />
							<br />

							<Input
								type='number'
								name='prices[1]'
								onKeyDown={avoidNotNumerics}
								onChange={handleChange}
								label='Precio 2'
								css={{ width: '100%' }}
								initialValue={values?.prices && values.prices[1]?.toString() || '0'}
								step={0.01}
								shadow={false}
							/>
							<br />
							<br />

							<Text>Categoria</Text>
							<Dropdown>
								<Dropdown.Button
									flat color='secondary'
									css={{
										tt: 'capitalize',
										width: '100%'
									}}
								>
									{selectedCategoryName || 'Seleccionar Categoria'}
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
										<Dropdown.Item key={name.en}>{name.es}</Dropdown.Item>
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
										<Loading color='currentColor' size='sm' />
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

export default ModalProduct;
