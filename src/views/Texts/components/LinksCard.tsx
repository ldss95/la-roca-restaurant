import { useState } from 'react';
import { Card, Text, Input, Button, Row, Loading } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { collection, doc, updateDoc } from 'firebase/firestore';

import RenderIf from '@/components/RenderIf';
import { db } from '@/firebase';
import { useFetchLinks } from '@/hooks/useLinks';
import { LinksProps } from '@/types/links';

const LinksCard = () => {
	const [links, loading] = useFetchLinks();
	const [saving, setSaving] = useState(false);
	const [data, setData] = useState<LinksProps>({} as LinksProps);

	async function save() {
		try {
			setSaving(true);
			for (const [key, values] of Object.entries(data)) {
				await updateDoc(doc(collection(db, 'links'), key), values)
			}
			Swal.fire('Listo', 'Texto guardado correctamente', 'success')
		} catch (error) {
			console.error(error);
			Swal.fire(
				'Error',
				'No se pudo guardar el cambio, por favor intentalo mas tarde',
				'error'
			)
		} finally {
			setSaving(false);
		}
	}

	return (
		<Card>
			<Card.Header css={{ justifyContent: 'center' }}>
				<Text b>Enlaces</Text>
			</Card.Header>
			<Card.Body>
				<Input
					label='Instagram'
					value={links?.instagram?.username}
					onChange={({ target }) => {
						const data = { ...links };
						data.instagram.username = target.value;
						setData(data);
					}}
				/>
				<br />
				<Input
					label='Facebook'
					value={links?.facebook?.url}
					onChange={({ target }) => {
						const data = { ...links };
						data.facebook.url = target.value;
						setData(data);
					}}
				/>
				<br />
				<Input
					label='Whatsapp'
					value={links?.whatsapp?.phone}
					onChange={({ target }) => {
						const data = { ...links };
						data.whatsapp.phone = target.value;
						setData(data);
					}}
				/>
				<br />
				<Input
					label='Ordenar'
					value={links?.order?.url}
					onChange={({ target }) => {
						const data = { ...links };
						data.order.url = target.value;
						setData(data);
					}}
				/>
				<br />

				<Row justify='center'>
					<Button onClick={save}>
						<RenderIf condition={loading || saving}>
							<Loading color='currentColor' size='sm' />
						</RenderIf>
						<RenderIf condition={!loading && !saving}>
							Guardar
						</RenderIf>
					</Button>
				</Row>
			</Card.Body>
		</Card>
	)
}

export default LinksCard;
