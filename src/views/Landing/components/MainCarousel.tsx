import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel.scss'
import { sizeCalc } from '@/utils/helpers';

interface CarouselProps {
	images: string[];
}

const MainCarousel = ({ images }: CarouselProps) => {
	return (
		<>
			<Swiper
				slidesPerView={2}
				spaceBetween={30}
				style={{
					height: sizeCalc(400, 760),
					marginRight: '-40%',
					width: '140%',
					position: 'relative',
					borderRadius: 10
				}}
				modules={[Autoplay]}
				autoplay={{
					delay: 5000
				}}
				loop
			>
				{images.map((image, index) => (
					<SwiperSlide key={'slide-' + index}>
						<LazyLoadImage
							src={image}
							style={{
								objectFit: 'cover',
								borderRadius: 10,
								height: '100%'
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default memo(MainCarousel);
