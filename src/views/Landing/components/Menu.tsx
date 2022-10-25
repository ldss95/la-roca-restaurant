import { memo, useContext, useState } from 'react';
import { Col, Row, Text, Grid } from '@nextui-org/react';

import { useFetchCategories } from '@/hooks/useCategories';
import { useFetchProducts } from '@/hooks/useProducts';
import LanguageContext from '@/context/language/context';

const Menu = () => {
	const { lang } = useContext(LanguageContext);
	const [categories] = useFetchCategories();
	const [products] = useFetchProducts();
	const [selectedCategory, setSelectedCategory] = useState<string>('Chicken');

	return (
		<Grid.Container css={{ padding: 60 }} gap={1}>
			<Grid
				xs={12}
				md={6}
				direction='column'
			>
				<Text h2>MENÚ</Text>
				<br />
				<br />

				<svg width="90" height="124" viewBox="0 0 90 124" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M53.1324 0.524895C52.3812 -0.0684677 51.3509 -0.167765 50.4991 0.273018C37.4187 7.0761 30.1381 15.3735 28.861 24.9327C27.9745 31.5626 30.1625 37.5268 32.7512 42.03C29.3763 41.3784 26.1006 41.6743 22.9509 42.9467C6.67532 49.5197 0.312438 80.0718 0.0500638 81.3699C-0.159596 82.4041 0.301656 83.46 1.2014 84.0001C1.58957 84.2326 2.02207 84.3464 2.45337 84.3464C3.02005 84.3464 3.58433 84.1478 4.0372 83.7603L40.175 52.8766C44.6295 71.1441 38.9935 120.699 38.9318 121.232C38.8504 121.937 39.0708 122.641 39.5357 123.169C40.0017 123.697 40.669 124 41.3687 124H56.5553C57.7126 124 58.7118 123.184 58.955 122.041C65.1668 92.7377 51.9367 63.1693 46.0555 51.9596L87.1225 59.246C87.2639 59.2702 87.4064 59.2823 87.5466 59.2823C88.3517 59.2823 89.1173 58.8803 89.5785 58.1925C90.12 57.3836 90.1416 56.3276 89.6324 55.4969C84.3083 46.8023 77.4123 41.5129 69.1349 39.7764C66.3747 39.1988 63.6532 39.0597 61.046 39.2144L82.5244 25.7755C83.3378 25.2645 83.7847 24.3248 83.6685 23.3633C83.5523 22.4042 82.8934 21.6002 81.9816 21.3047C67.9787 16.7637 57.0237 17.4272 49.4304 23.2737C49.3734 23.3176 49.3266 23.3681 49.2702 23.4125L54.0106 3.0485C54.2298 2.10639 53.8872 1.12068 53.1324 0.524895ZM33.7239 25.5963C34.6188 18.8998 39.3979 12.799 47.9508 7.42001L41.9891 33.0318C40.42 36.5767 39.6442 40.1352 39.2653 42.9759C36.3782 39.1103 32.774 32.7047 33.7239 25.5963ZM6.84545 74.8647C9.62734 65.8117 15.4152 51.3288 24.7756 47.5507C26.2684 46.9501 27.7959 46.6473 29.3713 46.6473C31.8573 46.6473 34.4595 47.4005 37.2126 48.9142L6.84545 74.8647ZM54.5401 119.04H44.1086C45.0204 110.399 47.5531 83.8839 46.5251 64.7073C52.0673 78.0931 58.1906 98.7615 54.5401 119.04ZM68.1381 44.6347C73.4155 45.7415 78.0628 48.6478 82.0092 53.3027L48.7643 47.403C53.6164 45.2572 60.8215 43.0944 68.1381 44.6347ZM52.4268 27.2044C55.8256 24.5936 60.1734 23.2882 65.4281 23.2882C68.3933 23.2882 71.646 23.7048 75.1803 24.5355L44.5467 43.7041L46.6138 34.8243C47.8884 32.0155 49.7199 29.2816 52.4268 27.2044Z" fill="#EB2A00"/>
				</svg>
				<br />

				<Text className='heading'>
					<span>Una gran variedad</span>
					<br />
					<span>de platos dominicanos</span>
				</Text>
				<br />
				<br />

				<div>
					{categories.map(({ name, id }) => (
						<button
							className={`category-selector ${selectedCategory === name.en ? 'selected' : ''}`}
							key={'category-selector-' + id}
							onClick={() => setSelectedCategory(name.en)}
						>
							{name[lang]}
						</button>
					))}
				</div>
			</Grid>
			<Grid
				xs={12}
				md={6}
				direction='column'
			>
				{products
					.filter(({ categories }) => categories.includes(selectedCategory))
					.map(({ name, price }) => (
						<div className='product'>
							<Text className='name'>{name[lang]}</Text>
							<Text className='price'>$ {price}</Text>
						</div>
					))
				}
			</Grid>
		</Grid.Container>
	);
}

export default memo(Menu);
