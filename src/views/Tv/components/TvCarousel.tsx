import { memo, useRef } from 'react';
import { Image } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

import { useFetchAllTvImages } from '@/hooks/useTvProducts';
import CarouselMenu from './CarouselMenu';
import { removeTvImage } from '@/services/tv';
import { useUploadImage } from '@/hooks/useTvImages';

const TvCarousel = () => {
	const [images] = useFetchAllTvImages();
	const [uploadImage] = useUploadImage();
	const newImageInputRef = useRef<any>(null);

	function handleNewImage({ target }: React.ChangeEvent<HTMLInputElement>){
		const { files } = target;

		if (!files || files.length === 0) {
			return;
		}

		uploadImage(files[0]);
	}

	return (
		<div style={{ width: '100%', height: '100%' }}>
			<input
				ref={newImageInputRef}
				type='file'
				style={{ display: 'none' }}
				onChange={handleNewImage}
			/>

			<Swiper
				slidesPerView={1}
				style={{
					borderTopRightRadius: 20,
					borderBottomRightRadius: 200,
					overflow: 'hidden',
					position: 'relative',
					height: '100%'
				}}
				modules={[Autoplay]}
				autoplay={{
					delay: 5000,
					pauseOnMouseEnter: true,
					disableOnInteraction: false
				}}
				loop
			>
				{images.map(({ id, url }) => (
					<SwiperSlide key={id}>
						<CarouselMenu
							onDelete={(id !== 'placeholder')
								? () => removeTvImage(id)
								: undefined
							}
							onClickAddImage={() => newImageInputRef.current?.click()}
						/>

						<Image
							height='100%'
							objectFit='cover'
							src={url}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default memo(TvCarousel);
