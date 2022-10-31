import { Grid } from '@nextui-org/react';

import ViewHeader from '@/components/ViewHeader';
import AboutUsCard from './components/AboutUsCard';
import ContactCard from './components/ContactCard';
import TitleCard from './components/TitleCard';
import LinksCard from './components/LinksCard';
import MenuCard from './components/MenuCard';

function TextsView() {
	return (
		<>
			<ViewHeader title='Textos' showLangToggler />
			<br />

			<Grid.Container alignItems='flex-start' gap={1}>
				<Grid xs={12} sm={6} md={4} lg={3}>
					<TitleCard />
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={3}>
					<MenuCard />
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={3}>
					<AboutUsCard />
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={3}>
					<ContactCard />
				</Grid>
				<Grid xs={12} sm={6} md={4} lg={3}>
					<LinksCard />
				</Grid>
			</Grid.Container>
		</>
	);
}

export default TextsView;
