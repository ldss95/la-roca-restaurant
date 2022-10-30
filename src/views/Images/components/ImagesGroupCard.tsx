import { memo, useRef, useState, useMemo, useEffect } from 'react';
import { Card, Row, Text, Button, Loading, Image } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import { useDeleteImage, useUploadImage } from '@/hooks/useImages';
import RenderIf from '@/components/RenderIf';
import { DBImageProps } from '@/types/image';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { SectionType } from '@/types/section';

interface ContactCardProps {
	images: DBImageProps[];
	section: SectionType;
	title: string;
}

const ImagesGroupCard = ({ images, title, section }: ContactCardProps) => {
	return (
		<Card css={{ w: '100%', h: '500px', overflow: 'hidden' }}>
			<Card.Header css={styles.header}>
				<Text size={16} b>{title}</Text>
			</Card.Header>
			<Card.Body css={{ p: 0 }}>
				<Swiper
					slidesPerView={1}
					style={{ height: 500, width: '100%' }}
					modules={[Navigation]}
					navigation
				>
					{images.map(({ url, id }, index) => (
						<SwiperSlide key={'slide-' + index}>
							<Image
								src={url}
								height='100%'
								objectFit='cover'
								containerCss={{ borderRadius: 10 }}
								autoResize
							/>

							<Footer id={id} section={section} />
						</SwiperSlide>
					))}
				</Swiper>
			</Card.Body>
		</Card>
	);
};

export default memo(ImagesGroupCard);

const Footer = ({ id, section }: { id: string; section: SectionType }) => {
	const [deleteImage, deleting] = useDeleteImage();
	const [uploadImage, uploading] = useUploadImage();
	const newImageInputRef = useRef<any>(null);
	const updateImageInputRef = useRef<any>(null);

	function handleUpdateImage({ target }: React.ChangeEvent<HTMLInputElement>){
		const { files } = target;

		if (!files || files.length === 0) {
			return;
		}

		uploadImage({
			id,
			file: files[0],
			path: 'images/' + section
		})
	}

	function handleNewImage({ target }: React.ChangeEvent<HTMLInputElement>){
		const { files } = target;

		if (!files || files.length === 0) {
			return;
		}

		uploadImage({
			file: files[0],
			path: 'images/' + section,
			section
		})
	}

	return (
		<>
			<input
				ref={newImageInputRef}
				type='file'
				style={{ display: 'none' }}
				onChange={handleNewImage}
			/>

			<input
				ref={updateImageInputRef}
				type='file'
				style={{ display: 'none' }}
				onChange={handleUpdateImage}
			/>

			<Card.Footer isBlurred css={styles.footer}>
				<Row justify='space-between' align='center'>
					<Button
						flat
						auto
						rounded
						color='secondary'
						onClick={() => deleteImage(id)}
					>
						<RenderIf condition={deleting}>
							<Loading color='currentColor' size='sm' />
						</RenderIf>

						<RenderIf condition={!deleting}>
							<DeleteOutlined />
						</RenderIf>
					</Button>

					<Button
						flat
						auto
						rounded
						color='secondary'
						onClick={() => updateImageInputRef.current?.click()}
					>
						<RenderIf condition={uploading}>
							<Loading color='currentColor' size='sm' />
						</RenderIf>

						<RenderIf condition={!uploading}>
							<EditOutlined />
						</RenderIf>
					</Button>

					<Button
						flat
						auto
						rounded
						color='secondary'
						onClick={() => newImageInputRef.current?.click()}
					>
						<RenderIf condition={uploading}>
							<Loading color='currentColor' size='sm' />
						</RenderIf>

						<RenderIf condition={!uploading}>
							<PlusCircleOutlined />
						</RenderIf>
					</Button>
				</Row>
			</Card.Footer>
		</>
	)
}

const styles = {
	header: {
		background: 'rgba(255, 255, 255, .4)',
		textAlign: 'center',
		justifyContent: 'center',
		position: 'absolute',
		zIndex: 10
	},
	footer: {
		position: 'absolute',
		bgBlur: '#ffffff66',
		borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
		bottom: 0,
		zIndex: 1
	}
}
