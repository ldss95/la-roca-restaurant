import ViewHeader from '@/components/ViewHeader';
import { useFetchImages } from '@/hooks/useImages';
import { Grid } from '@nextui-org/react';

import ImagesGroupCard from './components/ImagesGroupCard';
import ContactCard from './components/ContactCard';
import { DBImageProps } from '@/types/image';

function ImagesView() {
	const [images] = useFetchImages();

	return (
		<>
			<ViewHeader title='Imagenes' />
			<br />

			<Grid.Container gap={2}>
				<Grid xs={12} sm={6} md={4} lg={3}>
					<ImagesGroupCard
						images={images.filter(({ section }) => section === 'main') as DBImageProps[]}
						title='Seccion Principal'
						section='main'
					/>
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={3}>
					<ImagesGroupCard
						images={images.filter(({ section }) => section === 'about_us')}
						section='about_us'
						title='Nosotros'
					/>
				</Grid>
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
