import { Grid, Spacer, Text } from '@nextui-org/react';

import Decoration from '@/assets/tv_decoration.svg';
import Icon from '@/assets/tv_header_icon.svg';
import Logo from '@/assets/logo.png'
import { useFetchAllTvProducts } from '@/hooks/useTvProducts';
import ProductsList from './components/ProductsList';
import TvCarousel from './components/TvCarousel';
import * as icons from './components/icons';

import './Tv.scss'
import { redColor, secondaryColor } from '@/contants/colors';
import { useFetchLinks } from '@/hooks/useLinks';
import { FacebookOutlined } from '@ant-design/icons';

function TvScreen() {
	const [products] = useFetchAllTvProducts();
	const [links] = useFetchLinks();

	return (
		<div id='tv_container'>
			<header>
				<div>
					<img src={Icon} style={{ height: 60 }} />
					<Spacer />
					<img src={icons.title} style={{ height: 90 }} />
				</div>

				<img src={Logo} style={{ height: '90%' }} />
			</header>
			<br />

			<Grid.Container style={{ height: 'calc(100% - 345px)' }}>
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
				<Grid.Container>
					<Grid xs={3} alignItems='center'>
						<img src={icons.globe} />
						<Spacer />
						<Text>larocarestaurante.com</Text>
					</Grid>

					<Grid xs={3} alignItems='center' justify='center'>
						<Text>follow us:</Text>
						<Spacer />
						<img src={icons.instagram} />
						<Spacer />
						<FacebookOutlined style={{ fontSize: 36, color: redColor }} />
						{/* <img src={icons.facebook} /> */}
					</Grid>

					<Grid xs={3} direction='column' alignItems='center'>
						<div>
							<Text className='delivery'>DELIVERY BY</Text>
							<img
								src={icons.doordash}
								style={{ height: 20 }}
							/>
						</div>
					</Grid>

					<Grid xs={3} alignItems='center' justify='flex-end'>
						<img src={icons.whatsapp}/>
						<Spacer />
						<Text>{links?.whatsapp?.phone}</Text>
					</Grid>
				</Grid.Container>
			</footer>
		</div>
	)
}

export default TvScreen;
