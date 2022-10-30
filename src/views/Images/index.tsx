import ViewHeader from '@/components/ViewHeader';
import { useFetchImages } from '@/hooks/useImages';
import { Button, Card, Grid, Row, Text } from '@nextui-org/react';
import ContactCard from './components/ContactCard';

function ImagesView() {
	const [images] = useFetchImages();

	return (
		<>
			<ViewHeader title='Imagenes' />
			<br />

			<Grid.Container>
				<Grid xs={12} sm={6} md={4} lg={3}>
					<ContactCard
						{
							...images.find(({ section }) => section === 'contact') ||
							{
								url: '',
								id: ''
							}
						}
					/>
				</Grid>
			</Grid.Container>
		</>
	);
}

export default ImagesView;
