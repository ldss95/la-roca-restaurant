import { memo, useContext } from 'react';
import { motion } from 'framer-motion';
import { Grid, Text } from '@nextui-org/react';

import Carousel from './Carousel';
import { useFetchImages } from '@/hooks/useImages';
import dictionary from '@/dictionary';
import { sizeCalc } from '@/utils/helpers';
import LanguageContext from '@/context/language/context';
import { CopyProps } from '@/types/copy';
import { primaryColor } from '@/contants/colors';

const AboutUsSection = ({ copy }: { copy: CopyProps }) => {
	const { lang } = useContext(LanguageContext);
	const [images] = useFetchImages();

	return (
		<motion.section
			id='about_us'
			style={{ overflow: 'hidden' }}
			initial={{ x: '-100vw' }}
			whileInView={{
				x: 0,
				transition: {
					type: 'spring',
					duration: 1,
					bounce: 0.3
				}
			}}
			viewport={{ once: false }}
		>
			<Grid.Container>
				<Grid xs={12} md={6} css={{ position: 'relative' }}>
					<Carousel
						images={images
							.filter(({ section }) => section === 'about_us')
							.map(({ url }) => url)
						}
					/>
				</Grid>
				<Grid
					xs={12}
					md={6}
					justify='center'
					direction='column'
					css={{
						padding: 30,
						position: 'relative'
					}}
				>
					<Text h2 css={{ fontSize: sizeCalc(15, 25) }}>{dictionary[lang].titles.about_us}</Text>
					<br />

					<Text className='heading'>
						<span style={{ fontSize: sizeCalc(25, 55) }}>{copy[lang].about_us.title[0]}</span>
						<br />
						<span style={{ fontSize: sizeCalc(40, 70) }}>{copy[lang].about_us.title[1]}</span>
					</Text>
					<br />

					<Text className='subheading' css={{ fontSize: sizeCalc(16, 35) }}>{copy[lang].about_us.subtitle}</Text>
					<br />

					<div
						style={{
							width: 110,
							height: 5,
							background: primaryColor,
							marginTop: 60
						}}
					/>

				</Grid>
			</Grid.Container>
		</motion.section>
	)
}

export default memo(AboutUsSection);
