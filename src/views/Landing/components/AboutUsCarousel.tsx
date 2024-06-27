import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '@nextui-org/react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel.scss'
import leftArrow from '@/assets/left_arrow.svg';
import rightArrow from '@/assets/right_arrow.svg';
import { sizeCalc } from '@/utils/helpers';

interface CarouselProps {
	images: string[];
}

const AboutUsCarousel = ({ images }: CarouselProps) => {
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
							<LazyLoadImage
								src={image}
								height='100%'
								style={{
									backgroundSize: 'cover',
									borderRadius: 10,
									...(isActive && {
										opacity: 0.2,
									})
								}}
								effect='blur'
								placeholderSrc='/placeholder.webp'
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

export default AboutUsCarousel;
