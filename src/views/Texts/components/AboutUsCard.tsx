import { useContext, useState } from 'react';
import { Card, Text, Input, Button, Row, Loading, Textarea } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { collection, doc, updateDoc } from 'firebase/firestore';

import { useCopy } from '@/hooks/useCopy';
import RenderIf from '@/components/RenderIf';
import { db } from '@/firebase';
import LanguageContext from '@/context/language/context';

const AboutUsCard = () => {
	const { lang } = useContext(LanguageContext);
	const [copy, loading] = useCopy();
	const [data, setData] = useState<any>({});
	const [saving, setSaving] = useState(false);

	async function save() {
		if (!data[lang]) {
			return;
		}

		try {
			setSaving(true);
			await updateDoc(doc(collection(db, 'copy'), lang), data[lang]);
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
				<Text b>Nosotros</Text>
			</Card.Header>
			<Card.Body>
				<Input
					label='Titulo'
					value={copy[lang].about_us.title[0]}
					onChange={({ target }) => {
						const data = { ...copy };
						data[lang].about_us.title[0] = target.value;
						setData(data);
					}}
				/>
				<br />
				<Input
					value={copy[lang].about_us.title[1]}
					onChange={({ target }) => {
						const data = { ...copy };
						data[lang].about_us.title[1] = target.value;
						setData(data);
					}}
				/>
				<br />
				<Textarea
					label='Subtitulo'
					value={copy[lang].about_us.subtitle}
					onChange={({ target }) => {
						const data = { ...copy };
						data[lang].about_us.subtitle = target.value;
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

export default AboutUsCard;
