import { memo, useState } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel.scss'
import leftArrow from '@/assets/left_arrow.svg';
import rightArrow from '@/assets/right_arrow.svg';
import { Button } from '@nextui-org/react';

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
					height: 500,
					marginLeft: window.innerWidth < 700 ? -50 : -100,
					width: '100%',
					position: 'relative',
				}}
				loop
			>
				{images.map((image, index) => (
					<SwiperSlide key={'slide-' + index}>
						{({ isActive }) => (
							<div
								style={{
									backgroundImage: `url(${image})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
									height: '100%',
									borderRadius: 10,
									...(isActive && {
										opacity: 0.2,
									})
								}}
							>
								<h2 style={{ opacity: 0 }}>Slide {index}</h2>
							</div>
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
