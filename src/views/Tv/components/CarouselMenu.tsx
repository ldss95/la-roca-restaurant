import { Button, Spacer } from '@nextui-org/react';
import { useSwiper } from 'swiper/react';
import {
	CloudUploadOutlined,
	DeleteOutlined,
	LeftOutlined,
	RightOutlined
} from '@ant-design/icons';

import './CarouselMenu.scss';
import RenderIf from '@/components/RenderIf';

interface CarouselMenuProps {
	onDelete?: () => void;
	onClickAddImage: () => void;
}
const CarouselMenu = ({ onDelete, onClickAddImage }: CarouselMenuProps) => {
	const swiper = useSwiper();

	return (
		<div className='carousel-menu'>
			<Button
				icon={<LeftOutlined />}
				css={{ color: '#fff', borderColor: '#fff' }}
				onClick={() => swiper.slidePrev()}
				bordered
				auto
			/>
			<div className="options">
				<Button
					size='lg'
					css={{
						background: '#fff',
						color: '#000'
					}}
					icon={<CloudUploadOutlined />}
					onClick={onClickAddImage}
					auto
					rounded
				>
					Agregar
				</Button>

				<RenderIf condition={onDelete !== undefined}>
					<Spacer />
					<Button
						size='lg'
						css={{
							background: '#fff',
							color: '#000'
						}}
						icon={<DeleteOutlined />}
						onClick={onDelete}
						auto
						rounded
					>
						Eliminar
					</Button>
				</RenderIf>
			</div>

			<Button
				icon={<RightOutlined />}
				css={{ color: '#fff', borderColor: '#fff' }}
				onClick={() => swiper.slideNext()}
				bordered
				auto
			/>
		</div>
	)
}

export default CarouselMenu;
