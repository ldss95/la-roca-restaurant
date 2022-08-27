import { memo, useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Space, Row } from 'antd';
import Swal from 'sweetalert2';
import { addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';

import { db } from '../firebase';
import RenderIf from './RenderIf';

interface ModalProductProps {
	visible: boolean;
	id?: string;
	name?: string;
	price?: number;
	description?: string;
	close: () => void;
	onFinish?: () => void;
}

interface FormProps {
	name: string;
	description: string;
	price: number;
}

const ModalProduct = ({ visible, close, onFinish, name, id, description, price }: ModalProductProps) => {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		form.resetFields();
	}, [id]);

	async function handleSave({ name, description, price }: FormProps) {
		try {
			setIsLoading(true);

			if (id) {
				await updateDoc(doc(db, 'products', id), {
					name,
					description,
					price
				});
			} else {
				await addDoc(collection(db, 'products'), {
					name,
					description,
					price
				});
			}

			close();
			if (onFinish) {
				onFinish();
			}
		} catch (error) {
			Swal.fire('Error', 'Something went wrong, please try again later', 'error')
		} finally {
			setIsLoading(false);
		}
	}

	async function handleDelete() {
		try {
			setIsDeleting(true);
			await deleteDoc(doc(db, 'products', id!));
			close();
			if (onFinish) {
				onFinish();
			}
		} catch (error) {
			Swal.fire('Error', 'Something went wrong, please try again later', 'error')
		} finally {
			setIsDeleting(false);
		}
	}

	return (
		<Modal
			visible={visible}
			footer={null}
			title={id ? 'Modify Product' : 'New Product'}
			onCancel={close}
		>
			<Form
				layout='vertical'
				onFinish={handleSave}
				form={form}
				initialValues={{
					name,
					description,
					price
				}}
			>
				<Form.Item
					label='Name'
					name='name'
					rules={[{
						required: true,
						message: 'Please, enter product name'
					}]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Price'
					name='price'
					rules={[{
						required: true,
						message: 'Please, enter product price'
					}]}
				>
					<Input type='number' min={1} />
				</Form.Item>

				<Form.Item
					label='Description'
					name='description'
				>
					<Input.TextArea />
				</Form.Item>

				<Row justify='end'>
					<Space>
						<RenderIf condition={!!id}>
							<Button
								size='large'
								loading={isDeleting}
								onClick={handleDelete}
								danger
							>
								Delete
							</Button>
						</RenderIf>

						<Button
							type='primary'
							htmlType='submit'
							size='large'
							loading={isLoading}
						>
							Save
						</Button>
					</Space>
				</Row>
			</Form>
		</Modal>
	)
}

export default memo(ModalProduct);
