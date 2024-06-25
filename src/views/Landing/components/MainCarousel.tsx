import { memo, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel.scss'
import { sizeCalc } from '@/utils/helpers';

interface CarouselProps {
	images: string[];
}

const MainCarousel = ({ images }: CarouselProps) => {
	const [items, setItems] = useState<string[]>([]);

	useEffect(() => {
		if (images.length > 4) {
			setItems(images.slice(0, 4));
		} else {
			setItems(images);
		}
	}, [images]);

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
				autoplay={{ delay: 5000 }}
				lazy={true}
				onActiveIndexChange={({ activeIndex }) => {
					if (activeIndex !== items.length - 1) {
						return;
					}

					if (items.length === images.length) {
						return;
					}

					if (images.length - items.length > 4) {
						return setItems(images.slice(0, items.length + 4));
					}

					setItems(images);
				}}
				loop
			>
				{items.map((image, index) => (
					<SwiperSlide key={'slide-' + index}>
						<LazyLoadImage
							src={image}
							style={{
								objectFit: 'cover',
								borderRadius: 10,
							}}
							height='100%'
							effect='blur'
							placeholderSrc='/placeholder.webp'
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default memo(MainCarousel);
