import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel.scss'

interface CarouselProps {
	images: string[];
}

const Carousel = ({ images }: CarouselProps) => {

	return (
		<Swiper
			slidesPerView={2}
			spaceBetween={30}
			style={{
				height: 500,
				marginLeft: -150,
				width: '100%',
				position: 'relative',
				paddingRight: 100
			}}
			modules={[Navigation]}
			loop
			navigation
		>
			{images.map((image, index) => (
				<SwiperSlide key={'slide-' + index}>
					{({ isNext, isActive }) => (
						<div
							style={{
								backgroundImage: `url(${image})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								width: '100%',
								height: '100%',
								borderRadius: 10,
								...(isActive && {
									opacity: 0.2
								}),
								...(!isActive && !isNext && {
									opacity: 0
								})
							}}
						>
							<h2 style={{ opacity: 0 }}>Slide {index}</h2>
						</div>
					)}
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default memo(Carousel);
