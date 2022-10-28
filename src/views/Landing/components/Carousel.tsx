import { memo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button, Image } from '@nextui-org/react';

import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel.scss'
import leftArrow from '@/assets/left_arrow.svg';
import rightArrow from '@/assets/right_arrow.svg';
import { sizeCalc } from '@/utils/helpers';

interface CarouselProps {
	images: string[];
}

const Carousel = ({ images }: CarouselProps) => {
	const [swiper, setSwiper] = useState<any>({});

	return (
		<>
			<Swiper
				slidesPerView={2}
				spaceBetween={30}
				onInit={setSwiper}
				style={{
					height: sizeCalc(330, 700),
					marginLeft: '-40%',
					width: '120%',
					position: 'relative',
					borderRadius: 10
				}}
				loop
			>
				{images.map((image, index) => (
					<SwiperSlide key={'slide-' + index}>
						{({ isActive }) => (

							<Image
								src={image}
								height='100%'
								objectFit='cover'
								containerCss={{ borderRadius: 10 }}
								css={{
									...(isActive && {
										opacity: 0.2,
									})
								}}
								autoResize
							/>
						)}
					</SwiperSlide>
				))}
			</Swiper>

			<div className='carousel-nav-container'>
				<Button
					ripple={false}
					onClick={() => swiper?.slidePrev()}
					light
					auto
				>
					<img src={leftArrow} />
				</Button>
				<Button
					ripple={false}
					onClick={() => swiper?.slideNext()}
					light
					auto
				>
					<img src={rightArrow} />
				</Button>
			</div>
		</>
	)
}

export default memo(Carousel);
