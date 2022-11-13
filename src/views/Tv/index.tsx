import { Grid, Spacer, Text } from '@nextui-org/react';

import Decoration from '@/assets/tv_decoration.svg';
import Icon from '@/assets/tv_header_icon.svg';
import Logo from '@/assets/logo.png'
import { useFetchAllTvProducts } from '@/hooks/useTvProducts';
import ProductsList from './components/ProductsList';
import TvCarousel from './components/TvCarousel';
import './Tv.scss'

function TvScreen() {
	const [products] = useFetchAllTvProducts();

	return (
		<div id='tv_container'>
			<header>
				<div>
					<img src={Icon} />
					<Spacer />
					<Text h1>Especial del Día</Text>
				</div>

				<img src={Logo} style={{ height: '60%' }} />
			</header>
			<br />

			<Grid.Container style={{ height: 'calc(100% - 275px)' }}>
				<Grid xs={3}>
					<TvCarousel />
				</Grid>
				<Grid xs={9}>
					<Grid.Container
						gap={2}
						style={{ height: '100%' }}
						alignItems='flex-start'
					>
						<Grid xs={12} justify='center' style={{ paddingTop: 0 }}>
							<img src={Decoration} style={{ width: '97%' }} />
						</Grid>
						<Grid xs={6} style={{ height: 'calc(100% - 40px)' }}>
							<ProductsList products={products.filter(({ side }) => side === 'left')} />
						</Grid>
						<Grid xs={6} style={{ height: 'calc(100% - 40px)' }}>
							<ProductsList products={products.filter(({ side }) => side === 'right')} />
						</Grid>
					</Grid.Container>
				</Grid>
			</Grid.Container>
			<br />

			<footer>

			</footer>
		</div>
	)
}

export default TvScreen;
